import { Component } from '@angular/core';


import { NavParams } from 'ionic-angular';

import { ConferenceData } from '../../../providers/conference-data';

@Component({
  selector: 'page-reading-page',
  templateUrl: 'reading-test.html'
})
export class ReadingTestPage {
  useranswer: any={
    "q1":"", "q2":"", "q3":"", "q4":"", "q5":"", "q6":"", "q7":"", "q8":"","q9":"","q10":"","q11":"","q12":"", "q13":"", "q14":"",
    "q15":"", "q16":"", "q17":"", "q18":"", "q19":"", "q20":"","q21":"","q22":"","q23":"","q24":"", "q25":"", "q26":"", "q27":"", "q28":"",
    "q29":"", "q30":"", "q31":"", "q32":"","q33":"","q34":"","q35":"","q36":"","q37":"","q38":"","q39":"","q40":"","q41":"","q42":""
  };
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
  dragAnswer: string = "";

  constructor(public navParams: NavParams, public confData: ConferenceData) {
    confData.getReadingTestData("tpo34").subscribe(
      resulte => {
        console.log(resulte)
        this.passages = resulte
        this.steps = this.passages["steps"];
        this.first_step = this.steps[this.stepindex];
        this.step = this.first_step;
        this.last_step = this.steps[this.passages["steps"].length - 1];
        this.last_stepindex = this.passages["steps"].length - 1;
        this.get_total_graph(this.steps);
        this.currentPassage = this.passages[this.step]
      }
    );
  }

  private get_total_graph(steps: any[]) {
    for (let step of steps) {
      if (step.indexOf("p") != -1) {
        this.total_passage = this.total_passage + 1
      } else {
        this.total_question = this.total_question + 1
      }
    }
  }

  setPairAnswer(event: any, choice: string){
    if(event.checked==true){
      if(this.useranswer[this.step]==""){
        this.useranswer[this.step]=[choice]
      }else if(this.useranswer[this.step].length>1){
        event.checked=false 
      }else{
        this.useranswer[this.step].push(choice)
      }
    }else{
      if(this.contains(this.useranswer[this.step], choice)){
        for(let i=0;i<this.useranswer[this.step].length;i++){
          if(this.useranswer[this.step][i]==choice){
            this.useranswer[this.step].splice(i,1)
          }
        }
      }
    }
  };

  contains(arr: string[], str: string){
    for(let i = 0; i < arr.length; i++){
      if(str == arr[i]){
        return true;
      }
    }
    return false;
  }

  gotoNext() {
    if (this.stepindex != this.last_stepindex) {
      this.stepindex = this.stepindex + 1
      this.step = this.steps[this.stepindex]
    }
    if (this.step.indexOf("q") != -1) {
      let passageStep = this.passages.questions[this.step].passage
      this.currentPassage = this.passages.passage[passageStep]
    } else {
      this.currentPassage = this.passages[this.step]
    }

  }
  gotoBack() {
    if (this.stepindex != 0) {
      this.stepindex = this.stepindex - 1
      this.step = this.steps[this.stepindex]
    }
    if (this.step.indexOf("q") != -1) {
      let passageStep = this.passages.questions[this.step].passage
      this.currentPassage = this.passages.passage[passageStep]
    } else {
      this.currentPassage = this.passages.passage[this.step]
    }
  }
  gotoHome() {

  }

  stopTiming() {

  }

  insertClickContent(event: any) {
    console.log(event)
    let htmlCollections = document.getElementsByClassName("click-choice")
    for (let i = 0; i < htmlCollections.length; i++) {
      htmlCollections[i].children[0].innerHTML = "";
    }
    event.target.children[0].innerHTML = this.passages.questions[this.step].content;
  }

  dragChoiceStart(event: any) {
    event.dataTransfer.setData("Text", event.target.id);
  }

  drop(event: any) {
    event.preventDefault();
    if (event.target.tagName == "DIV" && event.target.children.length == 0) {
      console.log(event)
      var data = event.dataTransfer.getData("Text");
      event.target.appendChild(document.getElementById(data));
    }
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  rollbackDrag(event: any) {
    if (event.target.tagName == "P") {
      let targetEle = document.getElementById("div-"+event.target.id);
      if(targetEle != null){
        targetEle.appendChild(event.target)
      }
    }
  }

  counttime =  60*60*1000 ;
  timerEnd(timertitle) { 
    console.log(timertitle + ' timer End'); 
  }

}
