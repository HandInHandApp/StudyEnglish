import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Http,Headers } from '@angular/http';



import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';



@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  localDatas= {} ;

  constructor(
    public events: Events,
    public storage: Storage,
    public http: Http
  ) {}

//use lean clould

 getHeaders(){
      var myheaders = new Headers();

      myheaders.append("Content-Type" ,"application/json");
      myheaders.append("X-LC-Id", "Eul6rG90rOjIO5imP853JOmn-gzGzoHsz");
      myheaders.append("X-LC-Key" , "XdmDTh1MQGHCYrJjp1B5Jyh1");
      
      return  myheaders;
 }

  createUser(params: any): Observable<any> {
    var url ="https://api.leancloud.cn/1.1/users"
    return this.http.post(url, params, {headers:this.getHeaders()})
                    .map((response) => response.json());


  }


  requestMobilePhoneVerify(params: any): Observable<any> {
    var url ="https://api.leancloud.cn/1.1/requestMobilePhoneVerify"
    return this.http.post(url, params, {headers:this.getHeaders()})
                    .map((response) => response.json());
  }
  ////old



  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };


  login(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  };

  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };
  setUserId(userid: string): void {
    this.storage.set('userid', userid);
  };
  setUserDatasId(userid: string): void {
    this.storage.set('userdatasid', userid);
  };

  setUserDatas(datas){
    for(var p in datas){
      //遍历json对象的每个key/value对,p为key
         this.storage.set(p, datas[p])
         console.log(p + " " + datas[p]);
      }
  }
  // updateUserDatasInClould(datas){
  //   for(var p in datas){
  //     //遍历json对象的每个key/value对,p为key
  //        this.storage.set(p, datas[p])
  //        console.log(p + " " + datas[p]);
  //     }
  // }

  getUserId(): Promise<string>  {
    return this.storage.get('userid').then((value) => {
      return value;
    });
  };
  getUserDatasId(): Promise<string>  {
    return this.storage.get('userdatasid').then((value) => {
      return value;
    });
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
  
  setUserReadingAnswer(answer: any): void {
    this.storage.set("readingAnswer", answer)
  };

  getUserReadingAnswer(): Promise<any>{
    return this.storage.get("readingAnswer").then((value) =>{
      return value;
    });
  }
  

  getAllLocalDatas(){
    this.storage.forEach( (value, key, iterationNumber) => {
      console.log(value,key,iterationNumber)
      this.localDatas[key] = value
    })
    return  this.localDatas;
  }

  getLoalDatas(){
    return  this.localDatas;
  }


}
