// Copyright (c) 2017 Tracktunes Inc

import { Injectable } from '@angular/core';
import { WAV_MIME_TYPE, RecordingInfo } from './common';
import { DB_CHUNK_LENGTH } from './record-wav';
import { IdbAppData } from '../idb-app-data/idb-app-data';
import { makeWavBlobHeaderView } from '../../models/utils/wav';
import { downloadBlob } from '../../models/utils/utils';

@Injectable()
export class WebAudioSaveWav {
    private idb: IdbAppData;
    private blob: Blob;
    private keyOffset: number;
    private lastKeyOffset: number;

    constructor(idb: IdbAppData) {
        this.idb = idb;
        this.blob = null;
        this.keyOffset = 0;
        this.lastKeyOffset = 0;
    }

    public save(recordingInfo: RecordingInfo, fileName: string): void {
        console.log('WebAudioSaveWav:save(' +
            recordingInfo.dbStartKey + this.keyOffset + ')');
        this.idb.readChunk(
            recordingInfo.dbStartKey +
            this.keyOffset
        ).subscribe(
            (wavArray: Int16Array) => {
                if (this.blob) {
                    // blob already exists, append to it
                    this.blob = new Blob(
                        [this.blob, wavArray], { type: WAV_MIME_TYPE }
                    );
                    console.log('Blob size: ' + this.blob.size);
                }
                else {
                    // no blob initialized yet, create it and init members
                    this.keyOffset = 0;
                    this.lastKeyOffset =
                        Math.floor(recordingInfo.nSamples / DB_CHUNK_LENGTH);
                    this.blob = new Blob(
                        [
                            makeWavBlobHeaderView(
                                recordingInfo.nSamples,
                                recordingInfo.sampleRate
                            ),
                            wavArray
                        ],
                        { type: WAV_MIME_TYPE }
                    );
                    console.log('Blob size: ' + this.blob.size);
                }
                if (this.keyOffset === this.lastKeyOffset) {
                    // base case: we're at the end of the recursion
                    // console.dir(this.blob);

                    // NOTE: we cannot use the below
                    // (a) because some browsers don't support the url that's
                    // created the way it's created here as the href field;
                    // (b) because chrome on android would not allow this - it
                    //     considers it to be a cross origin request, so at
                    //     this point we cannot ownload anyway on mobile...

                    try {
                        downloadBlob(this.blob, fileName);
                        // console.log(FileTransfer);
                    }
                    catch (err) {
                        alert('save err: ' + err);
                    }

                    this.blob = null;

                    console.log('saving done!');
                }
                else {
                    // not done, recurse
                    this.keyOffset++;
                    this.save(recordingInfo, fileName);
                }
            }
        );
    }
}
