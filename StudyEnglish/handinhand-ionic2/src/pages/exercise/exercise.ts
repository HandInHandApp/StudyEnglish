import { Component, ViewChild, ElementRef } from '@angular/core';

import {
  ActionSheet,
  ActionSheetController,
  Config,
  NavController
} from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ExerciseTypePage } from '../exercise-type/exercise-type';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html'
})
export class ExercisePage {

  categories: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewDidLoad() {
    this.confData.getCategories().subscribe((categoriesData: any[]) => {
      this.categories = categoriesData;
    });
  }

  goToExerciseTypePage(category: any) {
    this.navCtrl.push(ExerciseTypePage, { categoryId: category.id });
  }
}
