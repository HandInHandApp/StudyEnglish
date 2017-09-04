import { Component} from '@angular/core';

import {
  // ActionSheet,
  ActionSheetController,
  Config,
  NavController
} from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ExerciseTypePage } from '../exercise-type/exercise-type';


@Component({
  selector: 'page-exercise',
  templateUrl: 'index.html'
})
export class ExerciseIndexPage {

  categories: any[] = [{
      name:"practice",
      title:"分类练习",
      desc:"基本专项练习",
      img:"assets/img/exercise/header.jpg"
    },{
      name:"retired",
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
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewDidLoad() {
    
  }

  // currently only support practice
  goToExerciseTypePage(category: any) {
    console.log("click %s", category.name);
    this.navCtrl.push(ExerciseTypePage, { category: category.name });
  }

//   playStepVideo(mp3file){
//     if(mp3file !=""){
//         if(this.audio){
//             this.audio.pause() ;
//         }
//         this.audio = new Audio(mp3file);
//         this.audio.play();
//         this.audio.onended= () => { 
//             console.log(mp3file+" ended !! ");
//         }
//     }
// }
}
