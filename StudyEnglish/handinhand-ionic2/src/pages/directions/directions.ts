import { Component } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';

import { ListeningTestPage } from '../test/listening-test/listening-test'
import { WritingTestPage } from   '../test/writing-test/writing-test'
import { SpeakingTestPage } from  '../test/speaking-test/speaking-test'
import { ReadingTestPage } from   '../test/reading-test/reading-test'

@Component({
  templateUrl: 'directions.html'
})
export class DirectionPage {
  session: any;
  directionType: string;  //you can choose reading, writing, speaking, listening
  directionData: any;

  constructor(
        public navParams: NavParams,
        public navCtrl: NavController,
        public confData: ConferenceData) {
    this.session = navParams.data.session;
    this.directionType = "reading"
    this.directionData = confData.getDirectionData(this.directionType);
  }

  itemPages = {
      "reading":ReadingTestPage,
      "listening":ListeningTestPage,
      "speaking":SpeakingTestPage,
      "writing":WritingTestPage
    }
      
  continue(){
    this.navCtrl.push(this.itemPages[this.directionType], {});
  }

  stopClocking(){  
  }

  gotoHome(){  
  }
  
}
