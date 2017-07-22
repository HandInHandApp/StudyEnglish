import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http,Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import AV from 'leancloud-storage'; 
// declare var firebase: any;

const appId = 'Eul6rG90rOjIO5imP853JOmn-gzGzoHsz';
const appKey = 'XdmDTh1MQGHCYrJjp1B5Jyh1';

@Injectable()
export class ExerciseData {

  constructor(public http: Http){}  

  getPractice(): any {
    let url:string = 'assets/data/exercise/practise-type.json';

    return this.http.get(url)
        .map((response) => response.json());
  }

  getPracticeExeByType(id:number): any {
    let url:string = 'assets/data/exercise/practise-exe.json';

    return this.http.get(url)
        .map((response) => response.json());
  }
}