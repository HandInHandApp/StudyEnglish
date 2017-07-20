// import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { Http,Headers } from '@angular/http';
  // RequestOptions } from '@angular/http';

import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {DayPilot} from "daypilot-pro-angular";
import EventData = DayPilot.EventData;

// import { AV } from "leancloud-storage";
import AV from 'leancloud-storage'; 
// declare var firebase: any;

const appId = 'Eul6rG90rOjIO5imP853JOmn-gzGzoHsz';
const appKey = 'XdmDTh1MQGHCYrJjp1B5Jyh1';
AV.init({ appId, appKey });

@Injectable()
export class ConferenceData {
  data: any;

  // APP_ID : "Eul6rG90rOjIO5imP853JOmn-gzGzoHsz";
  // APP_KEY : "XdmDTh1MQGHCYrJjp1B5Jyh1";
// const APP_ID = 'Eul6rG90rOjIO5imP853JOmn-gzGzoHsz';
// const APP_KEY = 'XdmDTh1MQGHCYrJjp1B5Jyh1';
// AV.init({ appId, appKey });


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
    console.log(excludeTracks,segment)
    return this.load().map((data: any) => {
      console.log(data)
      let list = this.training;
      

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      // let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

    

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

  getCategories() {
    return this.load().map((data: any) => {
      return data.categories;
    })
  }

  getCategorytypes() {
    return this.load().map((data: any) => {
      return data.categorytypes;
    })
  }

  getExercises() {
    return this.load().map((data: any) => {
      return data.exercises;
    })
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
    console.log(start)
    console.log(end)
    var url="https://api.leancloud.cn/1.1/classes/Event?limit=100&&order=-updatedAt&&";
    return this.http.get(url, {headers:this.getHeaders()})
                    .map((response) => {
                      var ne : QueryResult;
                      ne = response.json();
                      return ne.results;
                    });
  }

  getDirectionData(directionType: string){
    var url='https://api.leancloud.cn/1.1/classes/Directions?where={"type":"'+directionType+'"}&limit=1&&order=-updatedAt&&';
    return this.http.get(url, {headers:this.getHeaders()})
                    .map((response) => {
                      var ne : QueryResult;
                      ne = response.json();
                      return ne.results[0];
                    });
  }

  getReadingPaper(): Observable<ReadingPaper[]> {
    var url="https://api.leancloud.cn/1.1/classes/ReadingPaper?limit=100&&order=-updatedAt&&";
    return this.http.get(url, {headers:this.getHeaders()})
                    .map((response) => {
                      var ne : QueryResult;
                      ne = response.json();
                      return ne.results;
                    });
  }
  createReadingPaper(params: CreateReadingPaperParams):Observable<BackendResult>{
    var url ="https://api.leancloud.cn/1.1/classes/ReadingPaper"
    return this.http.post(url, params, {headers:this.getHeaders()})
                    .map((response) => response.json());
  }

  createEvent(params: CreateEventParams): Observable<BackendResult> {
    var url ="https://api.leancloud.cn/1.1/classes/Event"
    return this.http.post(url, params, {headers:this.getHeaders()})
                    .map((response) => response.json());
  }

  deleteEvent(objectId: string): Observable<BackendResult> {
    // id="594f7b770ce46300576ab053"
    var url = "https://api.leancloud.cn/1.1/classes/Event/"+objectId ;

    return this.http.delete(url, {headers:this.getHeaders()})
                    .map((response) => response.json());
  }

  moveEvent(params: MoveEventParams): Observable<BackendResult> {
    console.log(params)
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


  createUser(params: any): Observable<BackendResult> {
    var url ="https://api.leancloud.cn/1.1/users"
    return this.http.post(url, params, {headers:this.getHeaders()})
                    .map((response) => response.json());
  }

  getReadingTestData(course: string) {
    return this.http.get('assets/'+course+'/reading.json')
               .map(result=> result.json());
  }

  getAllTestPassage(){
    var passages = [
      {
        "name":"passage1",
        "title":"Islamic Art and the Book ", 
        "contents": [
          "The arts of the Islamic book, such as calligraphy and decorative drawing, developed during A.D. 900 to 1500, and luxury books are some of the most characteristic examples of Islamic art produced in this period. This came about from two major developments: paper became common, replacing parchment as the major medium for writing, and rounded scripts were regularized and perfected so that they replaced the angular scripts of the previous period, which because of their angularity were uneven in height. Books became major vehicles for artistic expression, and the artists who produced them, notably calligraphers and painters, enjoyed high status, and their workshops were often sponsored by princes and their courts. Before A.D. 900, manuscripts of the Koran (the book containing the teachings of the Islamic religion) seem to have been the most common type of book produced and decorated, but after that date a wide range of books were produced for a broad spectrum of patrons. These continued to include, of course, manuscripts of the Koran, which every Muslim wanted to read, but scientific works, histories, romances, and epic and lyric poetry were also copied in fine handwriting and decorated with beautiful illustrations. Most were made for sale on the open market, and cities boasted special souks (markets) where books were bought and sold. The mosque of Marrakech in Morocco is known as the Kutubiyya, or Booksellers’ Mosque, after the adjacent market. Some of the most luxurious books were specific commissions made at the order of a particular prince and signed by the calligrapher and decorator. ",
          "Papermaking had been introduced to the Islamic lands from China in the eighth century.  It has been said that Chinese papermakers were among the prisoners captured in a battle fought near Samarqand between the Chinese and the Muslims in 751, and the technique of  papermaking – in which cellulose pulp extracted from any of several plants is first suspended  in water, caught on a fine screen, and then dried into flexible sheets – slowly spread  westward. Within fifty years, the government in Baghdad was using paper for documents. Writing in ink on paper, unlike parchment, could not easily be erased, and therefore paper had the advantage that it was difficult to alter what was written on it. Papermaking spread quickly to Egypt – and eventually to Sicily and Spain – but it was several centuries before paper supplanted parchment for copies of the Koran, probably because of the conservative nature of religious art and its practitioners. In western Islamic lands, parchment continued to be used for manuscripts of the Koran throughout this period.",
          "The introduction of paper spurred a conceptual revolution whose consequences have barely been explored. Although paper was never as cheap as it has become today, it was far less expensive than parchment, and therefore more people could afford to buy books, Paper is thinner than parchment, so more pages could be enclosed within a single volume. At first, paper was made in relatively small sheets that were pasted together, but by the beginning of the fourteenth century, very large sheets – as much as a meter across – were available. These large sheets meant that calligraphers and artists had more space on which to work.  Paintings became more complicated, giving the artist greater opportunities to depict space or emotion. The increased availability of paper, particularly after 1250, encouraged people to develop systems of representation, such as architectural plans and drawings. This in turn allowed the easy transfer of artistic ideas and motifs over great distances from one medium to another, and in a different scale in ways that had been difficult, if not impossible, in the previous period. ",
          "Rounded styles of Arabic handwriting had long been used for correspondence and documents alongside the formal angular scripts used for inscriptions and manuscripts of the Koran. Around the year 900, Ibn Muqla, who was a secretary and vizier at the Abbasid court in Baghdad, developed a system of proportioned writing. He standardized the length of alif, the first letter of the Arabic alphabet, and then determined what the size and shape of all other letters should be, based on the alif. Eventually, six round forms of handwriting, composed of three pairs of big and little scripts known collectively as the Six Pens, became the standard repertory of every calligrapher. "
        ]
      },
      {"name":"passage2", "title":"", "content":"" },
      {"name":"passage3", "title":"", "content":"" }
    ]
    return passages
  }

  getListeningTestData(url){
    console.log(url)

    // let listenurl = 'assets/data/tpo34_listenting_json.json'
    // return readdata
    return this.http.get(url)
        .map((response) => response.json());
  }
  getSpeakingTestData(url){
    console.log(url)

    // let url = 'assets/data/tpo34_speaking_json.json'
    // return readdata
    return this.http.get(url)
        .map((response) => response.json());
  }
  

  getTestListData(){

    let listenurl = 'assets/data/testlist.json'
    // return readdata
    return this.http.get(listenurl)
        .map((response) => response.json());
  }

  postuserRecoder(filename,blobfile){
    // AV.init(this.APP_ID, this.APP_KEY);
    console.log(blobfile)
    //  var file = AV.File.withURL(filename, 'http://ww3.sinaimg.cn/bmiddle/596b0666gw1ed70eavm5tg20bq06m7wi.gif');
    //  var file = AV.File.withURL(filename, url);
    //  var bytes = [0xBE, 0xEF, 0xCA, 0xFE];
     var file = new AV.File(filename, {blob: blobfile} );
      file.save().then(function(file) {
        // 文件保存成功
        console.log(file.url());
      }, function(error) {
        // 异常处理
        console.error(error);
      });


    // var url ="https://api.leancloud.cn/1.1/files/"+filename
    //   var myheaders = new Headers();

    //   myheaders.append("Content-Type" ,"multipart/form-data");
    //   myheaders.append("X-LC-Id", "Eul6rG90rOjIO5imP853JOmn-gzGzoHsz");
    //   myheaders.append("X-LC-Key" , "XdmDTh1MQGHCYrJjp1B5Jyh1");
  

    // return this.http.post(url, params, {headers:myheaders})
    //                 .map((response) => response.json());

  }

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

export interface CreateReadingPaperParams{
  name: string;
  passage: string[];
}

export interface ReadingPaper {
  name: string;
  passage: string[];
  updatedAt: string;
}