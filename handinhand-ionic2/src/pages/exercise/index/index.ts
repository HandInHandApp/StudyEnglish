import { Component} from '@angular/core';

import {
  // ActionSheet,
  ActionSheetController,
  Config,
  NavController
} from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ExerciseTypePage } from '../exercise-type/exercise-type';

import { ConferenceData } from '../../../providers/conference-data';


@Component({
  selector: 'page-exercise',
  templateUrl: 'index.html'
})
export class ExerciseIndexPage {

  categories: any[] = [{
      name:"practise",
      title:"分类练习",
      desc:"基本专项练习",
      img:"assets/img/exercise/header.jpg"
    },{
      name:"drill",
      title:"真题练习",
      desc:"严选Toelf真题",
      img:"assets/img/exercise/header.jpg"
    },{
      name:"special",
      title:"专项练习",
      desc:"特殊类型题目练习",
      img:"assets/img/exercise/header.jpg"
    }];


  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewDidLoad() {
    
  }

  goToExerciseTypePage(category: any) {
    console.log("click %s", category.name);
    this.navCtrl.push(ExerciseTypePage, { category: category.name });
  }
}
