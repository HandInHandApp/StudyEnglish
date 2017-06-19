import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-examination-detail',
  templateUrl: 'examination-detail.html'
})
export class ExaminationDetailPage {
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

  constructor(public navParams: NavParams) {
    this.session = navParams.data.session;
    this.type = navParams.data.type;
  }
}
