import { Component } from '@angular/core';
import { NavController, AlertController,ViewController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../../providers/conference-data';
import { ReadingTestPage } from '../reading-test/reading-test';


@Component({
  selector: 'page-reading-review',
  templateUrl: 'reading-review.html'
})
export class ReadingReviewPage{
  passages: any;
  steps: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public confData: ConferenceData
  ){
    confData.getReadingTestData("tpo34").subscribe(
      resulte => {
        console.log(resulte)
        this.passages = resulte
        this.steps = this.passages["steps"]
      }
    );
  }

  goBack() {
    this.navCtrl.pop()
  }

  gotoQuestion(stepidx: number, step: string){
    this.navCtrl.push(ReadingTestPage,{
      stepindex: stepidx,
      curstep:step
    })
  }
}