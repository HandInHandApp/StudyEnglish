import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http,Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import AV from 'leancloud-storage';

// import { RxAVClient, RxAVObject, RxAVQuery } from 'rx-lean-js-core';
// const appId = 'Eul6rG90rOjIO5imP853JOmn-gzGzoHsz';
// const appKey = 'XdmDTh1MQGHCYrJjp1B5Jyh1';
// RxAVClient.init({ appId, appKey });


@Injectable()
export class ExerciseData {

  constructor(
    public events: Events,
    public storage: Storage,
    public http: Http
  ){}  

  getPracticeTypes(): any {
    let url:string = 'assets/data/exercise/practice-types.json';

    return this.http.get(url)
        .map((response) => response.json());
  }

  getPracticeQuestionByType(type: string): any {
    let query = new AV.Query('Question');

    console.log("Query type: %s", type);

    query.contains('type', type);
    query.limit(10);

    return query.find().then(function(res){
      return res;
    }, function(err){});

  }
}