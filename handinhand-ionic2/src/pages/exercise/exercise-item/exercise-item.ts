import { Component } from '@angular/core';

import {
  // ActionSheet,
  // ActionSheetController,
  ModalController,
  // Platform,
  NavParams,
  NavController,
  ToastController
  // ViewController
} from 'ionic-angular';

import { ExerciseAnswerPage } from '../exercise-answer/exercise-answer';

import { ExerciseData } from '../../../providers/exercise/exercise-data';

@Component({
  selector: 'page-exercise-item',
  templateUrl: 'exercise-item.html'
})
export class ExerciseItemPage {
  
  typename: string = null;
  currentIndex: Number = 0;
  exercises: any[] = [];
  answer: any[] = [];

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public exerData: ExerciseData,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    this.typename = this.navParams.data.typename;
    this.currentIndex = 0;
    
    console.log("input typename is " + this.typename);

    this.exerData.getPracticeQuestionByType(this.typename).then(res => {
      this.exercises = res;
      console.log("fetch result size is "+ this.exercises.length);
    });
  }

    // this.exerData.getPracticeQuestionByType(this.typename).then(function(res){
    //   this.exercises = res;
    //   console.log("fetch result size is "+ this.exercises.length);
    // });

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
