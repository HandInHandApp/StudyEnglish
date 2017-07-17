// Copyright (c) 2017 Tracktunes Inc

import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

import { formatLocalTime } from '../../models/utils/utils';
import {AppState,GainState} from '../../providers/app-state/app-state';
import { WebAudioRecordWav } from '../../providers/web-audio/record-wav';
import { RecordStatus } from '../../providers/web-audio/record';
import { RecordingInfo } from '../../providers/web-audio/common';
import { IdbAppFS, UNFILED_FOLDER_KEY } from '../../providers/idb-app-fs/idb-app-fs';

const START_RESUME_ICON: string = 'mic';
const PAUSE_ICON: string = 'pause';
const MAX_GAIN_SLIDER_VALUE: number = 1000;

/**
 * @name RecordPage
 * @description
 * The page from which we record audio and monitor microphone sound volume.
 */
@Component({
    selector: 'record-page',
    providers: [WebAudioRecordWav],
    templateUrl: 'record-page.html'
})
export class RecordPage {
    @ViewChild(Content) public content: Content;
    private appState: AppState;
    private idbAppFS: IdbAppFS;
    // recordButtonIcon referenced by template
    public recordButtonIcon: string = START_RESUME_ICON;
    // template members
    public webAudioRecord: WebAudioRecordWav;
    public percentGain: string;
    public maxGainFactor: number;
    public gainFactor: number;
    public decibels: string;

    // gainRangeSliderValue referenced by template
    public gainRangeSliderValue: number;
    // maxGainSliderValue referenced by template
    public maxGainSliderValue: number;
    // private gainSliderLeftIcon: string;

    /**
     * @constructor
     */
    constructor(
        appState: AppState,
        idbAppFS: IdbAppFS,
        webAudioRecord: WebAudioRecordWav
    ) {
        console.log('constructor():RecordPage');

        this.appState = appState;
        this.idbAppFS = idbAppFS;
        this.webAudioRecord = webAudioRecord;

        this.maxGainSliderValue = MAX_GAIN_SLIDER_VALUE;

        // initialize with "remembered" gain values
        this.appState.getProperty('gain').then(
            (gain: GainState) => {
                this.gainFactor = gain.factor;
                this.maxGainFactor = gain.maxFactor;
                // this call, duplicated below, sets up the gain
                // slider to show what we're setting gain to once
                // the audio is ready.  before the audio is ready
                // we still want to show the previous gain value.
                // if we don't have this line below then it will
                // always show up as gain == 0.
                this.gainRangeSliderValue =
                    MAX_GAIN_SLIDER_VALUE * gain.factor / gain.maxFactor;
                this.onGainChangeEnd(this.gainRangeSliderValue);
            }
        );
    }

    /**
     * Returns whether this.ebAudioRecord is fully initialized
     * @returns {boolean}
     */
    public recorderIsReady(): boolean {
        return this.webAudioRecord &&
            this.webAudioRecord.status === RecordStatus.READY_STATE;
    }

    public onResetGain(): void {
        console.log('onResetGain()');

        // 0.5 if progress-slider is used instead of ion-range:
        // this.gainRangeSliderValue = 0.5;
        this.gainRangeSliderValue = 0.5 * MAX_GAIN_SLIDER_VALUE;

        this.onGainChangeEnd(this.gainRangeSliderValue);
    }

    // public onGainChange(position: number): void {
    //     this.gainFactor = position * this.maxGainFactor;
    public onGainChange(sliderValue: number): void {
        const position: number = sliderValue / MAX_GAIN_SLIDER_VALUE;
        this.gainFactor = position * this.maxGainFactor;

        this.webAudioRecord.setGainFactor(this.gainFactor);

        if (position === 0) {
            this.decibels = 'Muted';
            // this.gainSliderLeftIcon = 'mic-off';
        }
        else {
            this.decibels =
                (10.0 * Math.log(this.gainFactor)).toFixed(2) + ' dB';
            // this.gainSliderLeftIcon = 'mic';
        }
        this.percentGain = (this.gainFactor * 100.0).toFixed(0);
    }

    public onGainChangeEnd(position: number): void {
        console.log('onGainChangeEnd(' + position.toFixed(2) + '): ' +
            this.gainFactor + ', ' + this.maxGainFactor);
        this.onGainChange(position);
        this.appState.updateProperty('gain', {
            factor: this.gainFactor,
            maxFactor: this.maxGainFactor
        }).then(null, (error: any) => {
            const msg: string = 'AppState:updateProperty(): ' + error;
            alert(msg);
            throw Error(msg);
        });
    }

    /**
     * Start/pause recording - template button click callback
     * @returns {void}
     */
    public onClickStartPauseButton(): void {
        // this.currentVolume += Math.abs(Math.random() * 10);
        if (this.webAudioRecord.isRecording) {
            // we're recording (when clicked, so pause recording)
            this.webAudioRecord.pause();
            this.recordButtonIcon = START_RESUME_ICON;
        }
        else {
            // we're not recording (when clicked, so start/resume recording)
            if (this.webAudioRecord.isInactive) {
                // inactive, we're stopped (rather than paused) so start
                this.webAudioRecord.start();
            }
            else {
                // it's active, we're just paused, so resume
                this.webAudioRecord.resume();
            }
            this.recordButtonIcon = PAUSE_ICON;
        }
    }

    /**
     * Stop button - template button click callback
     * @returns {void}
     */
    public onClickStopButton(): void {
        this.recordButtonIcon = START_RESUME_ICON;
        this.webAudioRecord.stop().subscribe(
            (recordingInfo: RecordingInfo) => {
                const fileName: string =
                    formatLocalTime(recordingInfo.dateCreated);
                this.idbAppFS.createNode(
                    fileName,
                    UNFILED_FOLDER_KEY,
                    recordingInfo
                ).subscribe();
            });
    }

    public onRangeTouchEnd(): void {
        console.log('onRangeTouchEnd');
    }

    public ionViewDidEnter(): void {
        console.log('RecordPage:ionViewDidEnter()');
        this.webAudioRecord.startMonitoring();
        // if we don't do this.content.resize() here then
        // the volume gauge does not show
        this.content.resize();
    }

    public ionViewDidLeave(): void {
        console.log('RecordPage:ionViewDidLeave()');
        this.webAudioRecord.stopMonitoring();
    }
}
