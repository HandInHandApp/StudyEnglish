import { Component } from '@angular/core';
import { NavController, AlertController,ViewController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../../providers/conference-data';
import { ReadingTestPage } from '../reading-test/reading-test';
import { UserData } from '../../../providers/user-data';


@Component({
  selector: 'page-reading-review',
  templateUrl: 'reading-review.html'
})
export class ReadingReviewPage{
  passages: any;
  steps: any;
  useranswer: any={
      "q1":"", "q2":"", "q3":"", "q4":"", "q5":"", "q6":"", "q7":"", "q8":"","q9":"","q10":"","q11":"","q12":"", "q13":"", "q14":"",
      "q15":"", "q16":"", "q17":"", "q18":"", "q19":"", "q20":"","q21":"","q22":"","q23":"","q24":"", "q25":"", "q26":"", "q27":"", "q28":"",
      "q29":"", "q30":"", "q31":"", "q32":"","q33":"","q34":"","q35":"","q36":"","q37":"","q38":"","q39":"","q40":"","q41":"","q42":""
  };
  headername: string;
  tpourl: string;
  title: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public confData: ConferenceData,
    public userData: UserData
  ){
    this.tpourl = this.navParams.get("tpourl")
    this.headername= this.navParams.get("headername")
    this.title = this.navParams.get("title")
    confData.getReadingTestData(this.tpourl).subscribe(
      resulte => {
        console.log(resulte)
        this.userData.getUserReadingAnswer().then((value)=>{
          this.useranswer=value
        });
        this.passages = resulte
        this.steps = this.passages["steps"]
      }
    );
  }

  goBack() {
    this.navCtrl.pop()
  }

  gotoQuestion(step: string){
    this.navCtrl.push(ReadingTestPage,{
      curstep:step,
      tpourl:this.tpourl,
      headername:this.headername,
      title: this.title
    })
  }
}