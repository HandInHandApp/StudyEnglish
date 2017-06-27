import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { Http,Headers,RequestOptions } from '@angular/http';

import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {DayPilot} from "daypilot-pro-angular";
import EventData = DayPilot.EventData;

declare var firebase: any;

@Injectable()
export class ConferenceData {
  data: any;


  constructor(public http: Http, public user: UserData) {}

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .map(this.processData, this);
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data.json();

    this.data.tracks = [];

    // loop through each day in the schedule
    this.data.schedule.forEach((day: any) => {
      // loop through each timeline group in the day
      day.groups.forEach((group: any) => {
        // loop through each session in the timeline group
        group.sessions.forEach((session: any) => {
          session.speakers = [];
          if (session.speakerNames) {
            session.speakerNames.forEach((speakerName: any) => {
              let speaker = this.data.speakers.find((s: any) => s.name === speakerName);
              if (speaker) {
                session.speakers.push(speaker);
                speaker.sessions = speaker.sessions || [];
                speaker.sessions.push(session);
              }
            });
          }

          if (session.tracks) {
            session.tracks.forEach((track: any) => {
              if (this.data.tracks.indexOf(track) < 0) {
                this.data.tracks.push(track);
              }
            });
          }
        });
      });
    });

    return this.data;
  }

  getTimeline(dayIndex: number, queryText = '', excludeTracks: any[] = [], segment = 'all') {
    return this.load().map((data: any) => {
      let day = data.schedule[dayIndex];
      day.shownSessions = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      day.groups.forEach((group: any) => {
        group.hide = true;

        group.sessions.forEach((session: any) => {
          // check if this session should show or not
          this.filterSession(session, queryWords, excludeTracks, segment);

          if (!session.hide) {
            // if this session is not hidden then this group should show
            group.hide = false;
            day.shownSessions++;
          }
        });

      });

      return day;
    });
  }
  readingSession: any[] = [{
        "id":1,
        "name": "句子训练-简单句",
        "nmbuer": "2201",
        "description": "简单的句子结构",
        "costtine": "24个小时",
        "havefinished": 10,
        "speakerNames": ["Eva Eagle", "Lionel Lion"],
        "tracks": ["Ionic"]
      },{
        "id":2,
        "name": "句子训练-复杂句",
        "nmbuer": "2201",
        "description": "简单的句子结构",
        "costtine": "24个小时",
        "havefinished": 10,
        "speakerNames": ["Eva Eagle", "Lionel Lion"],
        "tracks": ["Ionic"]
      },{
        "id":3,
        "name": "句子训练-复合句",
        "nmbuer": "2201",
        "description": "简单的句子结构",
        "costtine": "24个小时",
        "havefinished": 10,
        "speakerNames": ["Eva Eagle", "Lionel Lion"],
        "tracks": ["Ionic"]
      },{
        "id":4,
        "name": "逻辑训练",
        "nmbuer": "2201",
        "description": "简单的句子结构",
        "costtine": "24个小时",
        "havefinished": 10,
        "speakerNames": ["Eva Eagle", "Lionel Lion"],
        "tracks": ["Ionic"]
      },{
        "id":5,
        "name": "段路训练",
        "nmbuer": "2201",
        "description": "简单的句子结构",
        "costtine": "24个小时",
        "havefinished": 10,
        "speakerNames": ["Eva Eagle", "Lionel Lion"],
        "tracks": ["Ionic"]
      },{
        "id":6,
        "name": "题型训练",
        "nmbuer": "2201",
        "description": "简单的句子结构",
        "costtine": "24个小时",
        "havefinished": 10,
        "speakerNames": ["Eva Eagle", "Lionel Lion"],
        "tracks": ["Ionic"]
      }]

  training : any[] = [{
    "title":"阅读训练",
    "subtitle":"52分钟",
    "profileminPic":"assets/img/speakers/mouse.jpg",
    "profilePic":"assets/img/advance-card-bttf.png",
    "desc1":"优点：用时短；全程52分钟",
    "desc2":"缺点：不如全真模考考察细致",
    "desc3":"适用人群：已经考过或者时间紧张的考生",
    "sessions": this.readingSession
  },{
    "title":"听力训练",
    "subtitle":"225分钟",
    "profileminPic":"assets/img/speakers/lion.jpg",
    "profilePic":"assets/img/advance-card-jp.jpg",
    "desc1":"优点：考察细致，接近实考",
    "desc2":"缺点：耗时长；全程3小时45分钟左右",
    "desc3":"适用人群：未考过或希望细致评估的考生"
  },{
    "title":"写作训练",
    "subtitle":"225分钟",
    "profileminPic":"assets/img/speakers/lion.jpg",
    "profilePic":"assets/img/advance-card-jp.jpg",
    "desc1":"优点：考察细致，接近实考",
    "desc2":"缺点：耗时长；全程3小时45分钟左右",
    "desc3":"适用人群：未考过或希望细致评估的考生"
  },{
    "title":"口语训练",
    "subtitle":"225分钟",
    "profileminPic":"assets/img/speakers/lion.jpg",
    "profilePic":"assets/img/advance-card-jp.jpg",
    "desc1":"优点：考察细致，接近实考",
    "desc2":"缺点：耗时长；全程3小时45分钟左右",
    "desc3":"适用人群：未考过或希望细致评估的考生"
  }]
  getTraining(queryText = '', excludeTracks: any[] = [], segment = 'all') {
    return this.load().map((data: any) => {
      let list = this.training;
      

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

    

      return list;
    });
  }

  filterSession(session: any, queryWords: string[], excludeTracks: any[], segment: string) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach((trackName: string) => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segement is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(session.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }

  getSpeakers() {
    return this.load().map((data: any) => {
      return data.speakers.sort((a: any, b: any) => {
        let aName = a.name.split(' ').pop();
        let bName = b.name.split(' ').pop();
        return aName.localeCompare(bName);
      });
    });
  }

  getTracks() {
    return this.load().map((data: any) => {
      return data.tracks.sort();
    });
  }

  getMap() {
    return this.load().map((data: any) => {
      return data.map;
    });
  }

  // getEvents(start: DayPilot.Date, end: DayPilot.Date){
  //   //  return this.http.get('assets/data/events.json')
  //   return this.http.get('https://handinhand-11eed.firebaseio.com/.json')
  //                    .map((response) => response.json())
                     
  // }

  // getEvents(start: DayPilot.Date, end: DayPilot.Date): EventData[] {

  //    return firebase.database()
  //           .ref('/')
  //           .on('child_added',(snpshort) =>snpshort.val())

  //   // return this.http.post("/api/backend_events.php", {start: start, end: end}).map((response:Response) => response.json());
  // }

 getHeaders(){
      var myheaders = new Headers();

      myheaders.append("Content-Type" ,"application/json");
      myheaders.append("X-LC-Id", "Eul6rG90rOjIO5imP853JOmn-gzGzoHsz");
      myheaders.append("X-LC-Key" , "XdmDTh1MQGHCYrJjp1B5Jyh1");
      
      return  myheaders;
 }


  getEvents(start: DayPilot.Date, end: DayPilot.Date): Observable<EventData[]> {

     

    var url="https://api.leancloud.cn/1.1/classes/Event?limit=100&&order=-updatedAt&&";
    return this.http.get(url, {headers:this.getHeaders()})
                    .map((response) => {
                      var ne : QueryResult;
                      ne = response.json();
                      return ne.results;
                    }
                    
                    );
  }

  createEvent(params: CreateEventParams): Observable<BackendResult> {
    var url ="https://api.leancloud.cn/1.1/classes/Event"
    return this.http.post(url, params, {headers:this.getHeaders()})
                    .map((response) => response.json());
  }

  deleteEvent(id: string): Observable<BackendResult> {
    id="594f7b770ce46300576ab053"
    var url = "https://api.leancloud.cn/1.1/classes/Event/"+id;

    return this.http.delete(url, {headers:this.getHeaders()})
                    .map((response) => response.json());
  }

  moveEvent(params: MoveEventParams): Observable<BackendResult> {
    var id="594f7b770ce46300576ab053"
    var url = "https://api.leancloud.cn/1.1/classes/Event/"+id;
    return this.http.put(url, {headers:this.getHeaders()})
                    .map((response) => response.json());
  }
  updateEvent(params: CreateEventParams): Observable<BackendResult> {
    var objectId=params.objectId;
  
    var url = "https://api.leancloud.cn/1.1/classes/Event/"+objectId;
    return this.http.put(url, params,{headers:this.getHeaders()})
                    .map((response) => response.json());
  }

  // events : EventData[] = [
    // {
    //   id: 1,
    //   start: "2017/06/01",
    //   end: "2017/06/02",
    //   text: "string"
    // },{
    //   id: 2,
    //   start: "2017/06/03",
    //   end: "2017/06/04",
    //   text: "string"
    // },{
    //   id: 3,
    //   start: "2017/06/06",
    //   end: "2017/06/07",
    //   text: "string"
    // }
  // ]
  // getEvents(start: DayPilot.Date, end: DayPilot.Date) {
  //   var x = this.events;
  //   return x;

  // }

  // createEvent(params: CreateEventParams){
  //   return "ok";
  // }

  // deleteEvent(id: string) {
  //    return "ok";
  // }

  // moveEvent(params: MoveEventParams) {
  //    return "ok";
  // }

  // fbGetData(){
  //   firebase.database()
  // }

}
export interface QueryResult {
  results: any[];
}

export interface CreateEventParams {
  id?: string | number;
  start: string;
  end: string;
  text: string;
  objectId:string;
}

export interface MoveEventParams {
  id: string | number;
  newStart: string;
  newEnd: string;
}

export interface BackendResult {
  id: string | number;
  result: string;
  message: string;
  objectId: string;
  createdAt: string;
}