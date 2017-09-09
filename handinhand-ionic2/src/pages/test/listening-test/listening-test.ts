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
  timer_stop = true;
  counttime = 600 * 1000;
  timer_hidden = false;

  isBackable = false;

  paperType: string = "listening";
  title: String;
  curTPO: any;

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
    "q34": ""
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
    this.title = navParams.data.title;
    this.curTPO = navParams.data.curTPO;

    confData.getListeningTestData(this.tpourl)
      .subscribe(
      resulte => {
        // this.userData.setUserListeningAnswer(this.useranswer);
        this.passages = resulte;
        this.steps = this.passages["steps"];
        this.first_step = this.steps[this.stepindex];
        if (this.navParams.get("curstep") == undefined) {
          this.step = this.first_step;
        } else {//如果是跳转过来的
          this.userData.getUserListeningAnswer().then((value) => {
            this.useranswer = value;
          });
          this.stepindex = this.steps.indexOf(this.navParams.get("curstep"));
          this.step = this.navParams.get("curstep");
        }
        this.last_step = this.steps[this.passages["steps"].length - 1];

        this.last_stepindex = this.passages["steps"].length - 1;
        // this.lastLecture_stepindex = this.passages["steps"].
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

  /**
   * 下一步
   */
  gotoNext() {
    if (this.stepindex != this.last_stepindex) {
      this.stepindex = this.stepindex + 1;
      this.step = this.steps[this.stepindex];
    } else {
      this.showAlert();
    }
    let preStep = this.steps[this.stepindex - 1];
    if (this.step == "q1" || preStep == "d2") {
      this.isBackable = true;
    } else {
      this.isBackable = false;
    }
  }

  /**
   *  下一篇
   */
  gotoNextLecture() {
    let nextStep = this.steps[this.stepindex++];
    while (nextStep.indexOf("C") != 0 && nextStep.indexOf("p") != 0) {
      nextStep = this.steps[this.stepindex++];
      if (this.stepindex + 1 > this.last_stepindex) {
        break;
      }
    }
    if (this.stepindex == this.last_stepindex) {
      this.showAlert();
    } else {
      this.step = nextStep;
    }

    let preStep = this.steps[this.stepindex - 1];
    if (this.step == "q1" || preStep == "d2") {
      this.isBackable = true;
    } else {
      this.isBackable = false;
    }
  }

  /**
   * 上一步
   */
  gotoBack() {
    if (this.stepindex != 0) {

      //如果上一步不是问题则继续回溯
      this.stepindex--;
      while (this.steps[this.stepindex].indexOf("q") != 0) {
        this.stepindex--;
      }
      this.step = this.steps[this.stepindex];

      let preStep = this.steps[this.stepindex - 1];
      if (this.step == "q1" || preStep == "d2") {
        this.isBackable = true;
      }
    }
  }

  /**
   * 首页
   */
  gotoHome() {
    this.navCtrl.popTo(this.navCtrl.first())
  }

  /**
   * 暂停休息
   */
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

  /**
   * 显示或隐藏时间
   */
  toggleTimerHidden() {
    if (this.timer_hidden) {
      this.timer_hidden = false;
    } else if (!this.timer_hidden) {
      this.timer_hidden = true;
    }
  }

  /**
   * 倒计时结束
   * @param event 
   */
  timerEnd(event: any) {

  }

  /**
   * 音频播放事件
   */
  audioPlayed() {
    this.timer_stop = true;
  }

  /**
   * 音频播放结束事件
   */
  audioEnded() {
    this.timer_stop = false;
  }


  setPairAnswer(event: any, choice: string) {
    let tempchoice: string;
    tempchoice = this.useranswer[this.step]
    if (event.checked == true) {
      if (tempchoice == "") {
        tempchoice = choice
      } else if (tempchoice.length > 1) {
        event.checked = false
      } else {
        tempchoice = tempchoice + choice
      }
    } else {
      tempchoice = tempchoice.replace(choice, "")
    }
    console.log(tempchoice);
    this.useranswer[this.step] = tempchoice.split("").sort(
      function compareFunction(param1, param2) {
        return param1.localeCompare(param2);
      }
    ).join("")
  };

  /**
   * 答题结束显示弹出框
   */
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
            console.log(this.tpourl);
            console.log(this.headername);
            console.log(this.title);
            console.log(this.paperType);
            console.log(this.curTPO);
            this.navCtrl.push(TestReportPage, {
              tpourl: this.tpourl,
              headername: this.headername,
              title: this.title,
              paperType: this.paperType,
              curTPO: this.curTPO
            })
          }
        }]
    });
    prompt.present();
  }

}