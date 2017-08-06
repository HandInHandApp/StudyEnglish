import { Component } from '@angular/core';

import {
  // ActionSheet,
  ActionSheetController,
  NavParams,
  NavController,
  ToastController
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
    public exerData: ExerciseData,
    public toastCtrl: ToastController
  ) {}


  ionViewDidLoad() {
    this.category = this.navParams.data.category;

    if (this.category == 'practice') {
      this.exerData.getPracticeTypes().subscribe(res => {
        this.types = res;
      });
      console.log("type data loaded: " + this.types);
    } else {
      this.errTip = "No type configured for " + this.category;
      this.presentToast(this.errTip);
    }

  }

  goToExerciseItemsPage(type: any) {
    console.log("click name: %s", type.name);
    this.navCtrl.push(ExerciseItemPage, { typename: type.name });
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
