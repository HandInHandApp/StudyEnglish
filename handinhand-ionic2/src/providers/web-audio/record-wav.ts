// Copyright (c) 2017 Tracktunes Inc

import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { IdbAppData } from '../idb-app-data/idb-app-data';
import { RecordingInfo, WAV_MIME_TYPE } from './common';
import { DoubleBufferSetter } from '../../models/utils/double-buffer';
import { WebAudioRecord } from './record';
import { MasterClock } from '../master-clock/master-clock';
import { MAX, MIN } from '../../models/utils/utils';

// make this a multiple of PROCESSING_BUFFER_LENGTH
export const DB_CHUNK_LENGTH: number = 131072;

// pre-allocate the double chunk buffers used for saving to DB
const DB_CHUNK1: Int16Array = new Int16Array(DB_CHUNK_LENGTH);
const DB_CHUNK2: Int16Array = new Int16Array(DB_CHUNK_LENGTH);

/**
 * @name WebAudioRecord
 * @description
 * Audio Record functions based on WebAudio.
 */
@Injectable()
export class WebAudioRecordWav extends WebAudioRecord {
    private idb: IdbAppData;
    private dbKeys: number[];
    private setter: DoubleBufferSetter;

    // this is how we signal
    constructor(masterClock: MasterClock, idb: IdbAppData) {
        super(masterClock);

        console.log('constructor():WebAudioRecordWav');

        this.idb = idb;
        this.dbKeys = [];

        this.setter = new DoubleBufferSetter(DB_CHUNK1, DB_CHUNK2, () => {
            this.idb.createChunk(this.setter.activeBuffer).subscribe(
                (key: number) => {
                    // increment the buffers-saved counter
                    this.dbKeys.push(key);
                    console.log('saved chunk: ' + this.dbKeys.length +
                        ', key: ' + key);
                });
        });

        // see:
        // https://github.com/dorontal/Recordjs/blob/master/dist/record.js
        this.valueCB = (rawFloat: number) => {
            const clipped: number = MAX(-1, MIN(1, rawFloat));
            this.setter.setNext(
                clipped < 0 ? clipped * 0x8000 : clipped * 0x7fff);
        };
    }

    /**
     * Stop recording
     * Precondition: called start() already
     * @returns {void}
     */
    public stop(): Observable<RecordingInfo> {
        console.log('WebAudioRecordWav:stop()');
        let obs: Observable<RecordingInfo> = Observable.create((observer) => {
            super.stop().subscribe(
                (recordingInfo: RecordingInfo) => {
                    const lastChunk: Int16Array = this.setter.activeBuffer
                        .subarray(0, this.setter.bufferIndex);
                    this.idb.createChunk(lastChunk).subscribe(
                        (key: number) => {
                            this.dbKeys.push(key);
                            console.log('saved final chunk: ' +
                                this.dbKeys.length + ', key: ' + key);
                            // update some essential components of data
                            // stored in db
                            recordingInfo.encoding = WAV_MIME_TYPE;
                            recordingInfo.size = recordingInfo.nSamples * 2;
                            recordingInfo.dbStartKey = this.dbKeys[0];
                            // reset db-keys, for the next recording
                            this.dbKeys = [];
                            // reset double buffer, for the next recording
                            this.setter.reset();
                            // return result now that db-save is done
                            observer.next(recordingInfo);
                            observer.complete();
                        });
                });
        });
        return obs;
    }
}
