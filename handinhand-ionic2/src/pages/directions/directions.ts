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
  curTPO: any;
  session: any;
  directionType: string;  //you can choose reading, writing, speaking, listening
  directionData: any;
  title: string;

  type: any;
  tpourl:any;
  headername:any;

  constructor(
        public navParams: NavParams,
        public navCtrl: NavController,
        public confData: ConferenceData) {
    this.curTPO = navParams.get("curTPO")
    this.session = navParams.data.session;
    this.directionType = "reading"
    this.tpourl = navParams.data.url;
    this.headername = navParams.data.headername;
    this.title = navParams.get("title")

    this.directionData={
      title:'', contents:[]
    }
    confData.getDirectionData(this.directionType).subscribe(
        result=>{
            console.log(result);
            this.directionData = result;
        }
    );
  }

  itemPages = {
      "reading":ReadingTestPage,
      "listening":ListeningTestPage,
      "speaking":SpeakingTestPage,
      "writing":WritingTestPage
    }
      
  continue(){
    this.navCtrl.push(this.itemPages[this.directionType], 
      {
        curTPO:this.curTPO,
        tpourl:this.tpourl,
        headername:this.headername,
        title: this.title
      });
  }

  stopClocking(){  
  }

  gotoHome(){  
    this.navCtrl.pop()
  }
  
}
