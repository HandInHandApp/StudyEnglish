import { Component } from '@angular/core';

import { NavParams,NavController } from 'ionic-angular';

import { ListeningTestPage } from '../listening-test/listening-test'
import { WritingTestPage } from   '../writing-test/writing-test'
import { SpeakingTestPage } from  '../speaking-test/speaking-test'
import { DirectionPage } from   '../../directions/directions'

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
    this.confData.getTestListData()
      .subscribe(resulte => 
              {
                this.toplist =resulte.tpolist;
                console.log(resulte)
              }
           );
  }

  itemPages= {
      "Reading":DirectionPage,
      "Listening":ListeningTestPage,
      "Speaking":SpeakingTestPage,
      "Writing":WritingTestPage

  }

  
  goToTest(topitem,top){
       

        this.navCtrl.push(this.itemPages[topitem.pagetype], {
            
            type: "type",
            url:topitem.url,
            headername:top.title+" "+topitem.pagetype,
            session: topitem
        });
 
   
  }
}
