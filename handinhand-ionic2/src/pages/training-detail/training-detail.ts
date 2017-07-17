import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-training-detail',
  templateUrl: 'training-detail.html'
})
export class TrainingDetailPage {
  session: any;
  type: any;
  conferenceDate = '2047-05-17';
  totalscroe;
  readingscroe;
  writingscroe;
  speakingscroe;
  examinationPlanDate;
examinationPlanScroe;
examinationPlanScroeReason;

    brightness: number = 20;
  contrast: number = 0;
  warmth: number = 1300;
  structure: any = { lower: 33, upper: 60 };
  text: number = 0;

writing_trainings=[];
listening_trainings=[];
speaking_trainings=[];


reading_trainings=[{
  name:"句子训练",
  options: [
    {name:"简单句",link: ""},
    {name:"复杂句",link: ""},
    {name:"复合句",link: ""}
  ]
},{
  name:"逻辑训练",
  options: [
    {name:"逻辑",link: ""}
  ]
},{
  name:"段落训练",
  options: [
    {name:"段落",link: ""}
  ]
},{
  name:"题型训练",
  options: [
    {name:"题型",link: ""}
  ]
}
]

trainings=[
{name:"阅读训练",options:this.reading_trainings},
{name:"听力训练",options:this.listening_trainings},
{name:"口语训练",options:this.speaking_trainings},
{name:"写作训练",options:this.writing_trainings}
]

  sessions=[{
    id:1,
    sentence:"This came about from two developments.",
    questions:[{
      index:1,
      question:"(1）请选择该句属于哪种句型：",
        options:[{
          name:"A 简单句"
        },{
          name:"B 复杂句"
        },{
          name:"C 简单句"}]
      },
      {
      index:2,
       question:"（2）请选择该句主语：",
       options:[{
          name:"A 简单句"
        },{
          name:"B 复杂句"
        },{
          name:"C 简单句"}]
        
      },
      {
      index:3,
        question:"(3）请选择该句谓语：",
        options:[{
          name:"A 简单句"
        },{
          name:"B 复杂句"
        },{
          name:"C 简单句"}]
      },
      {
      index:4,
       question:"（4）请在句中词组",
      options:[{
          name:"A 简单句"
        },{
          name:"B 复杂句"
        },{
          name:"C 简单句"}]
        
      },
    ]
  }]

  constructor(public navParams: NavParams) {
    this.session = navParams.data.session;
    this.type = navParams.data.type;
  }
}
