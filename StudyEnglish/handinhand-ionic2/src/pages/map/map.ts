import { ConferenceData } from './../../providers/conference-data';
import { Component, ViewChild, ElementRef } from '@angular/core';

// import { ConferenceData } from '../../providers/conference-data';

import { Platform, Config } from 'ionic-angular';
import { DayPilot } from 'daypilot-pro-angular';
import { NavController } from 'ionic-angular';

import { MoveEventParams,CreateEventParams } from './../../providers/conference-data';

import {EventDetailPage} from "./create.component";

declare var google: any;

declare var firebase: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {


  name: string;
  last: number = 1;

  events: any[] = [ ];





// // required for copy'n'paste functionality
// var copied = null;

// /* Event editing helpers - modal dialog */
//     function dialog() {
// 	    var modal = new DayPilot.Modal();
//         modal.onClosed = function(args) { 
//             if(args.result == "OK") { 
//                 dpc1.commandCallBack('refresh'); 
//             }
//             dpc1.clearSelection();
//         };
//         return modal;
//     }

// 	function create(start, end, resource) {
// 	    var modal = dialog();
// 	    modal.showUrl("New.aspx?start=" + start.toStringSortable() + "&end=" + end.toStringSortable() + "&r=" + resource);
// 	}
	
// 	function edit(e) {
// 	    var modal = dialog();
// 	    modal.showUrl("Edit.aspx?id=" + e.value());
// 	}
	
// 	function afterRender(isCallBack) {
// 	    dpn.visibleRangeChangedCallBack(); // update free/busy after adding/changing/deleting events in the calendar

//         if (!isCallBack) {
// 	        bubble.onLoad = function(args) {
// 	            args.html = "test";
// 	        }
// 	    }
// 	}



@ViewChild('calendar') calendar: DayPilot.Angular.Calendar;
@ViewChild('navigator') navigator: DayPilot.Angular.Navigator;
// @ViewChild("create") create: CreateComponent;


  goToEventDetail(event: any,type: any) {
    this.navCtrl.push(EventDetailPage, {
      type: type,
      event: event
    });
  }

  navigatorConfig = {
    selectMode: "week",
     showMonths :  2,
      showWeekNumbers :  true,
      skipMonths :  2,
  
  };

  calendarConfig = {
    startDate: DayPilot.Date.today(),
    viewType: "Week",
    eventDeleteHandling: "Update",
    dayBeginsHour : 5,
    dayEndsHour : 24,
    onEventDeleted: args => {
      this.ds.deleteEvent(args.e.data.objectId).subscribe(result => this.calendar.control.message("Deleted"));
    },
    onEventMoved: args => {
      let params : MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };
      this.ds.moveEvent(params).subscribe(result => this.calendar.control.message("Moved"));
    },
    onEventResized: args => {
      let params : MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };

      this.ds.moveEvent(params).subscribe(result => this.calendar.control.message("Resized"));
    },
    onTimeRangeSelected: args => {
      // this.create.show(args);
      this.goToEventDetail(args, "create" )
    }
  };

  deleteEvent(evet){
    
     this.ds.deleteEvent(evet.objectId).subscribe(result => this.calendar.control.message("Deleted"));
  }

  
//  modal = new DayPilot.Angular.Modal();
  
//         this.modal.onClosed = function(args) { 
//             if(args.result == "OK") { 
//                 dpc1.commandCallBack('refresh'); 
//             }
//             dpc1.clearSelection();
//         };

  // @ViewChild('calendar') calendar: DayPilot.Angular.Calendar;


//   calendarconfig: any = {
//     dayBeginsHour : 0,
//     dayEndsHour : 0,
//     days : 7,
//     businessBeginsHour : 6,
//     businessEndsHour: 24,
//     scrollLabelsVisible : true,

//     shadow : "Fill",
    
//     showToolTip : true,
//     showAllDayEvents : true,
//     showAllDayEventStartEnd : true,
//     showCurrentTime : true,
//     showHeader : true,
//     showHours : true,
//     // sortDirections : [],
//     startDate : new DayPilot.Date(),
//     // timeFormat : "Clock12Hours",
//     timeFormat: "Clock24Hours",
//     timeHeaderCellDuration : 60,

//     useEventBoxes : "Always",
//     useEventSelectionBars : false,
//     viewType : "Week",
//     visible : true,
//     weekStarts : 0,
//     widthUnit : "Percentage",
//     cornerHTML : null,
//     cornerBackColor : null,
//     //  contextMenu : ContentPlaceHolder1_DayPilotMenu1,
//     //  contextMenuSelection : cmSelection,
//     //  bubble : bubble,
//     //  columnBubble : bubble,
//     eventTapAndHoldHandling : "Move",
//     timeRangeTapAndHoldHandling : "Select",
//     afterEventRender : function(e, div) {},
//     //  afterRender : function(data, isCallBack) {afterRender(isCallBack),},
//     eventClickHandling : "JavaScript",
//     //  onEventClick : function(e) {edit(e),},
//     eventDoubleClickHandling : "PostBack",
//     //  onEventDoubleClick : function(e) {alert(e.value()),},
//     eventHoverHandling : "Bubble",
//     eventSelectHandling : "JavaScript",
//         // scale: "Day",
//         // startDate: new DayPilot.Date(),
//         // days: new DayPilot.Date().daysInMonth(),
//         timeHeaders: [
//           { groupBy: "Month" },
//           { groupBy: "Day", format: "d" }
//         ],
//         // cellWidthSpec: "Auto",
//         // resources: [
//         //   { name: "频道静态标签", id: "R1" },
//         //   { name: "频道静态标签", id: "R2" },
//         //   { name: "首页下拉", id: "R3" },
//         //    { name: "第二屏通栏", id: "R4" },
//         //    { name: "升级弹窗", id: "R5" },
//         //    { name: "第二屏通栏", id: "R6" },
//         // ],
//     onTimeRangeSelected: args => {
//       alert("start: " + args.start);
//     },
//     onEventClicked: args => {
//       alert("clicked: " + args.e.text());
//     },
//     onEventMoved: args => {
//       this.calendar.control.message("Moved");
//     },
//     onEventResized: args => {
//       this.calendar.control.message("Moved");
//     }
//   };


  
//   navigatorconfig : any ={

//  cellHeight :  20,
//  cellWidth :  20,
//  command :  'navigate',
//  cssOnly :  true,
//  theme :  '',
//  dayHeaderHeight :  20,
//  items :  {"2017-06-30T00:00:00":1,
//           "2017-06-19T00:00:00":1,
//           "2017-06-25T00:00:00":1,
//           "2017-06-22T00:00:00":1,
//           "2017-06-16T00:00:00":1,
//           "2017-07-09T00:00:00":1,
//           "2017-06-23T00:00:00":1,
//           "2017-06-24T00:00:00":1},
//  cells :  {},
//  locale :  'zh-cn',
//  month :  6,
//  orientation :  'Vertical',
//  rowsPerMonth :  'Auto',
//  selectMode :  'week',
//  selectionStart :  new DayPilot.Date(),
// //  selectionEnd :  new DayPilot.Date('2017-06-24T00:00:00'),
//  showMonths :  3,
//  showWeekNumbers :  true,
//  skipMonths :  3,
//  titleHeight :  20,
// //  uniqueID :  'ctl00$ContentPlaceHolder1$DayPilotNavigator1',
//  visible :  true,
//  weekStarts :  0,
//  weekNumberAlgorithm :  'Auto',
// //  year :  2017,
// callbackError : function(result, context) { 
//   alert('An exception was thrown in the server-side event handler:\n\n' + result.substring(result.indexOf('$$$')+3)); 
// },
// timeRangeSelectedHandling :'Bind',
// onTimeRangeSelected : function(args) {
//   this.calendar.scrollTo(args.day)
//   // this.calendarconfig.startDate =  args.day;
//   alert(args.day + '\n' );
//   //  startDate = args.day;
//   // alert(start + '\n' + end);
//   //  this.calendarconfig.startDate = args.day;
// },
// visibleRangeChangedHandling : 'CallBack',
// onVisibleRangeChanged : function(start, end) {
//   alert(start+ '\n' + end);
// },
  
// };

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
  // ionViewDidLoad() {

  //     this.confData.getMap().subscribe((mapData: any) => {
  //       let mapEle = this.mapElement.nativeElement;

  //       let map = new google.maps.Map(mapEle, {
  //         center: mapData.find((d: any) => d.center),
  //         zoom: 16
  //       });

  //       mapData.forEach((markerData: any) => {
  //         let infoWindow = new google.maps.InfoWindow({
  //           content: `<h5>${markerData.name}</h5>`
  //         });

  //         let marker = new google.maps.Marker({
  //           position: markerData,
  //           map: map,
  //           title: markerData.name
  //         });

  //         marker.addListener('click', () => {
  //           infoWindow.open(map, marker);
  //         });
  //       });

  //       google.maps.event.addListenerOnce(map, 'idle', () => {
  //         mapEle.classList.add('show-map');
  //       });

  //     });

  // }
}

