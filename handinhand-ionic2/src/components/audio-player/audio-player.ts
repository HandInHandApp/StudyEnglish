// Copyright (c) 2017 Tracktunes Inc

import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { WebAudioPlayWav } from '../../providers/web-audio/play-wav';
import { RecordingInfo } from '../../providers/web-audio/common';

/**
 * @name AudioPlay
 * @description
 * An toolbar-like (row on the screen) audio player for controlling
 * blob playback.
 */
@Component({
    providers: [WebAudioPlayWav],
    selector: 'audio-player',
    templateUrl: 'audio-player.html'
})
export class AudioPlay implements OnChanges {
    @Input() public recordingInfo: RecordingInfo;
    public player: WebAudioPlayWav;

    /**
     * @constructor
     */
    constructor(player: WebAudioPlayWav) {
        console.log('constructor():AudioPlay');
        this.player = player;
    }

    /**
     * Handle changes (play new song) when a new song (url) is loaded
     * @returns {void}
     */
    public ngOnChanges(
        changeRecord: {
            [propertyName: string]: SimpleChange }
    ): void {
        if (changeRecord['recordingInfo'] && this.recordingInfo) {
            console.log('AudioPlay:ngOnChanges(): [recordingInfo]: ' +
                this.recordingInfo);
            this.player.setRecordingInfo(this.recordingInfo);
        }
    }

    public ngOnInit(): void {
        console.log('AudioPlay:ngOnInit()');
        // TODO: this maintains monitoring throughout app, you
        // can do this better by stopping to monitor when going to
        // another page but then there will need to be communication
        // between the track page and this directive to tell the
        // directive to start/stop monitoring. We can start monitoring
        // upon player.relativeTimeSeek() and stop monitoring upon
        // player.pause() or player.stop() - but right now that does
        // not work due to race conditions (perhaps add a setTimeout()
        // to delay the stop monitoring command?)
        // this.player.startMonitoring();
    }

    public ngOnDestroy(): void {
        console.log('AudioPlay:ngOnDestroy()');
        this.player.stopMonitoring();
    }
}
