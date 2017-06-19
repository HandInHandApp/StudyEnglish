import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-training-detail',
  templateUrl: 'training-detail.html'
})
export class TrainingDetailPage {
  session: any;
  type: any;
  conferenceDate = '2047-05-17';
  totalscroe;
  readingscroe;
  writingscroe;
  speakingscroe;
  examinationPlanDate;
examinationPlanScroe;
examinationPlanScroeReason;

    brightness: number = 20;
  contrast: number = 0;
  warmth: number = 1300;
  structure: any = { lower: 33, upper: 60 };
  text: number = 0;


  sessions=[{
    id:1,
    sentence:"This came about from two developments.",
    questions:[{
      index:1,
      options:[{
        name:"A",
        content:"简单句"
      },{
        name:"B",
        content:"复杂句"
      },{
        name:"C",
        content:"简单句"
      },]
    }]
  }]

  constructor(public navParams: NavParams) {
    this.session = navParams.data.session;
    this.type = navParams.data.type;
  }
}
