// Copyright (c) 2017 Tracktunes Inc

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AUDIO_CONTEXT, RecordingInfo } from './common';
import { MasterClock } from '../master-clock/master-clock';
import { ABS, formatTime } from '../../models/utils/utils';

// the name of the function we give to master clock to run
export const RECORDER_CLOCK_FUNCTION_NAME: string = 'recorder';

// length of script processing buffer (must be power of 2, smallest possible,
// to reduce latency and to compute time as accurately as possible)
const PROCESSING_BUFFER_LENGTH: number = 2048;

// statuses
export enum RecordStatus {
    // uninitialized means we have not been initialized yet
    UNINITIALIZED_STATE,
    // error occured - no indexedDB available
    NO_DB_ERROR,
    // error occured - no AudioContext
    NO_CONTEXT_ERROR,
    // error occured - no microphone
    NO_MICROPHONE_ERROR,
    // error occured - no getUserMedia()
    NO_GETUSERMEDIA_ERROR,
    // error occured - getUserMedia() has crashed
    GETUSERMEDIA_ERROR,
    // normal operation
    READY_STATE
}

// Add some web audio missing type definitions: See http://stackoverflow.com/..
// ..questions/32797833/typescript-web-audio-api-missing-definitions

interface MediaStreamAudioDestinationNode extends AudioNode {
    stream: MediaStream;
}

interface AudioContext {
    createMediaStreamDestination: () => any;
}

interface Gain {
    value: number;
}

interface AudioGainNode extends AudioNode {
    gain: Gain;
}

/**
 * @name WebAudioRecord
 * @description
 * Audio Record functions based on WebAudio.
 */
@Injectable()
export class WebAudioRecord {
    private masterClock: MasterClock;
    private sourceNode: MediaElementAudioSourceNode;
    private audioGainNode: AudioGainNode;
    private scriptProcessorNode: ScriptProcessorNode;
    private nPeaksAtMax: number;
    private nPeakMeasurements: number;
    private nRecordedSamples: number;
    private startedAt: number;
    private pausedAt: number;

    protected valueCB: (pcm: number) => any;

    public status: RecordStatus;
    public sampleRate: number;
    public isInactive: boolean;
    public isRecording: boolean;
    public currentVolume: number;
    public currentTime: string;
    public maxVolumeSinceReset: number;
    public percentPeaksAtMax: string;

    // this is how we signal
    constructor(masterClock: MasterClock) {
        console.log('constructor():WebAudioRecord');

        this.masterClock = masterClock;

        if (!AUDIO_CONTEXT) {
            this.status = RecordStatus.NO_CONTEXT_ERROR;
            return;
        }

        this.valueCB = null;

        this.status = RecordStatus.UNINITIALIZED_STATE;

        // create nodes that do not require a stream in their constructor
        this.createNodes();

        // this call to resetPeaks() also initializes private variables
        this.resetPeaks();

        // grab microphone, init nodes that rely on stream, connect nodes
        this.initAudio();
    }

    /**
     * Initialize audio, get it ready to record
     * @returns {void}
     */
    private initAudio(): void {
        this.sampleRate = AUDIO_CONTEXT.sampleRate;
        console.log('SAMPLE RATE: ' + this.sampleRate);

        const getUserMediaOptions: Object = {
            video: false,
            audio: true
        };

        if (navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia) {
            // We're in mozilla but not yet in chrome
            // new getUserMedia is available, use it to get microphone stream
            // console.log('Using NEW navigator.mediaDevices.getUserMedia');

            navigator.mediaDevices.getUserMedia(getUserMediaOptions)
                .then((stream: MediaStream) => {
                    this.connectNodes(stream);
                })
                .catch((error: any) => {
                    console.warn('NO MICROPHONE: ' + error);
                    console.dir(error);
                    this.status = RecordStatus.NO_MICROPHONE_ERROR;
                });
        }
        else {
            // This is what is called if we're in chrome / chromium
            // console.log('Using OLD navigator.getUserMedia (new not there)');
            navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia;
            if (navigator.getUserMedia) {
                // old getUserMedia is available, use it
                try {
                    navigator.getUserMedia(
                        getUserMediaOptions,
                        (stream: MediaStream) => {
                            this.connectNodes(stream);
                        },
                        (error: any) => {
                            console.warn('initAudio(old1) ' + error);
                            alert('initAudio(old1) ' + error);
                            this.status = RecordStatus.NO_MICROPHONE_ERROR;
                        });
                }
                catch (error) {
                    console.warn('initAudio(old2) ' + error);
                    console.dir(error);
                    alert('initAudio(old2) ' + error);
                    this.status = RecordStatus.GETUSERMEDIA_ERROR;
                }
            }
            else {
                // neither old nor new getUserMedia are available
                console.warn('initAudio() Error: no getUserMedia');
                alert('initAudio() Error: no getUserMedia');
                this.status = RecordStatus.NO_GETUSERMEDIA_ERROR;
            }
        }
    }

    private onAudioProcess(processingEvent: AudioProcessingEvent): void {
        let inputBuffer: AudioBuffer = processingEvent.inputBuffer,
            inputData: Float32Array = inputBuffer.getChannelData(0),
            i: number,
            value: number,
            absValue: number;
        // put the maximum of current buffer into this.currentVolume
        this.currentVolume = 0;
        for (i = 0; i < PROCESSING_BUFFER_LENGTH; i++) {
            // value is the float value of the current PCM sample
            // it is expected to be in [-1, 1] but goes beyond that
            // sometimes
            value = inputData[i];

            // absValue is what we use to monitor volume = abs(value)
            absValue = ABS(value);

            // clip monitored volume at [0, 1]
            if (absValue > 1) {
                absValue = 1;
            }

            // keep track of volume using abs value
            if (absValue > this.currentVolume) {
                this.currentVolume = absValue;
            }

            // fill up double-buffer active buffer if recording (and
            // save every time a fill-up occurs)
            if (this.valueCB && this.isRecording) {
                this.valueCB(value);
                this.nRecordedSamples++;
            }
        } // for (i ...
    }

    /**
     * Create audioGainNode & scriptProcessorNode
     * @returns {void}
     */
    private createNodes(): void {
        // create the gainNode
        this.audioGainNode = AUDIO_CONTEXT.createGain();

        // create and configure the scriptProcessorNode
        this.scriptProcessorNode = AUDIO_CONTEXT.createScriptProcessor(
            PROCESSING_BUFFER_LENGTH,
            1,
            1);
        this.scriptProcessorNode.onaudioprocess =
            (processingEvent: AudioProcessingEvent): any => {
                this.onAudioProcess(processingEvent);
            };
    }

    /**
     * Create the following nodes:
     * this.sourceNode (createMediaStreamSourceNode)
     * |--> this.gainNode (createGain)
     *      |--> this.scriptProcessorNode (createScriptProcessor)
     *           |--> MediaStreamAudioDestinationNode
     * @param {MediaStream} stream the stream obtained by getUserMedia
     * @returns {void}
     */
    private connectNodes(stream: MediaStream): void {
        console.log('connectNodes()');
        // TODO: a check here that this.mediaStream is valid

        // create a source node out of the audio media stream
        // (the other nodes, which do not require a stream for their
        // initialization, are created in this.createNodes())
        this.sourceNode =
            AUDIO_CONTEXT.createMediaStreamSource(stream);

        // create a destination node (need something to connect the
        // scriptProcessorNode with or else it won't process audio)
        let dest: MediaStreamAudioDestinationNode =
            AUDIO_CONTEXT.createMediaStreamDestination();

        // sourceNode (microphone) -> gainNode
        this.sourceNode.connect(this.audioGainNode);

        // gainNode -> scriptProcessorNode
        this.audioGainNode.connect(this.scriptProcessorNode);

        // scriptProcessorNode -> destination
        this.scriptProcessorNode.connect(dest);

        // finally, start monitoring audio volume levels, but
        // before we do that we reset things
        this.reset();

        this.startMonitoring();

        // now you can tell the world we're ready
        this.status = RecordStatus.READY_STATE;
    }

    ///////////////////////////////////////////////////////////////////////////
    // PUBLIC API METHODS
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Ensures change detection every GRAPHICS_REFRESH_INTERVAL
     * @returns {void}
     */
    public startMonitoring(): void {
        this.masterClock.addFunction(
            RECORDER_CLOCK_FUNCTION_NAME,
            // the monitoring actions are in the following function:
            () => {
                // update currentTime property
                this.currentTime = formatTime(this.getTime(), Infinity);

                // update currentVolume property
                this.nPeakMeasurements += 1;
                if (this.currentVolume > this.maxVolumeSinceReset) {
                    // on new maximum, re-start counting peaks
                    this.resetPeaks();
                    this.maxVolumeSinceReset = this.currentVolume;
                }
                else if (this.currentVolume === this.maxVolumeSinceReset) {
                    this.nPeaksAtMax += 1;
                }

                // update percentPeaksAtMax property
                this.percentPeaksAtMax =
                    (100 * this.nPeaksAtMax / this.nPeakMeasurements)
                    .toFixed(1);
            });
    }

    /**
     * Stops monitoring (stops change detection)
     * @returns {void}
     */
    public stopMonitoring(): void {
        this.masterClock.removeFunction(RECORDER_CLOCK_FUNCTION_NAME);
    }

    /**
     * Reset all peak stats as if we've just started playing audio at
     * time 0. Call this when you want to compute stats from now.
     * @returns {void}
     */
    public resetPeaks(): void {
        this.maxVolumeSinceReset = 0;
        // at first we're always at 100% peax at max
        this.percentPeaksAtMax = '100.0';
        // make this 1 to avoid NaN when we divide by it
        this.nPeakMeasurements = 1;
        // make this 1 to match nPeakMeasurements and get 100% at start
        this.nPeaksAtMax = 1;
    }

    /**
     * Set the multiplier on input volume (gain) effectively changing volume
     * @param {number} factor fraction of volume, where 1.0 is no change
     * @returns {void}
     */
    public setGainFactor(factor: number): void {
        if (this.status === RecordStatus.READY_STATE) {
            this.audioGainNode.gain.value = factor;
        }
        this.resetPeaks();
    }

    /**
     * Start recording
     * @returns {void}
     */
    public start(): void {
        this.nRecordedSamples = 0;
        this.isRecording = true;
        this.isInactive = false;
        this.startedAt = AUDIO_CONTEXT.currentTime;
        this.pausedAt = 0;
    }

    /**
     * Pause recording
     * @returns {void}
     */
    public pause(): void {
        this.isRecording = false;
        this.pausedAt = AUDIO_CONTEXT.currentTime - this.startedAt;
    }

    /**
     * Resume recording
     * @returns {void}
     */
    public resume(): void {
        this.isRecording = true;
    }

    /**
     * Reset recording - just like this.stop() but does not  return anything.
     * @returns {void}
     */
    private reset(): void {
        this.isRecording = false;
        this.isInactive = true;
        this.startedAt = 0;
        this.pausedAt = 0;
    }

    private getTime(): number {
        if (this.pausedAt) {
            return this.pausedAt;
        }
        if (this.startedAt) {
            return AUDIO_CONTEXT.currentTime - this.startedAt;
        }
        return 0;
    }

    /**
     * Stop recording
     * @returns {Observable<RecordingInfo>}
     */
    public stop(): Observable<RecordingInfo> {
        console.log('WebAudioRecord:stop()');
        this.reset();
        return Observable.create((observer) => {
            observer.next({
                dateCreated: Date.now(),
                sampleRate: this.sampleRate,
                nSamples: this.nRecordedSamples
            });
            observer.complete();
        });
    }
}
