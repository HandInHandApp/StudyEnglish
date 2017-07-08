import { Component } from '@angular/core';


import { NavParams,NavController } from 'ionic-angular';


import { ConferenceData } from '../../../providers/conference-data';

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

toplist: any[] = [
  
]
session: any;
  type: any;
  passages: any;
  first_step: any;
  last_step: any;
  stepindex=0;
  step: any;
  steps: any[];
  last_stepindex: any;
  total_question: number = 0;
  total_passage: number = 0;


  constructor(public navParams: NavParams, public confData: ConferenceData) {
    this.session = navParams.data.session;
    this.type = navParams.data.type;
    this.passages = confData.getListeningTestData();
    this.steps = this.passages["steps"];
    this.first_step =  this.steps[this.stepindex];
    this.step = this.first_step;
    this.last_step =  this.steps[this.passages["steps"].length-1];
    this.last_stepindex = this.passages["steps"].length-1;
    this.get_total_graph(this.steps);
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
}
