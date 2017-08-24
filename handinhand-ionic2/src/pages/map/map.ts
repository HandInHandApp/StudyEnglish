import { ConferenceData } from './../../providers/conference-data';
import { Component, ViewChild } from '@angular/core';

// import { ConferenceData } from '../../providers/conference-data';

// import { Platform, Config } from 'ionic-angular';
import { DayPilot } from 'daypilot-pro-angular';
import { NavController } from 'ionic-angular';

import { MoveEventParams,CreateEventParams } from './../../providers/conference-data';

import {EventDetailPage} from "./create.component";
import {AutoCreatePage} from "./autocreate";


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



show="month";
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

  goToEventDetail(event: any,type: any) {
    this.navCtrl.push(EventDetailPage, {
      type: type,
      event: event
    });
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
      // this.create.show(args);
      this.goToEventDetail(args, "create" )
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
      // this.create.show(args);
      this.goToEventDetail(args, "create" )
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

  
  constructor(public navCtrl: NavController, private ds: ConferenceData) {

  }



  viewChange(){
    
    this.ds.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd())
     // .subscribe(resulte => console.log(resulte));
           .subscribe(resulte => 
              {
                this.events=resulte;
                console.log(this.events)
              }
           );
      // this.fbGetData()
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

