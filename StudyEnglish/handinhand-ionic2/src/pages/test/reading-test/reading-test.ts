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
  step=0;

  items=[
    //  {id:0,
    //       title:"",
    //       options:[]
    //  },
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




5.   



  testNmae : any[] = [
   
  ]

toplist: any[] = [
  
]
  constructor(public navParams: NavParams) {
    this.session = navParams.data.session;
    this.type = navParams.data.type;
  }

  gotoNext(){
      this.step =this.step +1;
  }
  gotoBack(){
      if(this.step >0){
        this.step =this.step -1;
      }
      
  }
}
