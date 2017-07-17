import { Component } from '@angular/core';


import { NavParams } from 'ionic-angular';


// import { ConferenceData } from '../../../providers/conference-data';

@Component({
  selector: 'page-writing-page',
  templateUrl: 'writing-test.html'
})
export class WritingTestPage {
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
