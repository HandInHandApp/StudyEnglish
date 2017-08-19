import { Component } from '@angular/core';

import { NavController, AlertController, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../../providers/conference-data';
import { UserData } from '../../../providers/user-data';

import { TestReportPage } from '../test-report/test-report'

@Component({
  selector: 'page-listening-page',
  templateUrl: 'listening-test.html'
})

export class ListeningTestPage {
  // endDate = 601 * 1000;
  // toplist: any[] = []
  session: any;
  type: any;
  tpourl: any;
  headername: any;

  passages: any;
  first_step: any;
  last_step: any;
  stepindex = 0;
  step = "";
  steps: any[];
  last_stepindex: any;
  total_question: number = 0;
  total_passage: number = 0;
  timer_stop = false;
  counttime = 600 * 1000;
  timer_hidden = false;

  useranswer = {
    "q1": "",
    "q2": "",
    "q3": "",
    "q4": "",
    "q5": "",
    "q6": "",
    "q7": "",
    "q8": "",
    "q9": "",
    "q10": "",
    "q11": "",
    "q12": "",
    "q13": "",
    "q14": "",
    "q15": "",
    "q16": "",
    "q17": "",
    "q18": "",
    "q19": "",
    "q20": "",
    "q21": "",
    "q22": "",
    "q23": "",
    "q24": "",
    "q25": "",
    "q26": "",
    "q27": "",
    "q28": "",
    "q29": "",
    "q30": "",
    "q31": "",
    "q32": "",
    "q33": "",
    "q34": "",
    "q35": "",
    "q36": "",
    "q37": ""
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public userData: UserData
  ) {
    this.session = navParams.data.session;
    this.type = navParams.data.type;
    this.tpourl = navParams.data.url;
    this.headername = navParams.data.headername;
    confData.getListeningTestData(this.tpourl)
      .subscribe(
      resulte => {
        // this.userData.setUserListeningAnswer(this.useranswer);
        this.passages = resulte;
        this.steps = this.passages["steps"];
        this.first_step = this.steps[this.stepindex];
        this.step = this.first_step;
        this.last_step = this.steps[this.passages["steps"].length - 1];
        this.last_stepindex = this.passages["steps"].length - 1;
        this.get_total_graph(this.steps);
        console.log(resulte)
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
      // this.endDate = 601 * 1000
    } else {
      this.showAlert();
    }
    console.log(this.step)
  }

  gotoBack() {
    if (this.stepindex != 0) {
      this.stepindex = this.stepindex - 1
      this.step = this.steps[this.stepindex]
    }
    console.log(this.step)
  }

  gotoHome() {
    this.navCtrl.popTo(this.navCtrl.first())
  }

  pauseToBreak() {
    this.timer_stop = true;
    let prompt = this.alertCtrl.create({
      title: '休息，休息一会~计时已停止',
      message: "",
      buttons: [
        {
          text: '继续答题',
          handler: data => {
            console.log('RETURN clicked');
            this.timer_stop = false;
          }
        }]
    });
    prompt.present();
  }

  // stopTiming() {
  //   if (this.timer_stop == false) {
  //     this.timer_stop = true;
  //   } else {
  //     this.timer_stop = false;
  //   }
  // }

  toggleTimerHidden() {
    if (this.timer_hidden) {
      this.timer_hidden = false;
    } else if (!this.timer_hidden) {
      this.timer_hidden = true;
    }
  }

  timerEnd(event: any) {

  }

  showAlert() {
    this.userData.setUserListeningAnswer(this.useranswer);//存储到内部存储中
    let prompt = this.alertCtrl.create({
      title: 'Finish Warning',
      message: "You have seen all the questions in this part of the Listening Section <br/><br/>"
      + "You may go back and Review . As long as there is time remaining. You can check your work<br/><br/> "
      + "Click on Return to continue working<br/><br/> "
      + "Click on Continue to got on <br/><br/> "
      + "Once you leave this part of the Listening Section, You WILL NOT be able to Return on it",
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
            // this.navCtrl.push(TestReportPage, {
            //   tpourl: this.tpourl,
            //   headername: this.headername,
            // })
          }
        }]
    });
    prompt.present();
  }

}