import { Component } from '@angular/core';


// import { NavParams } from 'ionic-angular';

import { NavController, AlertController, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../../providers/conference-data';
// import { TimerPage   } from '../timer/timer'

@Component({
  selector: 'page-listening-page',
  templateUrl: 'listening-test.html'
})
export class ListeningTestPage {

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
  timer_stop=false;
  counttime =  10*1000 ;
  audio: any;

  constructor(public navParams: NavParams, 
    public confData: ConferenceData,
    public navCtrl: NavController
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

  stopTiming() {
      if(this.timer_stop == false){
            this.timer_stop=true;
      }else{
          this.timer_stop = false;
      }
      
  }
  timerEnd(timertitle) { 
      console.log(timertitle + ' timer End'); 
      // this.gotoNext()
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

}
