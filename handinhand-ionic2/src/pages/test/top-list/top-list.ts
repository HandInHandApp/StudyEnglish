import { Component } from '@angular/core';

import { NavParams,NavController } from 'ionic-angular';

import { ListeningTestPage } from '../listening-test/listening-test'
import { WritingTestPage } from   '../writing-test/writing-test'
import { SpeakingTestPage } from  '../speaking-test/speaking-test'
import { ReadingTestPage } from  '../reading-test/reading-test'

import { ConferenceData } from '../../../providers/conference-data';

@Component({
  selector: 'page-top-list',
  templateUrl: 'top-list.html'
})
export class TopListPage {
  session: any;
  type: any;


toplist: any[]
  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              public confData: ConferenceData
    ) {
    this.session = navParams.data.session;
    this.type = navParams.data.type;
    this.confData.getTestListData("tpotest")
      .subscribe(resulte => 
              {
                this.toplist =resulte.testlist;
                console.log(resulte)
              }
           );
  }

  itemPages= {
      "Reading":ReadingTestPage,
      "Listening":ListeningTestPage,
      "Speaking":SpeakingTestPage,
      "Writing": WritingTestPage
  }

  
  goToTest(topitem,top){
        this.navCtrl.push(this.itemPages[topitem.pagetype], {
            curTPO: top,
            type: "type",
            url:topitem.url,
            headername:top.title+" "+topitem.pagetype,
            session: topitem,
            title: top.title
        });
  }
}
