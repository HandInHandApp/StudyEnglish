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
  useranswer: any={
      "q1":"", "q2":"", "q3":"", "q4":"", "q5":"", "q6":"", "q7":"", "q8":"","q9":"","q10":"","q11":"","q12":"", "q13":"", "q14":"",
      "q15":"", "q16":"", "q17":"", "q18":"", "q19":"", "q20":"","q21":"","q22":"","q23":"","q24":"", "q25":"", "q26":"", "q27":"", "q28":"",
      "q29":"", "q30":"", "q31":"", "q32":"","q33":"","q34":"","q35":"","q36":"","q37":"","q38":"","q39":"","q40":"","q41":"","q42":""
  };

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public confData: ConferenceData,
    public userData: UserData
  ){
    confData.getReadingTestData("tpo34").subscribe(
      resulte => {
        console.log(resulte)
        this.passages = resulte
        this.steps = this.passages["steps"]
        this.userData.getUserReadingAnswer().then((value)=>{
          this.useranswer=value
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