import { Component } from '@angular/core';
import {NavController, AlertController, NavParams } from 'ionic-angular';
import { TestReportPage } from '../test-report/test-report'
import { ConferenceData } from '../../../providers/conference-data';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'page-writing-page',
  templateUrl: 'writing-test.html'
})
export class WritingTestPage {
  paperType: string = "writing";
  curTPO: any;
  title: string;
  grid_three_input: any;
  grid_two_input: any;
  grid_three_input_number: any;
  grid_two_input_number: any;
  useranswer: any={ "p_section1_1":"", "p_section2_1":"" };
  session: any;
  type: any;
  tpourl:any;
  headername:any;
  step: string;
  first_step: any;
  passages: any;
  last_step: any;
  stepindex: number = 0;
  steps: any[] = [];
  last_stepindex: number = 0;
  total_question: number = 0;
  total_passage: number = 0;
  datas: any;
  currentPassage: any;
  dragAnswer: string = "";
  timer_stop=false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public userData: UserData
  ) {
        this.curTPO = navParams.get("curTPO")
        this.session = navParams.data.session;
        this.type = navParams.data.type;
        this.tpourl = navParams.data.url;
        this.headername = navParams.data.headername;
        this.step = this.navParams.get("curstep")
        this.title = this.navParams.get("title")
        confData.getTestData(this.tpourl).subscribe(
          resulte => {
            console.log(resulte)
            this.passages = resulte
            this.steps = this.passages["steps"];
            if(this.step == undefined){
               this.stepindex  = 0
               this.first_step = this.steps[this.stepindex];
               this.step = this.first_step;
               this.last_step = this.steps[this.last_stepindex];
            }else{
              this.userData.getUserWritingAnswer().then((value)=>{
                this.useranswer = value
              })
              this.stepindex = this.passages["steps"].indexOf(this.step)
            }
            this.last_stepindex = this.passages["steps"].length - 1;
          }
        );
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
                this.navCtrl.push(TestReportPage,{
                    curTPO: this.curTPO,
                    tpourl:this.tpourl,
                    headername:this.headername,
                    title: this.title,
                    paperType: this.paperType
                })
              }
            }]
        });
      prompt.present();
  }

  gotoNext() {
    this.userData.setUserWritingAnswer(this.useranswer)
    if (this.stepindex != this.last_stepindex) {
       this.stepindex = this.stepindex + 1
       this.step = this.steps[this.stepindex]
    }else {
       this.showAlert()
    }
  }
  gotoHome() {
    this.navCtrl.pop()
  }
  stopTiming() {
      if(this.timer_stop == false){
          this.timer_stop=true;
      }else{
          this.timer_stop = false;
      }
  }
  timerEnd(timertitle) { 
    console.log(timertitle + ' timer End'); 
  }
  countInputNumber(textinput){
    if(textinput && textinput.length > 0){
      var x=textinput.split(" ")
      if(x[x.length -1] == "")
        return x.length -1
      else
        return x.length
    }else{
      return 0
    }
  }

}
