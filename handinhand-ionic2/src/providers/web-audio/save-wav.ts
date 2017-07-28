// Copyright (c) 2017 Tracktunes Inc

import { Injectable } from '@angular/core';
import { WAV_MIME_TYPE, RecordingInfo } from './common';
import { AUDIO_CONTEXT} from './common';

import { DB_CHUNK_LENGTH } from './record-wav';
import { IdbAppData } from '../idb-app-data/idb-app-data';
import { makeWavBlobHeaderView } from '../../models/utils/wav';
import { downloadBlob } from '../../models/utils/utils';

import { Observable } from 'rxjs/Rx';
import { isOdd, formatTime } from '../../models/utils/utils';
import { ConferenceData } from '../conference-data';


@Injectable()
export class WebAudioSaveWav {
    private idb: IdbAppData;
    private blob: Blob;
    private keyOffset: number;
    private lastKeyOffset: number;

    private oddKeyFileReader: FileReader;
    private evenKeyFileReader: FileReader;

    constructor(idb: IdbAppData, public confData: ConferenceData) {
        this.idb = idb;
        this.blob = null;
        this.keyOffset = 0;
        this.lastKeyOffset = 0;

        this.oddKeyFileReader = new FileReader();
        this.evenKeyFileReader = new FileReader();

    }

    public postWav(filename,url){
        this.confData.postuserRecoder(filename,url);
   
    }

    public save(recordingInfo: RecordingInfo, fileName: string, pushtoclould?:boolean): void {
        console.log('WebAudioSaveWav:save(' +
            recordingInfo.dbStartKey + this.keyOffset + ')');
        this.idb.readChunk(
            recordingInfo.dbStartKey +
            this.keyOffset
        ).subscribe(
            (wavArray: Int16Array) => {
                var url;
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
                        url = downloadBlob(this.blob, fileName);
                        if(pushtoclould){
                            this.postWav(fileName, this.blob)
                        }
                    }
                    catch (err) {
                        alert('save err: ' + err);
                    }

                    this.blob = null;

                    console.log('saving done! : '+url);
                    // return url
                }
                else {
                    // not done, recurse
                    this.keyOffset++;
                    if(pushtoclould){
                        this.save(recordingInfo, fileName,pushtoclould);
                    }else{
                        this.save(recordingInfo, fileName);
                    }
                    
                }
            }
        );
    }

    

    private getFileReader(key: number): FileReader {
        // console.log('getFileReader(' + key + ') -> ' +
        //     (isOdd(key) ? 'ODD' : 'EVEN'));
        return isOdd(key) ? this.oddKeyFileReader : this.evenKeyFileReader;
    }

    public savepost(recordingInfo: RecordingInfo, fileName: string):  Observable<AudioBuffer> {
        console.log('WebAudioSaveWav:save(' +
            recordingInfo.dbStartKey + this.keyOffset + ')');

            let obs: Observable<AudioBuffer> = Observable.create((observer) => {
                var key =recordingInfo.dbStartKey + this.keyOffset
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
}
