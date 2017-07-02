import { Component, ViewChild, ElementRef } from '@angular/core';

import {
  ActionSheet,
  ActionSheetController,
  ModalController,
  Platform,
  NavParams,
  NavController,
  ViewController
} from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ExerciseTypePage } from '../exercise-type/exercise-type';
import { ExerciseAnswerPage } from '../exercise-answer/exercise-answer';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-exercise-item',
  templateUrl: 'exercise-item.html'
})
export class ExerciseItemPage {
  
  catetorytype: any = null;
  currentIndex: Number = 0;
  exercises: any[] = [];
  answer: any[] = [];

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public confData: ConferenceData
  ) {}

  ionViewDidLoad() {

    this.catetorytype = this.navParams.data.catetorytype;
    
    console.log("input categorytype is " + this.catetorytype);

    // QUERY 10 questions
    this.confData.getExercises().subscribe((exercisesData: any[]) => {
      this.exercises = exercisesData;
      console.log("exercises size: "+this.exercises.length);
    });

  }

  openAnswerSheet() {
    console.log("open answer sheet");
    let modal = this.modalCtrl.create(ExerciseAnswerPage, this.answer);
    modal.present();
  }

  goPrevious() {
    console.log("go previous");
  }

  goNext() {
    console.log("go next");
  }

}
