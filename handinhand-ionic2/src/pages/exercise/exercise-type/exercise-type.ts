import { Component } from '@angular/core';

import {
  // ActionSheet,
  ActionSheetController,
  NavParams,
  NavController
} from 'ionic-angular';


// import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ExerciseItemPage } from '../exercise-item/exercise-item';

import { ConferenceData } from '../../../providers/conference-data';


@Component({
  selector: 'page-exercise-type',
  templateUrl: 'exercise-type.html'
})
export class ExerciseTypePage {

  categoryid: any = null;
  categorytypes: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public confData: ConferenceData
  ) {}


  ionViewDidLoad() {

    this.categoryid = this.navParams.data.categoryId;

    this.confData.getCategorytypes().subscribe((categorytypesData: any[]) => {
      for (let ctype of categorytypesData) {
        if (ctype.categoryid === this.categoryid) {
          this.categorytypes.push(ctype);
        }
      }
      console.log("categorytypes for "+this.categoryid+" are "+ this.categorytypes);
    });

  }


  goToExerciseQuestionPage(catgorytype: any) {
    console.log(catgorytype);
    this.navCtrl.push(ExerciseItemPage, { categorytype: catgorytype });
  }

}
