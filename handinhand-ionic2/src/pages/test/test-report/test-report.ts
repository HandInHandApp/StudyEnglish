import { Component } from '@angular/core';
import { NavController, AlertController,ViewController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../../providers/conference-data';
import { ReadingTestPage } from '../reading-test/reading-test';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'test-report',
  templateUrl: 'test-report.html'
})
export class TestReportPage{
  passages: any;
  steps: any;
  score: number;
  correct_rate: any;
  useranswer: any={
      "q1":"", "q2":"", "q3":"", "q4":"", "q5":"", "q6":"", "q7":"", "q8":"","q9":"","q10":"","q11":"","q12":"", "q13":"", "q14":"",
      "q15":"", "q16":"", "q17":"", "q18":"", "q19":"", "q20":"","q21":"","q22":"","q23":"","q24":"", "q25":"", "q26":"", "q27":"", "q28":"",
      "q29":"", "q30":"", "q31":"", "q32":"","q33":"","q34":"","q35":"","q36":"","q37":"","q38":"","q39":"","q40":"","q41":"","q42":""
  };
  headername: string;
  tpourl: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public confData: ConferenceData,
    public userData: UserData
  ){
    this.tpourl = this.navParams.get("tpourl")
    this.headername= this.navParams.get("headername")
    confData.getReadingTestData(this.tpourl).subscribe(
      resulte => {
        console.log(resulte)
        this.passages = resulte
        this.steps = this.passages["steps"]
        this.userData.getUserReadingAnswer().then((value)=>{
          this.useranswer=value
          let correct_answer = 0;
          let total_count = 0;
          for(let step in this.useranswer){
            total_count = total_count + 1;
            if(this.passages.questions[step].type == "drag-choice"){
              if(this.useranswer[step] != "" && this.passages.questions[step].answer.join("") == this.useranswer[step].join("")){
                correct_answer = correct_answer + 1;
              }
            }else{
              if(this.passages.questions[step].answer.join("") == this.useranswer[step]){
                correct_answer = correct_answer + 1;
              }
            }
          }
          this.correct_rate = correct_answer+"/"+total_count;
        });
      }
    );
  }

  goBack() {
    this.navCtrl.pop()
  }

  gotoQuestion(stepidx: number, step: string){
    this.navCtrl.push(ReadingTestPage,{
      stepindex: stepidx,
      curstep:step
    })
  }
}