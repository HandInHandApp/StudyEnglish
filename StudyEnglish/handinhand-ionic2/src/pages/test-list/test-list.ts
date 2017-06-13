import { Component, ViewChild} from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController,List, } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';

// import { ExaminationDetailPage } from '../pages/examination-detail/examination-detail';
import { ExaminationinfoPage } from '../pages/examinationinfo/examinationinfo';
@Component({
  selector: 'page-test-list',
  templateUrl: 'test-list.html'
})
export class TestListPage {
  @ViewChild('steptestList', { read: List }) steptestList: List;
  @ViewChild('starttestList', { read: List }) starttestList: List;

  actionSheet: ActionSheet;
  speakers: any[] = [];
  starttests: any[] = [{
    "title":"迷你测试",
    "subtitle":"52分钟",
    "profileminPic":"assets/img/speakers/mouse.jpg",
    "profilePic":"assets/img/advance-card-bttf.png",
    "desc1":"优点：用时短；全程52分钟",
    "desc2":"缺点：不如全真模考考察细致",
    "desc3":"适用人群：已经考过或者时间紧张的考生"
  },{
    "title":"全真测试",
    "subtitle":"225分钟",
    "profileminPic":"assets/img/speakers/lion.jpg",
    "profilePic":"assets/img/advance-card-jp.jpg",
    "desc1":"优点：考察细致，接近实考",
    "desc2":"缺点：耗时长；全程3小时45分钟左右",
    "desc3":"适用人群：未考过或希望细致评估的考生"
  }]

  steptests: any[] = [{
    "title":"阶段一测试",
    "subtitle":"52分钟",
    "profileminPic":"assets/img/speakers/mouse.jpg",
    "profilePic":"assets/img/advance-card-bttf.png",
    "desc1":"优点：用时短；全程52分钟",
    "desc2":"缺点：不如全真模考考察细致",
    "desc3":"适用人群：已经考过或者时间紧张的考生"
  },{
    "title":"阶段一测试",
    "subtitle":"225分钟",
    "profileminPic":"assets/img/speakers/lion.jpg",
    "profilePic":"assets/img/advance-card-jp.jpg",
    "desc1":"优点：考察细致，接近实考",
    "desc2":"缺点：耗时长；全程3小时45分钟左右",
    "desc3":"适用人群：未考过或希望细致评估的考生"
  }]
;

  segment = 'starttest';
  shownSessions: any = [];
  shownSegment: any;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) { }


  updateList() {
    // Close any open sliding items when the schedule updates
    // this.shownSegment = this.segment
    // this.shownSegment = 0;
    //  this.ionViewDidLoad();
    console.log(this.steptests)
        // Close any open sliding items when the schedule updates
    this.steptestList && this.steptestList.closeSlidingItems();


  }

  ionViewDidLoad() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;

    });
    // this.confData.getTest().subscribe((tests: any[]) => {
    //   this.steptests = tests;
    // });
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, {
      name: session.name,
      session: session
    });
  }

  goToSpeakerDetail(speakerName: any) {
    this.navCtrl.push(SpeakerDetailPage, {
      speaker: speakerName,
      name: speakerName.name
    });
  }

  goToSpeakerTwitter(speaker: any) {
    this.inAppBrowser.create(`https://twitter.com/${speaker.twitter}`, '_blank');
  }

  openSpeakerShare(speaker: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
            if ((window as any)['cordova'] && (window as any)['cordova'].plugins.clipboard) {
              (window as any)['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  openContact(speaker: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        }
      ]
    });

    actionSheet.present();
  }
}
