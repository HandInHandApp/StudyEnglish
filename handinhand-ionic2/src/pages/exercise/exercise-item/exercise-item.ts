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

import { KeysPipe } from '../../../providers/util/keyspipe'
import { ExerciseData } from '../../../providers/exercise/exercise-data';

@Component({
  selector: 'page-exercise-item',
  templateUrl: 'exercise-item.html'
})
export class ExerciseItemPage {
  
  typename: string = null;
  currentIndex: number = 0;
  max_count: number = 0;
  exercises: any[] = [];
  answers: any[] = null;

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
      for (let ele of res) {
        this.exercises.push({
          'text': ele.get('anchor').text,
          'title': ele.get('title'),
          'choice': ele.get('choice')
        })
      }
      this.answers = Array(this.exercises).fill(null);
      this.max_count = this.exercises.length;
      console.log("fetch result size is "+ this.exercises.length);
    });
  }

    // this.exerData.getPracticeQuestionByType(this.typename).then(function(res){
    //   this.exercises = res;
    //   console.log("fetch result size is "+ this.exercises.length);
    // });

  openAnswerSheet() {
    console.log("open answer sheet");
    let modal = this.modalCtrl.create(ExerciseAnswerPage, this.answers);
    modal.present();
  }

  goPrevious() {
    console.log("go previous");
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = 0;
    }

  }

  goNext() {
    console.log("go next");
    this.currentIndex++;
    if (this.currentIndex >= this.max_count) {
      this.currentIndex = this.max_count - 1;
    }
  }

}
