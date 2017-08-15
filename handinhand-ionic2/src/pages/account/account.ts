import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { ExaminationDetailPage } from '../examination-detail/examination-detail';
import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;

  constructor(public alertCtrl: AlertController, 
    public nav: NavController, 
    public userData: UserData,
    public confData: ConferenceData) {

  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  setting(){
    let alert = this.alertCtrl.create({
      title: '设置',
      buttons: [
        '取消'
      ]
    });
    alert.addInput({
      name: '用户名称',
      value: this.username,
      placeholder: '用户名称'
    });
    alert.addInput({
      name: '用户名称',
      value: this.username,
      placeholder: '用户名称'
    });
    alert.addButton({
      text: '确定',
      handler: (data: any) => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  goToSessionDetail(session: any,type: any) {
    this.nav.push(ExaminationDetailPage, {
      type: type,
      session: session
    });
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot('LoginPage');
  }

  support() {
    this.nav.push('SupportPage');
  }

  showAlert(text,detail) {
    let alert = this.alertCtrl.create({
      title: text,
      subTitle: detail,
      buttons: ['OK']
    });
    alert.present();
    
  }

  getAll(){
    this.userData.getAllLocalDatas()
  }

  queryUserDatas(id){
    this.confData.queryUserDatas(id)
  }
  sycn(){
      this.confData.syncloaclDatas()   
  }

}
