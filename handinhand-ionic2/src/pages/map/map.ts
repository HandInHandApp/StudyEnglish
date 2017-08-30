import { ConferenceData } from './../../providers/conference-data';
import { Component, ViewChild } from '@angular/core';

// import { ConferenceData } from '../../providers/conference-data';

// import { Platform, Config } from 'ionic-angular';
import { DayPilot } from 'daypilot-pro-angular';
import { NavController } from 'ionic-angular';

import { MoveEventParams,CreateEventParams } from './../../providers/conference-data';

import {EventDetailPage} from "./create.component";
import {AutoCreatePage} from "./autocreate";
import { UserData } from '../../providers/user-data';


// declare var google: any;

// declare var firebase: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {


  name: string;
  last: number = 1;

  events: any[] = [ ];
  events2: any[] = [ ];


show="month";
uid;
@ViewChild('scheduler') scheduler: DayPilot.Angular.Scheduler;

@ViewChild('calendar') calendar: DayPilot.Angular.Calendar;
@ViewChild('month') month: DayPilot.Angular.Month;
@ViewChild('navigator') navigator: DayPilot.Angular.Navigator;
// @ViewChild("create") create: CreateComponent;

autoCreate(event: any,type: any) {
  this.navCtrl.push(AutoCreatePage, {
    type: type,
    event: event
  });
}

  // goToEventDetail(event: any,type: any) {
  //   this.navCtrl.push(EventDetailPage, {
  //     type: type,
  //     event: event
  //   });
  // }

  datetimeFormate(date, time){
    var datatime;
    // if(typeof(time) == "undefined"){
    //   time = ""
    // }
    datatime = new DayPilot.Date(date )

    if(time.split(":").length == 3){
           datatime = new DayPilot.Date(date + "T" + time)
    }else if(time.split(":").length == 2){
           datatime = new DayPilot.Date(date + "T" + time +":00")
    }else{
           datatime = new DayPilot.Date(date + "T" + "00:00:00")
    }
          return datatime
  }

  navigatorConfig1 = {
    selectMode: "week",
    showMonths :  3,
    showWeekNumbers :  true,
    skipMonths :  3,
    startDate: new DayPilot.Date(),

  };
  navigatorConfig2 = {
    selectMode: "month",
    showMonths :  3,
    showWeekNumbers :  true,
    skipMonths :  3,
    startDate: new DayPilot.Date(),

  };

  monthConfig = {
    startDate: DayPilot.Date.today(),
    viewType: "Month",
    eventDeleteHandling: "Update",
   

    onEventClicked: args => {
      console.log("onEventClicked: " + args.e.text())
      let id =args.e.data.id;
      for (var i = 0; i < this.events.length; i ++) {
        console.log("find id"+id+" now: "+this.events[i].id)
        if(id ==this.events[i].id){
     
            var item =this.events[i];
            item.start = item.start.value.split("T")[0],
            item.end = item.end.value.split("T")[0],
            this.goToEventDetail(item,"update")
            break;
        }
      }
    },

    onEventDeleted: args => {
      this.ds.deleteEvent(args.e.data.objectId).subscribe(result => {
        console.log(result);
        this.calendar.control.message("Deleted")
      });
    },
    onEventMoved: args => {
      let params : MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };
      this.ds.moveEvent(params).subscribe(result => {
        console.log(result);
        this.calendar.control.message("Moved")
      });
    },
    onEventResized: args => {
      let params : MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };

      this.ds.moveEvent(params).subscribe(result => {
        console.log(result);
        this.calendar.control.message("Resized")});
    },
    onTimeRangeSelected: args => {

      // this.goToEventDetail(args, "create" )
      // this.month.control.clearSelection();
      
      var e = {
              start:args.start.value.split("T")[0],
              end: args.end.value.split("T")[0],
              starttime:args.start.value.split("T")[1],
              endtime: args.end.value.split("T")[1],
              // id: DayPilot.guid(),
              // resource: args.resource,
              // text: name,
              // bubbleHtml: "",
      };
      // this.events.push(e)
      // this.scheduler.control.message("Created");
      this.goToEventDetail(e,"create")
    }
  };

  calendarConfig = {
    startDate: DayPilot.Date.today(),
    // scrollbar:"hidden",
    heightSpec: "Full",
    viewType: "Week",
    eventDeleteHandling: "Update",
    dayBeginsHour : 6,
    dayEndsHour : 24,


    onEventClicked: args => {
      console.log("onEventClicked: " + args.e.text())
      let id =args.e.data.id;
      for (var i = 0; i < this.events.length; i ++) {

        console.log("find id"+id+" now: "+this.events[i].id)
        if(id ==this.events[i].id){
     
            var item =this.events[i];
            item.start = item.start.value.split("T")[0],
            item.end = item.end.value.split("T")[0],
            this.goToEventDetail(item,"update")
            break;

        }
      }
    },

    onEventDeleted: args => {
      this.ds.deleteEvent(args.e.data.objectId).subscribe(result => {
        console.log(result);
        this.calendar.control.message("Deleted")
      });
    },
    onEventMoved: args => {
      let params : MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };
      this.ds.moveEvent(params).subscribe(result => {
        console.log(result);
        this.calendar.control.message("Moved")
      });
    },
    onEventResized: args => {
      let params : MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };

      this.ds.moveEvent(params).subscribe(result => {
        console.log(result);
        this.calendar.control.message("Resized")});
    },
    onTimeRangeSelected: args => {
     
      // this.goToEventDetail(args, "create" )
       
              // this.calendar.control.clearSelection();
              
              var e = {
                      start:args.start.value.split("T")[0],
                      end: args.end.value.split("T")[0],
                      starttime:args.start.value.split("T")[1],
                      endtime: args.end.value.split("T")[1],
                      bubbleHtml: "",
              };
        //       var e = {
        //         start:args.start,
        //         end: args.end,
        //         starttime:args.start.value.split("T")[1],
        //         endtime: args.end.value.split("T")[1],
        //         bubbleHtml: "",
        // };
        //       this.events.push(e)
              // this.scheduler.control.message("Created");
              this.goToEventDetail(e,"create")
    },
    onBeforeCellRender:  args => {
      var now = new DayPilot.Date().getTime();
      if (args.cell.start.getTime() <= now && now < args.cell.end.getTime()) {
          args.cell.backColor = "red";
      }
      if (args.cell.start.getDatePart().getTime() === new DayPilot.Date().getDatePart().getTime()) {
        args.cell.backColor = "silver";
      }
    }
  };

  deleteEvent(evet){
    
     this.ds.deleteEvent(evet.objectId).subscribe(result => {
      console.log(result); 
      this.calendar.control.message("Deleted")});
  }

  
  constructor(public navCtrl: NavController, 
    private ds: ConferenceData,
    private userdata: UserData) {

      this.uid = userdata.getUserId()
  }

  goToEventDetail(event: any,type:any) {
    // go to the session detail page
    // and pass in the session data
    if( typeof( event.start) == "object"){
        event.start = event.start.value.split("T")[0]
    }
    if(typeof( event.end) == "object"){
        event.end = event.end.value.split("T")[0]
    }
    this.navCtrl.push(EventDetailPage, {
      event: event,
      type:type
    });
  }

  getUserEvents(){
  // this.events =[]
  this.ds.getEventsUser(this.uid)    
  .then( (results: any) => {
      console.log(results)
      var tmp =results;
      this.events = []

      for (var i = 0; i <tmp.length; i ++) {
          var x =tmp[i].attributes
          x.objectId=tmp[i].id
          var ev=x;
          x.start = this.datetimeFormate(ev.start, ev.starttime);
          x.end   = this.datetimeFormate(ev.end,   ev.endtime);
          this.events.push(x);
      };
      
    }, function (error) {
      console.log(error)
    });
  

  // this.ds.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd(), this.uid)
  //        .subscribe(resulte => 
  //           {
  //             this.events=resulte;
  //             console.log(this.events)
          
  //             for (var i = 0; i < this.events.length; i ++) {
                
  //                 var ev=this.events[i];
  //                 // this.events[i].text=this.setEventTitle(this.events[i]);
  //                 this.events[i].start = this.datetimeFormate(ev.start, ev.starttime);
  //                 this.events[i].end   = this.datetimeFormate(ev.end,   ev.endtime);
  //                 // this.events[i].bubbleHtml=this.setbubbleHtml(this.events[i]);
  //             };
  //           }
  //        );
  
  }

  viewChange(){
    if(typeof(this.uid) == "undefined" )
       this.uid = this.userdata.getUserId()
    if(typeof(this.uid) == "undefined" || this.uid == null || this.uid == ""){
      // return 
      this.userdata.getAllLocalDatas();
      this.userdata.getuserid().then( id => {
        this.uid = id;
        this.getUserEvents()
      })

    }else{
      this.getUserEvents()
    }
    
  }


  add() {
        var ev :CreateEventParams ={
            id: 10,
            start: "2017-06-09",
            end: "2017-06-19",
            text: "test2345",
            objectId: ""
        };
        this.last += 1;
        this.events.push(ev);
        this.calendar.control.message("Added");
        console.log("add event"+ ev)

  }

  goToDynamic() {
    // this.navCtrl.push(DpPage);
  }
  


  ionViewDidEnter() {
    this.viewChange()

  }
  showChange(status){
    this.show=status
  }
  
}

