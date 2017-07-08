import { Component } from '@angular/core';

import { NavParams,NavController } from 'ionic-angular';

import { ListeningTestPage } from '../listening-test/listening-test'
import { WritingTestPage } from   '../writing-test/writing-test'
import { SpeakingTestPage } from  '../speaking-test/speaking-test'
import { ReadingTestPage } from   '../reading-test/reading-test'

import { ConferenceData } from '../../../providers/conference-data';

@Component({
  selector: 'page-top-list',
  templateUrl: 'top-list.html'
})
export class TopListPage {
  session: any;
  type: any;

  testNmae : any[] = [
      "阅读",
      "听力",
      "口语",
      
      "写作"
  ]

toplist: any[] = [
    {
        title:"TPO1",
        item: this.testNmae
    },
    {
        title:"TPO2",
        item: this.testNmae
    },
    {
        title:"TPO3",
        item: this.testNmae
    },
    {
        title:"TPO4",
        item: this.testNmae
    },
    {
        title:"TPO5",
        item: this.testNmae
    },
    {
        title:"TPO=6",
        item: this.testNmae
    },
]
  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              public confData: ConferenceData
    ) {
    this.session = navParams.data.session;
    this.type = navParams.data.type;
  }

  itemPages= [
      ReadingTestPage,
      ListeningTestPage,
      SpeakingTestPage,
      WritingTestPage
  ]
  goToTest(topitem,index){

        this.navCtrl.push(this.itemPages[index], {
            type: "type",
            session: topitem
        });
 
   
  }
}
