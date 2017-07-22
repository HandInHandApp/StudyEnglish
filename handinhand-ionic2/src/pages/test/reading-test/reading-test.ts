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
 endDate =  60*60*1000;
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

}
