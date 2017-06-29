import { Component } from '@angular/core';

@Component({
  templateUrl: 'alltest.html'
})

export class AllTestPage{
  paper: any = [{
    "title":"Islamic Art and the Book",
    "content": "The arts of the Islamic book, such as calligraphy and decorative drawing,",
    "questions":[{
      "question":"1,Paragraph 1 makes all of the following points about Islamic books EXCEPT",
      "choices":{
        "A":"Books were an important form of artistic expression",
        "B":"A wide variety of books with different styles and topics became available.",
        "C":"They were sold primarily near mosques.",
        "D":"Most books were intended for sale on the open market"
      },
      "answer":["A"]
    },{
      "question":"2,The word “sponsored” in the passage is closest in meaning to",
      "choices":{
        "A":"visited ",
        "B":"owned ",
        "C":"praised ",
        "D":"supported "
      },
       "answer":["B"]
    }
    ]}];
}