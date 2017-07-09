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
    var url="https://api.leancloud.cn/1.1/classes/Event?limit=100&&order=-updatedAt&&";
    return this.http.get(url, {headers:this.getHeaders()})
                    .map((response) => {
                      var ne : QueryResult;
                      ne = response.json();
                      return ne.results;
                    });
  }

  getReadingPaper(): Observable<ReadingPaper[]> {
    var params={
      "name": "paper2",
      "passage":["pass3"]
    }
    // this.createReadingPaper(params)
    var url="https://api.leancloud.cn/1.1/classes/ReadingPaper?limit=100&&order=-updatedAt&&";
    return this.http.get(url, {headers:this.getHeaders()})
                    .map((response) => {
                      var ne : QueryResult;
                      ne = response.json();
                      // alert(ne.results);
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

  getReadingTestData() {
    var rp = this.getReadingPaper()
    alert(JSON.stringify(rp))
    var readdata = {
      "steps":["p1","q1","q2","q3","p2","p3"],
      "passage":{
        "p1":{
          "seq": 1,
          "title":"Islamic Art and the Book", 
          "contents": [
            "The arts of the Islamic book, such as calligraphy and decorative drawing, developed during A.D. 900 to 1500, and luxury books are some of the most characteristic examples of Islamic art produced in this period. This came about from two major developments: paper became common, replacing parchment as the major medium for writing, and rounded scripts were regularized and perfected so that they replaced the angular scripts of the previous period, which because of their angularity were uneven in height. Books became major vehicles for artistic expression, and the artists who produced them, notably calligraphers and painters, enjoyed high status, and their workshops were often sponsored by princes and their courts. Before A.D. 900, manuscripts of the Koran (the book containing the teachings of the Islamic religion) seem to have been the most common type of book produced and decorated, but after that date a wide range of books were produced for a broad spectrum of patrons. These continued to include, of course, manuscripts of the Koran, which every Muslim wanted to read, but scientific works, histories, romances, and epic and lyric poetry were also copied in fine handwriting and decorated with beautiful illustrations. Most were made for sale on the open market, and cities boasted special souks (markets) where books were bought and sold. The mosque of Marrakech in Morocco is known as the Kutubiyya, or Booksellers’ Mosque, after the adjacent market. Some of the most luxurious books were specific commissions made at the order of a particular prince and signed by the calligrapher and decorator. ",
            "Papermaking had been introduced to the Islamic lands from China in the eighth century.  It has been said that Chinese papermakers were among the prisoners captured in a battle fought near Samarqand between the Chinese and the Muslims in 751, and the technique of  papermaking – in which cellulose pulp extracted from any of several plants is first suspended  in water, caught on a fine screen, and then dried into flexible sheets – slowly spread  westward. Within fifty years, the government in Baghdad was using paper for documents. Writing in ink on paper, unlike parchment, could not easily be erased, and therefore paper had the advantage that it was difficult to alter what was written on it. Papermaking spread quickly to Egypt – and eventually to Sicily and Spain – but it was several centuries before paper supplanted parchment for copies of the Koran, probably because of the conservative nature of religious art and its practitioners. In western Islamic lands, parchment continued to be used for manuscripts of the Koran throughout this period.",
            "The introduction of paper spurred a conceptual revolution whose consequences have barely been explored. Although paper was never as cheap as it has become today, it was far less expensive than parchment, and therefore more people could afford to buy books, Paper is thinner than parchment, so more pages could be enclosed within a single volume. At first, paper was made in relatively small sheets that were pasted together, but by the beginning of the fourteenth century, very large sheets – as much as a meter across – were available. These large sheets meant that calligraphers and artists had more space on which to work.  Paintings became more complicated, giving the artist greater opportunities to depict space or emotion. The increased availability of paper, particularly after 1250, encouraged people to develop systems of representation, such as architectural plans and drawings. This in turn allowed the easy transfer of artistic ideas and motifs over great distances from one medium to another, and in a different scale in ways that had been difficult, if not impossible, in the previous period. ",
            "Rounded styles of Arabic handwriting had long been used for correspondence and documents alongside the formal angular scripts used for inscriptions and manuscripts of the Koran. Around the year 900, Ibn Muqla, who was a secretary and vizier at the Abbasid court in Baghdad, developed a system of proportioned writing. He standardized the length of alif, the first letter of the Arabic alphabet, and then determined what the size and shape of all other letters should be, based on the alif. Eventually, six round forms of handwriting, composed of three pairs of big and little scripts known collectively as the Six Pens, became the standard repertory of every calligrapher. "
          ]
        },
        "p2":{
          "seq": 2,
          "title":"Protection of Plants by Insects", 
          "contents": [
            "Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "Ants are portably the most frequent and certainly the most persistent defenders of plants. Since the highly active worker ants require a great deal of energy, plants exploit this need by providing extrafloral nectar that supplies ants with abundant energy. To return this favor, ants guard the nectaries, driving away or killing intruding insects that might compete with ants for nectar. Many of these intruders are herbivorous and would eat the leaves of the plants.",
            "Biologists once thought that secretion of extrafloral nectar has some purely internal physiological function, and that ants provide no benefit whatsoever to the plants that secrete it. This view and the opposing “protectionist” hypothesis that ants defend plants had been disputed for over a hundred years when, in 1910, a skeptical William Morton Wheeler commented on the controversy. He called for proof of the protectionist view: that visitations of the ants confer protection on the plants and that in the absence of the insects a much greater number would perish or fail to produce flowers or seeds than when the insects are present. That we now have an abundance of the proof that was called for was established when Barbara Bentley reviewed the relevant evidence in 1977, and since then many more observations and experiments have provided still further proof that ants benefit plants. ",
            "One example shows how ants attracted to extrafloral nectaries protect morning glories against attacking insects. The principal insect enemies of the North American morning glory feed mainly on its flowers or fruits rather than its leaves. Grasshoppers feeding on flowers indirectly block pollination and the production of seeds by destroying the corolla or the stigma, which receives the pollen grains and on which the pollen germinates. Without their colorful corolla, flowers do not attract pollinators and are not fertilized. An adult grasshopper can consume a large corolla, about 2.5 inches long, in an hour. Caterpillars and seed beetles affect seed production directly. Caterpillars devour the ovaries, where the seeds are produced, and seed beetle larvae eat seeds as they burrow in developing fruits. ",
            "Extrafloral nectaries at the base of each sepal attract several kinds of insects, but 96 percent of them are ants, several different species of them. When buds are still small, less than a quarter of an inch long, the sepal nectaries are already present and producing nectar.  They continue to do so as the flower develops and while the fruit matures. Observations leave little doubt that ants protect morning glory flowers and fruits from the combined enemy force of grasshoppers, caterpillars, and seed beetles. Bentley compares the seed production of six plants that grew where there were no ants with that of seventeen plants that were occupied by ants. Unprotected plants bore only 45 seeds per plant, but plants occupied by ants bore 211 seeds per plant. Although ants are not big enough to kill or seriously injure grasshoppers, they drive them away by nipping at their feet. Seed beetles are more vulnerable because they are much smaller than grasshoppers. The ants prey on the adult beetles, disturb females as they lay their eggs on developing fruits, and eat many of the eggs they do manage to lay. "
          ]
        },
        "p3":{
          "seq": 3,
          "title":"The Development of Steam Power", 
          "contents": [
            "By the eighteenth century, Britain was experiencing a severe shortage of energy. Because of the growth of population, most of the great forests of medieval Britain had long ago been replaced by fields of grain and hay. Wood was in ever-shorter supply, yet it remained tremendously important. It served as the primary source of heat for all homes and industries and as a basic raw material. Processed wood (charcoal) was the fuel that was mixed with iron ore in the blast furnace to produce pig iron (raw iron). The iron industry’s appetite for wood was enormous, and by 1740 the British iron industry was stagnating. Vast forests enabled Russia to become the world’s leading producer of iron, much of which was exported to Britain. But Russia’s potential for growth was limited too, and in a few decades Russia would reach the barrier of inadequate energy that was already holding England back.",
            "As this early energy crisis grew worse, Britain looked toward its abundant and widely scattered reserves of coal as an alternative to its vanishing wood. Coal was first used in Britain in the late Middle Ages as a source of heat. By 1640 most homes in London were heated with it, and it also provided heat for making beer, glass, soap, and other products. Coal was not used, however, to produce mechanical energy or to power machinery. It was there that coal’s potential wad enormous.",
            "As more coal was produced, mines were dug deeper and deeper and were constantly filling with water. Mechanical pumps, usually powered by hundreds of horses waling in circles at the surface, had to be installed. Such power was expensive and bothersome. In an attempt to overcome these disadvantages, Thomas Savery in 1698 and Thomas Newcomen in 1705 invented the first primitive steam engines. Both engines were extremely inefficient. Both burned coal to produce steam, which was then used to operate a pump. However, by the early 1770s, many of the Savery engines and hundreds of the Newcomen engines were operating successfully, though inefficiently, in English and Scottish mines.",
            "In the early 1760s, a gifted young Scot named James Watt was drawn to a critical study of the steam engine. Watt was employed at the time by the University of Glasgow as a skilled crafts worker making scientific instruments. In 1763, Watt was called on to repair a Newcomen engine being used in a physics course. After a series of observations, Watt saw that the Newcomen’s waste of energy could be reduced by adding a separate condenser. This splendid invention, patented in 1769, greatly increased the efficiency of the steam engine. The steam engine of Watt and his followers was the technological advance that gave people, at least for a while, unlimited power and allowed the invention and use of all kinds of power equipment. ",
            "The steam engine was quickly put to use in several industries in Britain. It drained mines and made possible the production of ever more coal to feed steam engines elsewhere. The steam power plant began to replace waterpower in the cotton-spinning mills as well as other industries during the 1780s, contributing to a phenomenal rise in industrialization. The British iron industry was radically transformed. The use of powerful, steam-driven bellows in blast furnaces helped iron makers switch over rapidly from limited charcoal to unlimited coke (which is made from coal) in the smelting of pig iron (the process of refining impure iron) after 1770 in the 1780s, Henry Cort developed the puddling furnace, which allowed pig iron to be refined in turn with coke. Cort also developed heavy-duty, steam-powered rolling mills, which were capable of producing finished iron in every shape and form.",
            "The economic consequence of these technical innovations in steam power was a great boom in the British iron industry. In 1740 annual British iron production was only 17,000 tons, but by 1844, with the spread of coke smelting and the impact of Cort’s inventions, it had increased to 3,000,000 tons. This was a truly amazing expansion. Once scarce and expensive, iron became cheap, basic, and indispensable to the economy. "
          ]
        },
      },
      "question":{
        "q1":{
          "seq": 1,
          "title":"Paragraph 1 makes all of the following points about Islamic books EXCEPT",
          "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
          "choices":{
              "A":"Books were an important form of artistic expression",
              "B":"A wide variety of books with different styles and topics became available.",
              "C":"They were sold primarily near mosques.",
              "D":"Most books were intended for sale on the open market"
            },
            "answer":["A"]
          },
          "q2":{
            "seq": 2,
            "title":"The word “sponsored” in the passage is closest in meaning to ",
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"visited ",
                "B":"owned ",
                "C":"praised ",
                "D":"supported "
              },
            "answer":["A"]
          },
          "q3":{
            "seq": 3,
            "title":"The word “adjacent” in the passage is closest in meaning to ",
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          }
      }
    }
    return readdata
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

  getListeningTestData(){
     var readdata = {
      "qsteps":["p1","p2","q1","q2","q3","p2","p3"],
      "steps":["p1","p2",
              "p_Conversion1",
              "q1","q2","q3","q4","q5",
              "p_Lecture1",
              "q6","q7","q8","q9","q10",
              "p_Lecture2",
              "q11","q12","q13","q14","q15","q16","q17",
              "p6",
              "p_Conversion2",
              "q21","q22","q23","q24","q25",
              "p_Lecture3",
              "q26","q27","q28","q29","q30",
              "p_Lecture4",
              "q31","q32","q33","q34","q35","q36","q37",],
      "passage":{
        "p1":{
          "seq": 1,
          "title":"", 
          "img":'assets/img/listening1.png',
          "mp3":'',
          "contents": []
        },
        "p2":{
          "seq": 2,
          "title":"", 
          "img":'',
          "mp3":'assets/tpo34/tpo34_listening_direction1.mp3',
          "contents": [
           "Listening Section Direction \n........."
          ]
        },
        "p_Conversion1":{
          "seq": 3,
          "title":"Conversion 1", 
          "img":'assets/tpo34/tpo34_passage1_1.jpg',
          "mp3":'assets/tpo34/tpo34_listening_passage1_1.mp3',
          "contents": [ ]
        },
        "p_Lecture1":{
          "seq": 4,
          "title":"Lecture 1", 
          "img":'assets/tpo34/tpo34_passage1_2.jpg',
          "mp3":'assets/tpo34/tpo34_listening_passage1_2.mp3',
          "contents": [ ]
        },
        "p_Lecture2":{
          "seq": 5,
          "title":"Lecture 2", 
          "img":'assets/tpo34/tpo34_passage1_3.jpg',
          "mp3":'assets/tpo34/tpo34_listening_passage1_3.mp3',
          "contents": [ ]
        },
        "p6":{
          "seq": 6,
          "title":"", 
          "img":'',
          "mp3":'assets/tpo34/tpo34_listening_direction2.mp3',
          "contents": ["Listening Section Direction \n........." ]
        },
         "p_Conversion2":{
          "seq": 7,
          "title":"Conversion 2", 
          "img":'assets/tpo34/tpo34_passage2_1.jpg',
          "mp3":'assets/tpo34/tpo34_listening_passage2_1.mp3',
          "contents": [ ]
        },
        "p_Lecture3":{
          "seq": 8,
          "title":"Lecture 3", 
          "img":'assets/tpo34/tpo34_passage2_2.jpg',
          "mp3":'assets/tpo34/tpo34_listening_passage2_2.mp3',
          "contents": [ ]
        },
        "p_Lecture4":{
          "seq": 9,
          "title":"Lecture 4", 
          "img":'assets/tpo34/tpo34_passage2_3.jpg',
          "mp3":'assets/tpo34/tpo34_listening_passage2_3.mp3',
          "contents": [ ]
        },
      },
      "question":{
        "q1":{
          "seq": 1,
          "title":"Question 1 of 17",
          "mp3":'assets/tpo34/tpo34_listening_question1_1.mp3',
          "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
          "choices":{
              "A":"Books were an important form of artistic expression",
              "B":"A wide variety of books with different styles and topics became available.",
              "C":"They were sold primarily near mosques.",
              "D":"Most books were intended for sale on the open market"
            },
            "answer":["A"]
          },
          "q2":{
            "seq": 2,
            "title":"Question 2 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_2.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"visited ",
                "B":"owned ",
                "C":"praised ",
                "D":"supported "
              },
            "answer":["A"]
          },
          "q3":{
            "seq": 3,
             "title":"Question 3 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_3.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q4":{
            "seq": 4,
             "title":"Question 4 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_4.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q5":{
            "seq": 5,
             "title":"Question 5 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_5.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q6":{
            "seq": 6,
             "title":"Question 6 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_6.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q7":{
            "seq": 7,
             "title":"Question 7 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_7.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q8":{
            "seq": 8,
             "title":"Question 8 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_8.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q9":{
            "seq": 9,
             "title":"Question 9 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_9.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q10":{
            "seq": 10,
             "title":"Question 10 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_10.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q11":{
            "seq": 11,
             "title":"Question 11 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_11.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
            "q12":{
            "seq": 12,
             "title":"Question 12 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_12.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
            "q13":{
            "seq": 13,
             "title":"Question 13 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_13.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
            "q14":{
            "seq": 14,
             "title":"Question 14 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_14.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
            "q15":{
            "seq": 15,
             "title":"Question 15 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_15.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
            "q16":{
            "seq": 16,
             "title":"Question 16 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_16.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
            "q17":{
            "seq": 17,
             "title":"Question 17 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question1_17.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          
  
        "q21":{
          "seq": 21,
          "title":"Question 1 of 17",
          "mp3":'assets/tpo34/tpo34_listening_question2_1.mp3',
          "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
          "choices":{
              "A":"Books were an important form of artistic expression",
              "B":"A wide variety of books with different styles and topics became available.",
              "C":"They were sold primarily near mosques.",
              "D":"Most books were intended for sale on the open market"
            },
            "answer":["A"]
          },
          "q22":{
            "seq": 22,
            "title":"Question 2 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_2.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"visited ",
                "B":"owned ",
                "C":"praised ",
                "D":"supported "
              },
            "answer":["A"]
          },
          "q23":{
            "seq": 23,
             "title":"Question 3 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_3.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q24":{
            "seq": 24,
             "title":"Question 4 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_4.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q25":{
            "seq": 25,
             "title":"Question 5 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_5.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q26":{
            "seq": 26,
             "title":"Question 6 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_6.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q27":{
            "seq": 27,
             "title":"Question 7 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_7.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q28":{
            "seq": 28,
             "title":"Question 8 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_8.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q29":{
            "seq": 29,
             "title":"Question 9 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_9.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q30":{
            "seq": 30,
             "title":"Question 10 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_10.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
          "q31":{
            "seq": 31,
             "title":"Question 11 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_11.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
            "q32":{
            "seq": 32,
             "title":"Question 12 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_12.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
            "q33":{
            "seq": 33,
             "title":"Question 13 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_13.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
            "q34":{
            "seq": 34,
             "title":"Question 14 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_14.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
            "q35":{
            "seq": 35,
             "title":"Question 15 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_15.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
            "q36":{
            "seq": 36,
             "title":"Question 16 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_16.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          },
            "q37":{
            "seq": 37,
             "title":"Question 17 of 17",
            "mp3":'assets/tpo34/tpo34_listening_question2_17.mp3',
            "para":"Many plants – one or more species of at least 68 different families – can secrete nectar  even when they have no blossoms, because they bear extrafloral nectaries (structures that  produce nectar) on stems, leaves, leaf stems, or other structures. These plants usually occur where ants are abundant, most in the tropics but some in temperate areas. Among those of northeastern North America are various plums, cherries, roses, hawthorns, poplars, and oaks. Like floral nectar, extrafloral nectar consists mainly of water with a high content of dissolved sugars and, in some plants, small amounts of amino acids. The extrafloral nectaries of some plants are known to attract ants and other insects, but the evolutionary history of most plants with these nectaries is unknown. Nevertheless, most ecologists believe that all extrafloral nectaries attract insects that will defend the plant. ",
            "choices":{
                "A":"major  ",
                "B":"nearby  ",
                "C":"ancient  ",
                "D":"well-known "
              },
            "answer":["B"]
          }
          
      }
    }
    return readdata
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

export interface CreateReadingPaperParams{
  name: string;
  passage: string[];
}

export interface ReadingPaper {
  name: string;
  passage: string[];
  updatedAt: string;
}