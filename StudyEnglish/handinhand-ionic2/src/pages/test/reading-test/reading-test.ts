import { Component } from '@angular/core';


import { NavParams,NavController } from 'ionic-angular';


import { ConferenceData } from '../../../providers/conference-data';

@Component({
  selector: 'page-reading-page',
  templateUrl: 'reading-test.html'
})
export class ReadingTestPage {
  session: any;
  type: any;
  passages: any;
  first_step: any;
  last_step: any;
  stepindex=0;
  step: any;
  steps: any[];
  last_stepindex: any;
  total_question: number = 0;
  total_passage: number = 0;

  items=[
     {    id:1,
          title:"1.  Paragraph 1 makes all of the following points about Islamic books EXCEPT: ",
          options:[
              "A)  Books were an important form of artistic expression. ", 
              "B)  A wide variety of books with different styles and topics became available.  ",
              "C)  They were sold primarily near mosques. ",
              "D)  Most books were intended for sale on the open market. "
              ]
      },
      {
        
          id:2,
          title:"2.  The word “sponsored” in the passage is closest in meaning to ",
          options:[
              "A)  visited", 
              "B)  owned ",
              "C)  praised",
              "D)  supported"
              ]
      },
     
      {
          id:3,
          title:"3.  The word “adjacent” in the passage is closest in meaning to ",
          options:[
              "A)  major", 
              "B)  nearby ",
              "C)  ancient",
              "D)  well-known"
              ]
      } ,{
          id:4,
          title:"4. According to paragraph 1, before A.D. 900, books in the Islamic world  ",
          options:[
              "A)  included a wide range of subjects ", 
              "B)  did not contain any calligraphy or decoration  ",
              "C)  used rounded scripts ",
              "D)  were usually written on parchment"
              ]
      }, {
          id:5,
          title:"5. In paragraph 1, why does the author mention the fact that the mosque in Marrakech, Morocco, is known as the Booksellers’ Mosque",
          options:[
            "A)  To cast doubt on the importance of souks in making books available to common people", 
            "B)  To provide an example of a place where books were made at the order of a particular prince", 
            "C)  To emphasize how influential and well known the book markets were ",
            "D)  To demonstrate the need for religious texts in Islamic lands "
          ]
      } 
  ]


  testNmae : any[] = [
   
  ]

toplist: any[] = [
  
]
  constructor(public navParams: NavParams, public confData: ConferenceData) {
    this.session = navParams.data.session;
    this.type = navParams.data.type;
    this.passages = confData.getReadingTestData();
    this.steps = this.passages["steps"];
    this.first_step =  this.steps[this.stepindex];
    this.step = this.first_step;
    this.last_step =  this.steps[this.passages["steps"].length-1];
    this.last_stepindex = this.passages["steps"].length-1;
    this.get_total_graph(this.steps);
  }

  private get_total_graph(steps: any[]){
    for(let step of steps){
      if(step.indexOf("p")!=-1){
        this.total_passage=this.total_passage+1
      }else{
        this.total_question=this.total_question+1
      }
    }
  }
  gotoNext(){
      if(this.stepindex != this.last_stepindex){
        this.stepindex = this.stepindex+1
        this.step =  this.steps[this.stepindex]
      }
  }
  gotoBack(){
      if( this.stepindex != 0){
        this.stepindex = this.stepindex-1
        this.step =  this.steps[this.stepindex]
      }
      
  }
}
