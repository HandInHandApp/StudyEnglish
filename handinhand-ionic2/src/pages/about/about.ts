import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  conferenceDate = '2047-05-17';
  toplist: any[];

  constructor(
    public popoverCtrl: PopoverController,
    public confData: ConferenceData
  ) { 
    this.confData.getTestListData("tpotest")
    .subscribe(resulte => 
            {
              this.toplist =resulte.testlist;
              console.log(resulte)
            }
         );

  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
}
