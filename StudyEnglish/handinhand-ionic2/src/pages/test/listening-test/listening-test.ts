import { Component } from '@angular/core';


import { NavParams,NavController } from 'ionic-angular';


import { ConferenceData } from '../../../providers/conference-data';

@Component({
  selector: 'page-listening-page',
  templateUrl: 'listening-test.html'
})
export class ListeningTestPage {
  session: any;
  type: any;
  step=0;

  testNmae : any[] = [
   
  ]

toplist: any[] = [
  
]
  constructor(public navParams: NavParams) {
    this.session = navParams.data.session;
    this.type = navParams.data.type;
  }

  gotoNext(){
      this.step =this.step +1;
  }
}