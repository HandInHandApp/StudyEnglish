import { Component } from '@angular/core';


import { NavParams } from 'ionic-angular';


import { ConferenceData } from '../../../providers/conference-data';
// import { TimerPage   } from '../timer/timer'

import { Media } from '@ionic-native/media';
import { MediaObject } from '@ionic-native/media';
import {  AlertController } from 'ionic-angular';

import { File } from '@ionic-native/file';


// import { RecordPage } from '../../record-page/record-page';

import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { formatLocalTime } from '../../../models/utils/utils';
import {AppState,GainState} from '../../../providers/app-state/app-state';
import { WebAudioRecordWav } from '../../../providers/web-audio/record-wav';
import { RecordStatus } from '../../../providers/web-audio/record';
import { RecordingInfo } from '../../../providers/web-audio/common';
import { IdbAppFS, UNFILED_FOLDER_KEY } from '../../../providers/idb-app-fs/idb-app-fs';
import { WebAudioSaveWav } from '../../../providers/web-audio/save-wav';

const START_RESUME_ICON: string = 'mic';
const PAUSE_ICON: string = 'pause';
const MAX_GAIN_SLIDER_VALUE: number = 1000;



@Component({
  selector: 'page-speaking-page',
  providers: [WebAudioRecordWav,WebAudioSaveWav],
  templateUrl: 'speaking-test.html'
})
export class SpeakingTestPage {
  
    @ViewChild(Content) public content: Content;
    private webAudioSaveWav: WebAudioSaveWav;
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


  endDate =  601*1000 ;
  toplist: any[] = []
  session: any;
  type: any;
  tpourl:any;
  headername:any;

  passages: any;
  first_step: any;
  last_step: any;
  stepindex=0;
  step="";
  steps: any[];
  last_stepindex: any;
  total_question: number = 0;
  total_passage: number = 0;


  constructor(public navParams: NavParams, 
    public confData: ConferenceData, 
    private media: Media,
    public file: File,
    public alertCtrl: AlertController,
    
    webAudioSaveWav: WebAudioSaveWav,
    appState: AppState,
    idbAppFS: IdbAppFS,
    webAudioRecord: WebAudioRecordWav
    // public mediaObject:MediaObject
  ) {
        this.session = navParams.data.session;
        this.type = navParams.data.type;
        this.tpourl = navParams.data.url;
        this.headername = navParams.data.headername;
        confData.getListeningTestData(this.tpourl)
          .subscribe(resulte => 
                  {
                    this.passages =resulte;
                    this.steps = this.passages["steps"];
                    this.first_step =  this.steps[this.stepindex];
                    this.step = this.first_step;
                    this.last_step =  this.steps[this.passages["steps"].length-1];
                    this.last_stepindex = this.passages["steps"].length-1;
                    this.get_total_graph(this.steps);
                    console.log(resulte)
                  }
              );

        console.log('constructor():RecordPage');

        this.webAudioSaveWav = webAudioSaveWav;
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

// record() {
//   this.file.createFile(this.file.tempDirectory, 'record.m4a', true).then(() => {
//     // let mediaObject = this.media.create(this.file.tempDirectory.replace(/^file:\/\//, '') + 'record.m4a');
//     let mediaObject = this.media.create("documents://beer.mp3");
//     mediaObject.startRecord();
//     window.setTimeout(() => {
//       mediaObject.stopRecord();
//       mediaObject.release();
//       /** Do something with the record file and then delete */
//       // this.file.removeFile(this.file.tempDirectory, 'record.m4a');
//     }, 10000);
//   });
// }
// recordAudio() {
//     // var src = "myrecording.mp3";
//     var file: MediaObject = this.media.create("documents://beer.mp3")
//     // to listen to plugin events:

// file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes

// file.onSuccess.subscribe(() => console.log('Action is successful'));

// file.onError.subscribe(error => console.log('Error!', error));

// // play the file
// file.play();

// // pause the file
// file.pause();
// }

// isStartRecording =false;
// mediaObject : MediaObject;
// isNewRecord=true;
// isPlayingRecord=false;
// fileName;
//   statusCallback(){
    
//   }

//   showAlert(message) {
//   let alert = this.alertCtrl.create({
//     title: 'Error',
//     subTitle: message,
//     buttons: ['OK']
//   });
//   alert.present();
// }

// startRecording() {
//         try {
//     // Here we only want to get formated date-time to attach to file name.
//     let fileNameAux = "documents://beer.mp3" //this.getNewRecordingFileName();
//     fileNameAux = this.file.dataDirectory + fileNameAux;
//     // if (this.imrCommonsService.isIos()) {
//     if (true) {
//       // https://github.com/driftyco/ionic-native/issues/1452#issuecomment-299605906
//       // fileNameAux = fileNameAux.replace(/^file:\/\//, '');
//     }
//     // console.log('UploadAudioPage.startRecording() -> fileName: ' + fileNameAux)
//     // this.mediaObject = this.media.create(fileNameAux,onStatusUpdate, onSuccess, onError);
//     this.mediaObject = this.media.create(fileNameAux);

            
//     this.mediaObject.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes

//     this.mediaObject.onSuccess.subscribe(() => console.log('Action is successful'));

//     this.mediaObject.onError.subscribe(error => console.log('Error!', error));
//     // this.mediaObject.statusCallback= this.statusCallback();

//     this.isStartRecording = true;


//     this.mediaObject.startRecord();

//              if (!this.isNewRecord) {
//       this.isNewRecord = true;
//     }

//     this.fileName = fileNameAux;

//     // let media = new MediaPlugin('../Library/NoCloud/recording.wav');
//     // media.startRecord();
//   }
//   catch (e) {
//     this.showAlert('Could not start recording.');
//   }

   

//   }



//   stopRecording() {
//     this.mediaObject.stopRecord();
//     this.isStartRecording = false;
//   }

//   startPlayback() {
//     this.mediaObject.play();
//     this.isPlayingRecord = true;
//   }

//    stopPlayback() {
//     this.mediaObject.stop();
//     this.isPlayingRecord = false;
 
//     console.log('UploadAudioPage.stopPlayback() -> filename: ' + this.fileName);   
//     this.file.resolveLocalFilesystemUrl(this.file.dataDirectory + this.fileName).then(res => {
//       console.log(res.toURL());
//     }).catch(error => {
//       console.log(JSON.stringify(error));
//     })
//   }
  // const file: MediaObject = this.media.create('path/to/file.mp3');

  private get_total_graph(steps: any[]){
    for(let step of steps){
      if(step.indexOf("p")!=-1){
        this.total_passage=this.total_passage+1
      }else{
        this.total_question=this.total_question+1
      }
    }
  }


  gotoNext(){
      if(this.stepindex != this.last_stepindex){
        this.stepindex = this.stepindex+1
        this.step =  this.steps[this.stepindex]

        this.endDate = 601*1000
        //  (new Date( (new Date()).getTime()  +  600*1000 ))
      }
      console.log(this.step)
  }
  gotoBack(){
      if( this.stepindex != 0){
        this.stepindex = this.stepindex-1
        this.step =  this.steps[this.stepindex]
      } 
       console.log(this.step)
  }
  gotoHome(){
      
  }

  // 小时差
 private hour: number;
 // 分钟差
 private minute: number;
 private minutestr: any;
 // 秒数差
 private second: number;
 private secondstr: any;
 // 时间差
 private _diff: number;
 private get diff() {
  return this._diff;
 }
 private set diff(val) {
  this._diff = Math.floor(val / 1000);
  this.hour = Math.floor(this._diff / 3600);
  this.minute = Math.floor((this._diff % 3600) / 60);
  this.second = (this._diff % 3600) % 60;
    
  this.minutestr = (this.minute<10)?  ("0"+this.minute.toString()): this.minute.toString() ;
  this.secondstr = (this.second<10)?  ("0"+this.second.toString()): this.second.toString() ;
 }
 // 定时器
 private timer;

 // 每一秒更新时间差
 ngAfterViewInit() {
  this.timer = setInterval(() => {
   this.endDate = this.endDate - 1000;
   this.diff = this.endDate
   console.log(this.endDate)
   console.log(this.diff)
   if(this.diff  <= 0){
     this.gotoNext()
   }
  }, 1000);
 }

 // 销毁组件时清除定时器
 ngOnDestroy() {
  if (this.timer) {
   clearInterval(this.timer);
  }
 }

// AudioRecorder plus.audio.getRecorder();
// x= document.addEventListener( "plusready", onPlusReady, false );
// r = null; 
// // 扩展API加载完毕，现在可以正常调用扩展API 
// onPlusReady() { 
// 	r = plus.audio.getRecorder(); 
// }
// startRecord() {
// 	if ( r == null ) {
// 		alert( "Device not ready!" );
// 		return; 
// 	} 
// 	r.record( {filename:"_doc/audio/"}, function () {
// 		alert( "Audio record success!" );
// 	}, function ( e ) {
// 		alert( "Audio record failed: " + e.message );
// 	} );
// }
// stopRecord() {
// 	r.stop(); 
// }




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
                ).subscribe(
                    ()=>{
                        this.webAudioSaveWav.save(recordingInfo, fileName + '.wav');
                        console.log("createNode success:"+fileName)
                    }
                );
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
