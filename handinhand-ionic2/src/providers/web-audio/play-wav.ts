// Copyright (c) 2017 Tracktunes Inc

import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AUDIO_CONTEXT, WAV_MIME_TYPE, RecordingInfo } from './common';
import { DB_CHUNK_LENGTH } from './record-wav';
import { WebAudioPlay } from './play';
import { isOdd, formatTime } from '../../models/utils/utils';
import { IdbAppData } from '../idb-app-data/idb-app-data';
import { MasterClock } from '../master-clock/master-clock';
import { makeWavBlobHeaderView } from '../../models/utils/wav';

/**
 * @name WebAudioPlay
 * @description
 * Audio Play functions based on WebAudio, originally based on code
 * of Ian McGregor here: http://codepen.io/ianmcgregor/pen/EjdJZZ
 */
@Injectable()
export class WebAudioPlayWav extends WebAudioPlay {
    private idb: IdbAppData;
    private recordingInfo: RecordingInfo;
    private chunkDuration: number;
    private dbStartKey: number;
    private nSamples: number;
    private dbEndKey: number;
    private chunkStartTime: number;
    private oddKeyFileReader: FileReader;
    private evenKeyFileReader: FileReader;
    // private onEndeds: { [id: string]: number };

    constructor(masterClock: MasterClock, idb: IdbAppData) {
        super(masterClock);
        console.log('constructor():WebAudioPlayWav');
        this.idb = idb;
        if (!this.idb) {
            throw Error('WebAudioPlayWav:constructor(): db unavailable.');
        }
        this.oddKeyFileReader = new FileReader();
        this.evenKeyFileReader = new FileReader();
        // this.onEndeds = {};
    }

    public setRecordingInfo(recordingInfo: RecordingInfo): void {
        this.recordingInfo = recordingInfo;
        this.nSamples = this.recordingInfo.nSamples;
        this.dbStartKey = this.recordingInfo.dbStartKey;
        // this is how you set the total duration that will be displayed
        this.duration =
            this.nSamples / this.recordingInfo.sampleRate;
        this.displayTime = formatTime(0, this.duration);
        this.displayDuration = formatTime(this.duration, this.duration);
        this.chunkDuration =
            DB_CHUNK_LENGTH / this.recordingInfo.sampleRate;
        this.dbEndKey =
            this.dbStartKey + Math.floor(this.nSamples / DB_CHUNK_LENGTH);
    }

    private getFileReader(key: number): FileReader {
        // console.log('getFileReader(' + key + ') -> ' +
        //     (isOdd(key) ? 'ODD' : 'EVEN'));
        return isOdd(key) ? this.oddKeyFileReader : this.evenKeyFileReader;
    }

    private getOnEndedCB(key: number): () => void {
        const nextKey: number = key + 2;
        // console.log('getOnEndedCB(' + key + '), scheduling key ' +
        //     nextKey);

        if (nextKey > this.dbEndKey) {
            return () => {
                console.log('====> onEndedCB(' + nextKey +
                    ') - reached last chunk');
            };
        }
        else {
            return () => {
                const when: number = this.getChunkWhenTime(nextKey);
                // const dictKey: string = nextKey.toString(),
                //     when: number = this.getChunkWhenTime(nextKey);
                // if (has(this.onEndeds, dictKey)) {
                //     // prevents calling onEnded() twice in succession as
                //     // happens in chrome/chromium when you don't start at 0
                //     return;
                // }
                // else {
                //     this.onEndeds[dictKey] = when;
                // }

                console.log('====> onEndedCB(' + nextKey + '), time = ' +
                    this.getTime().toFixed(2) + ', when: ' +
                    (when - this.startedAt).toFixed(2));

                this.loadAndDecodeChunk(nextKey).subscribe(
                    (audioBuffer: AudioBuffer) => {
                        this.schedulePlay(
                            audioBuffer,
                            when,
                            0,
                            0,
                            this.getOnEndedCB(nextKey)
                        );
                    });

            };
        }
    }

    private getChunkWhenTime(key: number): number {
        if (key > this.dbEndKey) {
            throw Error('key > dbEndKey');
        }
        const deltaKey: number = key - this.dbStartKey;
        if (deltaKey === 0) {
            throw Error('Do not schedule the now for later!');
        }
        // if (this.startedAt === 0) {
        //     throw Error('this.startedAt === 0!');
        // }
        else {
            console.log('====> getChunkWhenTime(' + key + ') returned ' +
                (deltaKey * this.chunkDuration).toFixed(2));
            return this.startedAt + deltaKey * this.chunkDuration;
        }
    }

    private loadAndDecodeChunk(key: number): Observable<AudioBuffer> {
        // console.log('loadAndDecodeChunk(' + key + ')');
        let obs: Observable<AudioBuffer> = Observable.create((observer) => {
            const fileReader: FileReader = this.getFileReader(key);
            this.idb.readChunk(key).subscribe(
                (wavArray: Int16Array) => {
                    // console.log('idb.readChunk(): got chunk ' + key);

                    fileReader.onerror = (error) => {
                        console.warn('FileReader error: ' + error);
                        observer.error('FileReader error: ' +
                            fileReader.error);
                    };

                    fileReader.onload = () => {
                        // console.log('fileReader.onload()');
                        AUDIO_CONTEXT.decodeAudioData(
                            fileReader.result,
                            (audioBuffer: AudioBuffer) => {
                                // console.log('!!! Audio Data Decoded !!! ' +
                                //     audioBuffer.duration);
                                // console.dir(audioBuffer);
                                observer.next(audioBuffer);
                                observer.complete();
                            },
                            () => {
                                console.warn('decodeAudioData Error!');
                                observer.error('decodeAudioData Error!');
                            });
                    };

                    // console.log('READING FILE!');
                    // fileReader.readAsArrayBuffer(
                    //     int16ArrayToWavBlob(wavArray)
                    // );
                    fileReader.readAsArrayBuffer(
                        new Blob(
                            [
                                makeWavBlobHeaderView(
                                    wavArray.length,
                                    AUDIO_CONTEXT.sampleRate
                                ),
                                wavArray
                            ],
                            { type: WAV_MIME_TYPE })
                    );
                });
        });
        return obs;
    }

    public relativeTimeSeek(relativeTime: number): void {
        this.stop(false);
        const
            absoluteSampleToSkipTo: number =
            Math.floor(relativeTime * this.recordingInfo.nSamples),
            chunkSampleToSkipTo: number =
            absoluteSampleToSkipTo % DB_CHUNK_LENGTH,
            startKey: number =
            this.recordingInfo.dbStartKey +
            Math.floor(absoluteSampleToSkipTo / DB_CHUNK_LENGTH),
            startOffset: number =
            (startKey - this.recordingInfo.dbStartKey) *
            this.chunkDuration;
        this.chunkStartTime =
            chunkSampleToSkipTo * this.chunkDuration / DB_CHUNK_LENGTH;
        console.log('relativeTimeSeek(' + relativeTime.toFixed(2) +
            ') -- duration: ' + this.duration.toFixed(2) + ', ' +
            'skip-to-sample: ' + absoluteSampleToSkipTo + ', ' +
            '# samples: ' + this.recordingInfo.nSamples + ', ' +
            'startKey: ' + startKey + ', ' +
            'endKey: ' + this.dbEndKey);
        this.loadAndDecodeChunk(startKey).subscribe(
            (audioBuffer1: AudioBuffer) => {
                // console.log('loaded and decoded chunk 1 ... ');
                const playFirstBuffer: () => void = () => {
                    this.schedulePlay(
                        audioBuffer1,
                        0,
                        this.chunkStartTime,
                        startOffset,
                        this.getOnEndedCB(startKey)
                    );
                };
                if (startKey < this.dbEndKey) {
                    // play/schedule both 1st & 2nd buffers
                    this.loadAndDecodeChunk(startKey + 1).subscribe(
                        (audioBuffer2: AudioBuffer) => {
                            playFirstBuffer();
                            this.schedulePlay(
                                audioBuffer2,
                                // this.startedAt + this.chunkDuration,
                                this.getChunkWhenTime(startKey + 1),
                                0,
                                0,
                                this.getOnEndedCB(startKey + 1)
                            );
                        });
                }
                else {
                    // no 2nd buffer, play 1st
                    playFirstBuffer();
                }
            }
        );
    } // public timeSeek(time: number): void {

    public stop(stopMonitoring: boolean = true): void {
        super.stop(stopMonitoring);
        // this.onEndeds = {};
    }

    public togglePlayPause(): void {
        if (!this.isPlaying) {
            this.relativeTimeSeek(
                (this.pausedAt - this.startedAt) / this.duration);
        }
        else {
            this.pause();
            console.log('paused at: ' + this.pausedAt);
        }
    }
}
