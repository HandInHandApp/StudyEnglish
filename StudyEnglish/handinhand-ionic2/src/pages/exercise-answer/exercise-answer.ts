import { Component, ViewChild, ElementRef } from '@angular/core';

import {
  ModalController,
  Platform,
  NavParams,
  ViewController
} from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-exercise-answer',
  templateUrl: 'exercise-answer.html'
})
export class ExerciseAnswerPage {

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {}


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
