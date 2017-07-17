import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

/**
 * Generated class for the ExaminationinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-examinationinfo',
  templateUrl: 'examinationinfo.html',
})
export class ExaminationinfoPage {

  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  // }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ExaminationinfoPage');
  // }
    session: any;

  constructor(public navParams: NavParams) {
    this.session = navParams.data.session;
  }

}
