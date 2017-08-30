import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { TabsPage } from '../tabs/tabs';

import { ConferenceData } from '../../providers/conference-data';
// import { AlertController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {username: string, password?: string,mobilePhone?:number, smsCode?:number, who?:string} = {username:""};
  submitted = false;
  smscode_have_send=false;
  message="test";
  constructor(public navCtrl: NavController, 
    public userData: UserData,    
    public confData: ConferenceData,
    // public alertCtrl: AlertController
    public alertCtrl: AlertController
  ) {}

  whos = [
          {name:"我是学生",value:"student" },
          {name:"我是家长",value:"parent" },
          {name:"我是老师",value:"teacher" }
  ]

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup.username);
      
      this.userData.createUser(this.signup).subscribe(result => console.log( result));

      this.navCtrl.push(TabsPage);
    }
  }
  showAlert(text,detail) {
    let alert = this.alertCtrl.create({
      title: text,
      subTitle: detail,
      buttons: ['OK']
    });
    alert.present();
    
  }

  initUserToDb(){
    var x= {};
    this.confData.pushloaclDatas(x,this.signup.username)
      .then( (todo) => {
        console.log('setUserDatasId is ' + todo.id);
        this.userData.setUserDatasId(todo.id)
      },  (error)  => {
        this.showAlert("发送失败", error)
      });
  }

  //sinup with phone and then to check sms code
  signUp2(form: NgForm){
    // if (!form.valid) 
    //    return
    
    if(typeof(this.signup.mobilePhone) == "undefined" || this.signup.mobilePhone< 10000000000){
      this.showAlert("注意", "请输入正确的手机号码")
      return
    }
    this.confData.createUserBefroeCheckAV(this.signup)
        .then((success) => {
          console.log("验证已发送")
          this.showAlert("","验证已发送")
          // this.message="验证已发送"
      }, (error) =>  {
          console.log("验证已发送失败："+error)
          this.showAlert("验证已发送失败", error)
          this.message="验证已发送失败: "+error
      });
  }
  checkSmsCode(form: NgForm){
    if (!form.valid)  return
    if(typeof(this.signup.smsCode) == "undefined"  ){
      this.showAlert("注意", "请输入正确的手机验证码")
      return
    }
    this.confData.createUserCheckSmsCodeAV(this.signup.smsCode)
        .then( (success:any )=>{
          this.userData.setUserId(success.objectId);
          this.initUserToDb()
          this.onSignup(form)
          this.showAlert("恭喜您","注册成功")

        }, error => {
          this.showAlert("注册失败",error)
        });
  }

   //request sms code and then sinup by phone and sms code
  requestVerfiyCode(form: NgForm){
    if (!form.valid)  return
    console.log(form)
    if(typeof(this.signup.mobilePhone) == "undefined" || this.signup.mobilePhone< 10000000000){
      this.showAlert("注意", "请输入正确的手机号码")
      return
    }
    this.confData.requestSmsCode( this.signup.mobilePhone)
                  .then((success) => {
                      console.log("验证已发送")
                      this.showAlert("","验证已发送")
                      // this.message="验证已发送"
                  }, (error) =>  {
                      console.log("验证已发送失败："+error)
                      this.showAlert("验证已发送失败", error)
                      this.message="验证已发送失败: "+error
                  });
      
  }
  signUp(form: NgForm){
    if (!form.valid)  return
    this.confData.signUpOrlogInWithMobilePhone(this.signup.mobilePhone,this.signup.smsCode)
      .then( success =>{
        
        this.showAlert("恭喜您","注册成功")
      }, error => {
        this.showAlert("注册失败",error)
      });
  }
}
