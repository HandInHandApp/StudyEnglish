import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { TabsPage } from '../tabs/tabs';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {username: string, password?: string,mobilePhone?:number, smsCode?:number, who?:string} = {username:""};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData,    public confData: ConferenceData) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup.username);
      
      this.userData.createUser(this.signup).subscribe(result => console.log( result));

      this.navCtrl.push(TabsPage);
    }
  }
  requestVerfiyCode(form: NgForm){
        console.log(form)
        // this.userData.requestMobilePhoneVerify({"mobilePhoneNumber": this.signup.mobilePhone}).subscribe(result => console.log( result));
        this.confData.createUserBefroeCheckAV(this.signup)
      
  }
  sendSmsCodeToVerfiy(form: NgForm){
        this.confData.createUserCheckSmsCodeAV(this.signup.smsCode)
  }
}
