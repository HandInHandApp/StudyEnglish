import { Component } from '@angular/core';


import { NavParams,NavController } from 'ionic-angular';


import { ConferenceData } from '../../../providers/conference-data';

@Component({
  selector: 'page-reading-page',
  templateUrl: 'reading-test.html'
})
export class ReadingTestPage {
  passages: any;
  first_step: any;
  last_step: any;
  stepindex=0;
  step: any;
  steps: any[];
  last_stepindex: any;
  total_question: number = 0;
  total_passage: number = 0;
  datas: any;

  constructor(public navParams: NavParams, public confData: ConferenceData) {
    this.passages = confData.getReadingTestData();
    this.steps = this.passages["steps"];
    this.first_step =  this.steps[this.stepindex];
    this.step = this.first_step;
    this.last_step =  this.steps[this.passages["steps"].length-1];
    this.last_stepindex = this.passages["steps"].length-1;
    this.get_total_graph(this.steps);

    //get data from leanclould
    this.datas = confData.getReadingPaper().subscribe(
      resulte => 
            {
                console.log(resulte)
            });
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
  }
  gotoBack(){
      if( this.stepindex != 0){
        this.stepindex = this.stepindex-1
        this.step =  this.steps[this.stepindex]
      } 
  }
  gotoHome(){
      
  }
  
}
