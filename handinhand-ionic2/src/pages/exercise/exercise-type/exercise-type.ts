import { Component } from '@angular/core';

import {
  // ActionSheet,
  ActionSheetController,
  NavParams,
  NavController
} from 'ionic-angular';


import { ExerciseItemPage } from '../exercise-item/exercise-item';

import { ExerciseData } from '../../../providers/exercise/exercise-data';


@Component({
  selector: 'page-exercise-type',
  templateUrl: 'exercise-type.html'
})
export class ExerciseTypePage {

  category: any = null;
  types: any[] = [];
  errTip: string = null;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public exerData: ExerciseData
  ) {}


  ionViewDidLoad() {
    this.category = this.navParams.data.category;

    if (this.category == 'practise') {
      this.exerData.getPractice().subscribe(res => {
        this.types = res;
      });
      console.log("type data loaded: " + this.types);
    } else {
      this.errTip = "No type configured for " + this.category;
    }

  }


  goToExerciseQuestionPage(type: any) {
    console.log("click object: %o", type);
    this.navCtrl.push(ExerciseItemPage, { typeid: type.id });
  }

}
