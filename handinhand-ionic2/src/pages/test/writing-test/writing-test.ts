import { Component } from '@angular/core';

import {NavController, AlertController, NavParams } from 'ionic-angular';


import { ConferenceData } from '../../../providers/conference-data';

@Component({
  selector: 'page-writing-page',
  templateUrl: 'writing-test.html'
})
export class WritingTestPage {

  grid_three_input: any;
  grid_two_input: any;

  grid_three_input_number: any;
  grid_two_input_number: any;

    session: any;
  type: any;
  tpourl:any;
  headername:any;
  
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
    public confData: ConferenceData
  ) {
        this.session = navParams.data.session;
        this.type = navParams.data.type;
        this.tpourl = navParams.data.url;
        this.headername = navParams.data.headername;


    confData.getTestData(this.tpourl).subscribe(
      resulte => {
        console.log(resulte)
        this.passages = resulte
        this.steps = this.passages["steps"];
        this.first_step = this.steps[this.stepindex];
        this.step = this.first_step;
        this.last_step = this.steps[this.passages["steps"].length - 1];
        this.last_stepindex = this.passages["steps"].length - 1;
        this.currentPassage = this.passages[this.step]
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
              }
            }]
        });
      prompt.present();

  }
  gotoNext() {
    if (this.stepindex != this.last_stepindex) {
      this.stepindex = this.stepindex + 1
      this.step = this.steps[this.stepindex]
    }else if(this.last_stepindex == this.steps.length -1){
      this.showAlert()
   }

  }
  gotoBack() {
    if (this.stepindex != 0) {
      this.stepindex = this.stepindex - 1
      this.step = this.steps[this.stepindex]
    }

  }
  gotoHome() {
    this.navCtrl.pop()
  }
  stopTiming() {
  }


  counttime =  60*60*1000 ;
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
