import { Component } from '@angular/core';


import { NavParams,NavController } from 'ionic-angular';


import { ConferenceData } from '../../../providers/conference-data';
import { TimerPage   } from '../timer/timer'

@Component({
  selector: 'page-listening-page',
  templateUrl: 'listening-test.html'
})
export class ListeningTestPage {
  // session: any;
  // type: any;
  // step=0;

  testNmae : any[] = [
   
  ]
  // curDate = new Date();

  // endDate : number ;
  endDate =  601*1000 ;
  // (new Date( (new Date()).getTime()  +  600*1000 ))

  // endDate= 600 + new Date();


toplist: any[] = [
  
]
session: any;
  type: any;
  passages: any;
  first_step: any;
  last_step: any;
  stepindex=0;
  step="";
  steps: any[];
  last_stepindex: any;
  total_question: number = 0;
  total_passage: number = 0;


  constructor(public navParams: NavParams, public confData: ConferenceData) {
    this.session = navParams.data.session;
    this.type = navParams.data.type;
    confData.getListeningTestData()
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
  }, 1000);
 }

 // 销毁组件时清除定时器
 ngOnDestroy() {
  if (this.timer) {
   clearInterval(this.timer);
  }
 }

}
