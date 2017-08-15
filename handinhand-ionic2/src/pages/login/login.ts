import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { AlertController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username: string, password?: string} = {username: "", password: ""}
  submitted = false;

  constructor(
    public navCtrl: NavController, 
    public userData: UserData,
    public alertCtrl: AlertController,
    public confData: ConferenceData
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.pushtoDb()
      this.navCtrl.push(TabsPage);
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  showAlert(text,detail) {
    let alert = this.alertCtrl.create({
      title: text,
      subTitle: detail,
      buttons: ['OK']
    });
    alert.present();
    
  }
  logincheck(form: NgForm){
    if (!form.valid)  return
      
    this.confData.login(this.login.username, this.login.password)
        .then((loginedUser) => {
          console.log(loginedUser)
          console.log("登录成功")
          // 
          this.userData.setUserId(loginedUser.id)
          this.confData.queryUserDatas(loginedUser.id)
            .then(results => {
              console.log(results)
              this.showAlert("","登录成功")
             
              this.userData.setUserDatasId(results[0].id)
              this.userData.setUserDatas(results[0].attributes)
              
              this.onLogin(form)

            },  (error) => {
              this.showAlert("获取用户数据失败", error)
            });
          

      }, (error) =>  {
          console.log("验证已发送失败："+error)
          this.showAlert("验证已发送失败", error)
      });
  }

  getAll(){
    this.userData.getAllLocalDatas()
  }
  pushtoDb(){
    var x= this.userData.getAllLocalDatas();
    this.confData.pushloaclDatas(x,this.login.username)
      .then( (todo) => {
        console.log('setUserDatasId is ' + todo.id);
        this.userData.setUserDatasId(todo.id)
      },  (error)  => {
        this.showAlert("发送失败", error)
      });
  }
  queryUserDatas(id){
    this.confData.queryUserDatas(id)
  }
  sycn(){
      this.confData.syncloaclDatas()   
  }
}
