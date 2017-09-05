import { Component } from '@angular/core';
import { NavController, AlertController, ViewController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../../providers/conference-data';
import { ReadingTestPage } from '../reading-test/reading-test';
import { WritingTestPage } from '../writing-test/writing-test';
import { SpeakingTestPage } from '../speaking-test/speaking-test';
import { ListeningTestPage } from '../listening-test/listening-test';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'test-report',
  templateUrl: 'test-report.html'
})
export class TestReportPage {
  paperType: string;//reading, listening, speaking, writing
  curTPO: any;
  useranswer: any = {
    "reading": {
      "q1": "", "q2": "", "q3": "", "q4": "", "q5": "", "q6": "", "q7": "", "q8": "", "q9": "", "q10": "", "q11": "", "q12": "", "q13": "", "q14": "",
      "q15": "", "q16": "", "q17": "", "q18": "", "q19": "", "q20": "", "q21": "", "q22": "", "q23": "", "q24": "", "q25": "", "q26": "", "q27": "", "q28": "",
      "q29": "", "q30": "", "q31": "", "q32": "", "q33": "", "q34": "", "q35": "", "q36": "", "q37": "", "q38": "", "q39": "", "q40": "", "q41": "", "q42": ""
    },
    "listening": {
      "q1": "", "q2": "", "q3": "", "q4": "", "q5": "", "q6": "", "q7": "", "q8": "", "q9": "", "q10": "", "q11": "", "q12": "", "q13": "",
      "q14": "", "q15": "", "q16": "", "q17": "", "q18": "", "q19": "", "q20": "", "q21": "", "q22": "", "q23": "", "q24": "", "q25": "",
      "q26": "", "q27": "", "q28": "", "q29": "", "q30": "", "q31": "", "q32": "", "q33": "", "q34": ""
    },
    "speaking": {"q1":"","q2":""},
    "writing": {
      "p_section1_1": "",
      "p_section2_1": ""
    },
  }
  readingpaper: any;
  speakingpaper: any;
  writingpaper: any;
  listeningpaper: any;

  readingUrl: string;
  listeningUrl: string;
  speakingUrl: string;
  writingUrl: string;

  steps: any;
  score: number;
  reading_correct_rate: any;
  correct_rate: any;
  headername: string;



  title: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public confData: ConferenceData,
    public userData: UserData
  ) {
    this.curTPO = this.navParams.get("curTPO")
    this.paperType = this.navParams.get("paperType")
    this.title = this.navParams.get("title")
    this.headername = this.navParams.get("headername")
    for (let i = 0; i < this.curTPO["items"].length; i++) {
      if (this.curTPO["items"][i]["pagetype"] == "Reading") {
        this.readingUrl = this.curTPO["items"][i]["url"];
      }
      if (this.curTPO["items"][i]["pagetype"] == "Listening") {
        this.listeningUrl = this.curTPO["items"][i]["url"];
      }
      if (this.curTPO["items"][i]["pagetype"] == "Speaking") {
        this.speakingUrl = this.curTPO["items"][i]["url"];
      }
      if (this.curTPO["items"][i]["pagetype"] == "Writing") {
        this.writingUrl = this.curTPO["items"][i]["url"];
      }
    }
    confData.getReadingTestData(this.readingUrl).subscribe(
      resulte => {
        console.log(resulte)
        this.readingpaper = resulte
        this.steps = this.readingpaper["steps"]
        this.userData.getUserReadingAnswer().then((value) => {
          this.useranswer["reading"] = value
          let correct_answer = 0;
          let total_count = 0;
          for (let step in this.useranswer["reading"]) {
            total_count = total_count + 1;

            if (this.readingpaper.questions[step].type == "drag-choice") {
              if (this.useranswer["reading"][step] != "" && this.readingpaper.questions[step].answer.join("") == this.useranswer["reading"][step].join("")) {
                correct_answer = correct_answer + 1;
              }
            } else {
              if (this.readingpaper.questions[step].answer.join("") == this.useranswer["reading"][step]) {
                correct_answer = correct_answer + 1;
              }
            }
          }
          this.reading_correct_rate = correct_answer + "/" + total_count;
        });
      }
    );
    confData.getTestData(this.writingUrl).subscribe(
      resulte => {
        console.log(resulte)
        this.writingpaper = resulte
        this.steps = this.writingpaper["steps"];
      }
    );
    
    /**
     * Speaking  
     */
    confData.getTestData(this.speakingUrl).subscribe(
      resulte => {
        console.log(resulte)
        this.speakingpaper= resulte
        this.steps = this.speakingpaper["steps"];
      }
    );
    /**
     * listening
     */
    confData.getListeningTestData(this.listeningUrl).subscribe(
      resulte => {
        console.log("resulte:"+resulte);
        this.listeningpaper = resulte;
        this.steps = this.listeningpaper["steps"];

        this.userData.getUserListeningAnswer().then((value) => {
          this.useranswer["listening"] = value
          let correct_answer = 0;
          let total_count = 0;

          for (let step in this.useranswer["listening"]) {
            total_count++;
            if ( this.listeningpaper.question[step].type == "multi-choice") {
              if (this.useranswer["listening"][step] != "" && this.listeningpaper.question[step].answer.join("") == this.useranswer["listening"][step]) {
                correct_answer = correct_answer + 1;
              }
            } else {
              if (this.listeningpaper.question[step].answer.join("") == this.useranswer["listening"][step]) {
                correct_answer = correct_answer + 1;
              }
            }
          }

          this.correct_rate = correct_answer + "/" + total_count;
        });
      }
    );
  }

  goBack() {
    this.navCtrl.pop()
  }

  gotoQuestion(step: string) {
    let paperTypes = {
      "reading": {
        "page": ReadingTestPage,
        "tpourl": this.readingUrl
      },
      "writing": {
        "page": WritingTestPage,
        "tpourl": this.writingUrl
      },
      "speaking": {
        "page": SpeakingTestPage,
        "tpourl": this.speakingUrl
      },
      "listening": {
        "page": ListeningTestPage,
        "tpourl": this.listeningUrl
      }
    };
    let page = paperTypes[this.paperType];
    console.log("page:"+page);
    this.navCtrl.push(paperTypes[this.paperType]["page"], {
      curTPO: this.curTPO,
      headername: this.headername,
      curstep: step,
      title: this.title,
      url: paperTypes[this.paperType]["tpourl"]
    })
  }
}
