import { Component } from '@angular/core';


//import { NavParams } from 'ionic-angular';

import { NavController, AlertController, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../../providers/conference-data';
// import { TimerPage   } from '../timer/timer'

import { Media } from '@ionic-native/media';
import { MediaObject } from '@ionic-native/media';
// import {  AlertController } from 'ionic-angular';

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

import { RecordListPage } from '../recordlist-page/recordlist-page';

import { LoadingController } from 'ionic-angular';
import { ProgressPage   } from '../progress/progress'

const START_RESUME_ICON: string = 'mic';
const PAUSE_ICON: string = 'pause';
const MAX_GAIN_SLIDER_VALUE: number = 1000;



@Component({
  selector: 'page-speaking-page',
  providers: [WebAudioRecordWav,WebAudioSaveWav],
  templateUrl: 'speaking-test.html'
//   directives: [TimerPage]
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
    audio: any;
    myfiles:any;

  endDate =  601*1000 ;
  counttime =  10*1000 ;
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
myrecord=[{
    "name":"test"
}]
timer_stop=false;
startrecord=0;
praparetimer=15*1000;
recordtimer=45*1000;
refreshtimer=0;
loadProgress=45;

  constructor(public navParams: NavParams, 
    public navCtrl: NavController,
    public confData: ConferenceData, 
    private media: Media,
    public file: File,
    public alertCtrl: AlertController,
    
    webAudioSaveWav: WebAudioSaveWav,
    appState: AppState,
    idbAppFS: IdbAppFS,
    webAudioRecord: WebAudioRecordWav,
    public loadingCtrl: LoadingController
    // public mediaObject:MediaObject
  ) {
        this.session = navParams.data.session;
        this.type = navParams.data.type;
        this.tpourl = navParams.data.url;
        this.headername = navParams.data.headername;


        confData.getSpeakingTestData(this.tpourl)
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





  private get_total_graph(steps: any[]){
    for(let step of steps){
      if(step.indexOf("p")!=-1){
        this.total_passage=this.total_passage+1
      }else{
        this.total_question=this.total_question+1
      }
    }
  }

  playaudo(){
    if(this.step.indexOf('p')!=-1){
      this.playStepMp3(this.passages.passage[this.step].mp3)
      console.log(this.passages.passage[this.step])
    }else if(this.step.indexOf('q')!=-1){
          this.playStepMp3(this.passages.question[this.step].mp3)
          console.log(this.passages.question[this.step])
    }else{}
  }

  gotoNext(){
      if(this.stepindex != this.last_stepindex){
        this.stepindex = this.stepindex+1
        this.step =  this.steps[this.stepindex]

        this.endDate = 601*1000
        //  (new Date( (new Date()).getTime()  +  600*1000 ))
      }
      console.log(this.step)
      this.playaudo() 
       
       
  }
  gotoBack(){
      if( this.stepindex != 0){
        this.stepindex = this.stepindex-1
        this.step =  this.steps[this.stepindex]
      } 
       console.log(this.step)
       this.playaudo() 
  }

  gotoHome() {
    // this.navCtrl.popTo(this.navCtrl.first())
    this.navCtrl.pop()
      
  }

  playStepMp3(mp3file){
      if(mp3file !=""){
          if(this.audio){
            this.audio.pause() ;
          }
          
        this.audio = new Audio(mp3file);
        this.audio.play();

        this.audio.onended= () => { 
            console.log(mp3file+" ended !! ");
        }
      }
       
  }
//  <audio autoplay id='Audio1'  *ngIf="passages.question[item].mp3!=''">
//                               <source src={{passages.question[item].mp3}} type='audio/mpeg' />
//                         </audio>


  playAudio1() {
        this.startrecord=1
        var audio = new Audio('assets/mp3/speakingprepaerafterbepe.mp3');
        audio.play();

        audio.onended= () => { 
            console.log("speakingprepaerafterbepe ended !! ");
             this.startrecord=2
             this.loadProgress=15
            //  this.loadProgressfun()
        }
    };

  playAudio2 (){
      console.log("speakingprepaerafterbepe ended ");
      
      var audio = new Audio('assets/mp3/speakingafterbepe.mp3');

      audio.onended= () => { 
            console.log("speakingprepaerafterbepe ended, start record !! ");
             this.startrecord=3
             this.onClickStartPauseButton()
            
             this.loadProgress=45
            //  this.loadProgressfun()
            
             
        }
      audio.play();
  };

  stoprecord(){
        this.startrecord=0 ;
        this.onClickStopButton()
  }
  stopTiming() {
      if(this.timer_stop == false){
            this.timer_stop=true;
      }else{
          this.timer_stop = false;
      }
      
  }
  timerEnd(timertitle) { 
      console.log(timertitle + ' timer End'); 
      if(timertitle == "prapare"){
          this.playAudio2();
      }else if(timertitle == "recording" ){
         if(this.startrecord==3){
            this.startrecord=0 ;
            this.onClickStopButton()
         }
         
      }else{
        
        console.log("unkonw"+timertitle + ' timer End'); 
      }
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
        console.log("onClickStartPauseButton recording")
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
        this.startrecord=0 ;
        console.log("onClickStopButton recording")
        this.recordButtonIcon = START_RESUME_ICON;
        this.webAudioRecord.stop().subscribe(
            (recordingInfo: RecordingInfo) => {
                const fileName: string =
                    this.headername +"_" + this.step+ "_" + formatLocalTime(recordingInfo.dateCreated);
                this.idbAppFS.createNode(
                    fileName,
                    UNFILED_FOLDER_KEY,
                    recordingInfo
                ).subscribe(
                    ()=>{
                        var url =this.webAudioSaveWav.save(recordingInfo, fileName + '.wav');
                        
                        this.refreshtimer= this.refreshtimer+1;
                        // var url =this.webAudioSaveWav.savepost(recordingInfo, fileName + '.wav').subscribe(
                        //     (audioBuffer1: AudioBuffer) => {
                        //         console.log("createNode success:"+fileName +" url:"+ url)
                        //          this.confData.postuserRecoder("fileName", url);
                        //     }
                        // )
                        
                        
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
        this.refreshtimer=0
    }

    public ionViewDidLeave(): void {
        console.log('RecordPage:ionViewDidLeave()');
        this.webAudioRecord.stopMonitoring();
    }
}
