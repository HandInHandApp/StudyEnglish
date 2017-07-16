import { Component } from '@angular/core';


import { NavParams } from 'ionic-angular';


import { ConferenceData } from '../../../providers/conference-data';

@Component({
  selector: 'page-reading-page',
  templateUrl: 'reading-test.html'
})
export class ReadingTestPage {
  passages: any;
  first_step: any;
  last_step: any;
  stepindex: number = 0;
  step: any;
  steps: any[] = [];
  last_stepindex: number = 0;
  total_question: number = 0;
  total_passage: number = 0;
  datas: any;
  currentPassage: any;
  dragAnswer: string="";

  constructor(public navParams: NavParams, public confData: ConferenceData) {
    confData.getReadingTestData("tpo34").subscribe(
      resulte => 
            {
                console.log(resulte)
                this.passages = resulte
                this.steps = this.passages["steps"];
                this.first_step =  this.steps[this.stepindex];
                this.step = this.first_step;
                this.last_step =  this.steps[this.passages["steps"].length-1];
                this.last_stepindex = this.passages["steps"].length-1;
                this.get_total_graph(this.steps);
                this.currentPassage = this.passages[this.step]
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
      }
      if(this.step.indexOf("q")!=-1){
        let passageStep = this.passages.questions[this.step].passage
        this.currentPassage = this.passages.passage[passageStep]
      }else{
        this.currentPassage = this.passages[this.step]
      }

  }
  gotoBack(){
      if( this.stepindex != 0){
        this.stepindex = this.stepindex-1
        this.step =  this.steps[this.stepindex]
      } 
      if(this.step.indexOf("q")!=-1){
        let passageStep = this.passages.questions[this.step].passage
        this.currentPassage = this.passages.passage[passageStep]
      }else{
        this.currentPassage = this.passages.passage[this.step]
      }
  }
  gotoHome(){
      
  }

  stopTiming(){
    
  }
  insertDragContent(event: any){
    console.log(event)
    let htmlCollections = document.getElementsByClassName("click-choice")
    for(let i=0; i<htmlCollections.length;i++){
      htmlCollections[i].children[0].innerHTML="";
    }
    event.target.children[0].innerHTML=this.passages.questions[this.step].dragContent;
  }
}
