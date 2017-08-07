import { Component } from '@angular/core';


import { NavController, AlertController, NavParams } from 'ionic-angular';
import { ReadingReviewPage } from '../reading-review/reading-review'
import { TestListPage } from '../test-list/test-list'
import { TestReportPage } from '../test-report/test-report'


import { ConferenceData } from '../../../providers/conference-data';
import { UserData } from '../../../providers/user-data';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public userData: UserData
  ) {
    this.step = this.navParams.get("curstep")
    this.stepindex = this.navParams.get("stepindex")
    confData.getReadingTestData("tpo34").subscribe(
      resulte => {
        console.log(resulte)
        this.passages = resulte
        this.steps = this.passages["steps"];
        if(this.step == undefined){
          this.userData.setUserReadingAnswer(this.useranswer)
          this.stepindex = 0;
          this.first_step = this.steps[this.stepindex];
          this.step = this.first_step;
          this.currentPassage = this.passages[this.step]
        }else{
          this.userData.getUserReadingAnswer().then((value)=>{
            this.useranswer = value
            this.loadDragChoice()
          })
          let passageStep = this.passages.questions[this.step].passage
          this.currentPassage= this.passages.passage[passageStep]
        }
        this.last_step = this.steps[this.passages["steps"].length - 1];
        this.last_stepindex = this.passages["steps"].length - 1;
        this.get_total_graph(this.steps);
      }
    );
  }

  ngAfterViewInit() {
  };

  private get_total_graph(steps: any[]) {
    for (let step of steps) {
      if (step.indexOf("p") != -1) {
        this.total_passage = this.total_passage + 1
      } else {
        this.total_question = this.total_question + 1
      }
    }
  }

  private loadDragChoice(){
    if(this.passages.questions[this.step]["type"] == "drag-choice" && this.useranswer[this.step] == ""){
      this.useranswer[this.step]=["","",""]
    }
  }

  setPairAnswer(event: any, choice: string){
    if(event.checked==true){
      if(this.useranswer[this.step]==""){
        let pair_choice = [] 
        this.useranswer[this.step]=[choice]
      }else if(this.useranswer[this.step].length>1){
        event.checked=false
      }else{
        this.useranswer[this.step].push(choice)
      }
    }else{
      for(var i=0; i<this.useranswer[this.step].length;i++){
        if(this.useranswer[this.step][i] == choice){
          this.useranswer[this.step].splice(i,1)
        }
      }
    }
  };

  getChoiceCount(choices:any){
    let count = 0;
    for(let choice in choices){
      if(choices[choice] == true){
        count = count + 1; 
      }
    }
    return count;
  }

  showAlert(){
      let prompt = this.alertCtrl.create({
           title: 'Finish Warning',
           message: "You have seen all the questions in this part of the Reading Section <br/><br/>"
               +"You may go back and Review . As long as there is time remaining. You can check your work<br/><br/> "
               +"Click on Return to continue working<br/><br/> "
               +"Click on Continue to got on <br/><br/> "
               +"Once you leave this part of the Reading Section, You WILL NOT be able to Return on it",
           buttons: [
            {
              text: 'RETURN',
              handler: data => {
                console.log('RETURN clicked');
              }
            },
            {
              text: 'CONTINUE',
              handler: data => {
                console.log('CONTINUE clicked');
                this.navCtrl.push(TestReportPage)
              }
            }]
        });
      prompt.present();

  }
  gotoNext() {
    if (this.stepindex != this.last_stepindex) {
      this.stepindex = this.stepindex + 1
      this.step = this.steps[this.stepindex]
    }else if(this.steps[this.last_stepindex] == "q42"){
      this.showAlert()
   }
   if (this.step.indexOf("q") != -1) {
     let passageStep = this.passages.questions[this.step].passage
     this.currentPassage= this.passages.passage[passageStep]
     if(this.passages.questions[this.step].type=="drag-choice"){
       this.loadDragChoice()
     }
   }else if(this.step.indexOf("p") != -1) {
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
      if(this.passages.questions[this.step].type=="drag-choice"){
        this.loadDragChoice()
      }
    } else {
      this.currentPassage = this.passages.passage[this.step]
    }
  }

  gotoHome() {
    this.navCtrl.popTo(this.navCtrl.first())
  }

  gotoReview(){
    this.navCtrl.push(ReadingReviewPage)
    this.userData.setUserReadingAnswer(this.useranswer)
  }

  stopTiming() {
  }

  insertClickContent(event: any) {
    console.log(event)
    let choice = event.target.getAttribute("choice")
    if(choice != this.useranswer[this.step]){
        let tmpquestion = this.passages.questions[this.step]
        let htmlCollections = document.getElementsByClassName("click-choice")
        tmpquestion["choices"][this.useranswer[this.step]]="";
        this.useranswer[this.step] = choice;
        tmpquestion["choices"][this.useranswer[this.step]]=tmpquestion.content;
    }
  }

  dragChoiceStart(event: any) {
    event.dataTransfer.setData("Text", event.target.id);
  }

  drop(event: any) {
    event.preventDefault();
    if (event.target.tagName == "DIV" && event.target.children.length == 0) {
      var data = event.dataTransfer.getData("Text");
      event.target.appendChild(document.getElementById(data));
      let answerChoice = data.split("-")[1]
      let answerIdx = event.target.id.split("-")[1];
      this.useranswer[this.step][answerIdx] = answerChoice; 
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
