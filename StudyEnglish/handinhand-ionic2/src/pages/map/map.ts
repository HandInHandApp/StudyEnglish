import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform, Config } from 'ionic-angular';
import { DayPilot } from 'daypilot-pro-angular';
import { NavController } from 'ionic-angular';
declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {


/* DayPilotPro: DayPilot, Version=8.3.3601.1, Culture=neutral, PublicKeyToken=426941954f05e7fe */
// function dpc1_Init() {
// var v = new DayPilot.Calendar('ContentPlaceHolder1_DayPilotCalendar1');
// v.allDayEnd = "DateTime";
// v.api = 1;
// v.allDayEventBorderColor = "#000000";
// v.allDayEventFontFamily = "Tahoma";
// v.allDayEventFontSize = "8pt";
// v.allDayEventFontColor = "#000000";
// v.allDayEventHeight = 25;
// v.allowEventOverlap = true;
// v.allowMultiSelect = true;
// v.autoRefreshCommand = "refresh";
// v.autoRefreshEnabled = false;
// v.autoRefreshInterval = 60;
// v.autoRefreshMaxCount = 20;
// v.borderColor = "#000000";
// v.businessBeginsHour = 9;
// v.businessEndsHour = 18;
// v.clientName = "dpc1";
// v.cellBackColor = "#FFFFD5";
// v.cellBackColorNonBusiness = "#FFF4BC";
// v.cellBorderColor = "#000000";
// v.cellHeight = 25;
// v.cellDuration = 30;
// v.columnMarginRight = 5;
// v.columnWidthSpec = "Auto";
// v.columnWidth = 200;
// v.crosshairColor = "Gray";
// v.crosshairOpacity = 20;
// v.crosshairType = "Header";
// v.theme = "calendar_default";
// v.cssOnly = true;
// v.deleteImageUrl = "\/demo\/WebResource.axd?d=RbtFcuLpgqOK9li2gn-FvcKXDxKDfyLWsrk3KQ8JdyG3PPlY852sRytHnrp6S6Hqe99JMNxFLmWKFaXzeBFhmQXWNz-gCqydVIwcz4T6W-6jXxwnd6OQctGIzYDPiWer4kc9AZVgSAlJcRkczpOSew2&t=636282933210105491";
// v.scrollDownUrl = "\/demo\/WebResource.axd?d=173aOiDza9CeL87MXE2SZkfAan8HQOvyUPsOrJenVEfWa3_hy2VhOaEox4Zo8UeeH_6xz2eemJjT0fBTFvWxbzZhaY0epC-7ULkxtvKWoZ5KEbwWgWyt2415DuhkKOTZtcgKQNRe1KEhaZQsEwU9CA2&t=636282933210105491";
// v.scrollUpUrl = "\/demo\/WebResource.axd?d=kqh3lcRXNB2Mz6I3gfuJXReYO8UXhNXd6Wy6_3Y4NoW3-xxoZm5aPCUjCSj_rC0Q_cvGmuCLyRM_HFejuhuqpPZzlV9FGo3J1etcVmRyO_UBM-bRpXBk5SYTLBaCy9894v5w7Ox80KIzvb1q4D4ehw2&t=636282933210105491";
// v.dayBeginsHour = 0;
// v.dayEndsHour = 0;
// v.days = 7;
// v.doubleClickTimeout = 300;
// v.durationBarColor = "Blue";
// v.durationBarVisible = true;
// v.durationBarWidth = 5;
// v.durationBarImageUrl = null;
// v.eventArrangement = "Full";
// v.eventBackColor = "#FFFFFF";
// v.eventBorderColor = "#000000";
// v.eventFontFamily = "Tahoma";
// v.eventFontSize = "8pt";
// v.eventFontColor = "#000000";
// v.eventHeaderFontSize = "8pt";
// v.eventHeaderFontColor = "White";
// v.eventHeaderHeight = 14;
// v.eventHeaderVisible = false;
// v.eventSelectColor = "Red";
// v.headerFontSize = "10pt";
// v.headerFontFamily = "Tahoma";
// v.headerFontColor = "#000000";
// v.headerHeight = 20;
// v.headerHeightAutoFit = false;
// v.headerLevels = 1;
// v.height = 300;
// v.heightSpec = "BusinessHours";
// v.hideFreeCells = false;
// v.hourHalfBorderColor = "#F3E4B1";
// v.hourBorderColor = "#EAD098";
// v.hourFontColor = "#000000";
// v.hourFontFamily = "Tahoma";
// v.hourFontSize = "16pt";
// v.hourNameBackColor = "#ECE9D8";
// v.hourNameBorderColor = "#ACA899";
// v.hourWidth = 60;
// v.initScrollPos = "450";
// v.loadingLabelText = "Loading...";
// v.loadingLabelVisible = true;
// v.loadingLabelFontSize = "10pt";
// v.loadingLabelFontFamily = "Tahoma";
// v.loadingLabelFontColor = "#FFFFFF";
// v.loadingLabelBackColor = "Red";
// v.messageHTML = "Welcome!";
// v.messageHideAfter = 5000;
// v.moveBy = "Full";
// v.notifyCommit = "Immediate";
// v.numberFormat = "0.00";
// v.roundedCorners = false;
// v.rtl = false;
// v.scrollLabelsVisible = true;
// v.selectedColor = "#316AC5";
// v.shadow = "Fill";
// v.showToolTip = true;
// v.showAllDayEvents = true;
// v.showAllDayEventStartEnd = true;
// v.showCurrentTime = true;
// v.showHeader = true;
// v.showHours = true;
// v.sortDirections = [];
// v.startDate = "2017-06-18T00:00:00";
// v.timeFormat = "Clock12Hours";
// v.timeHeaderCellDuration = 60;
// v.uniqueID = "ctl00$ContentPlaceHolder1$DayPilotCalendar1";
// v.useEventBoxes = "Always";
// v.useEventSelectionBars = false;
// v.viewType = "Week";
// v.visible = true;
// v.weekStarts = 0;
// v.widthUnit = "Percentage";
// v.cornerHTML = null;
// v.cornerBackColor = null;
// v.contextMenu = ContentPlaceHolder1_DayPilotMenu1;
// v.contextMenuSelection = cmSelection;
// v.bubble = bubble;
// v.columnBubble = bubble;
// v.eventTapAndHoldHandling = "Move";
// v.timeRangeTapAndHoldHandling = "Select";
// v.afterEventRender = function(e, div) {};
// v.afterRender = function(data, isCallBack) {afterRender(isCallBack);};
// v.eventClickHandling = "JavaScript";
// v.onEventClick = function(e) {edit(e);};
// v.eventDoubleClickHandling = "PostBack";
// v.onEventDoubleClick = function(e) {alert(e.value());};
// v.eventHoverHandling = "Bubble";
// v.eventSelectHandling = "JavaScript";
// v.onEventSelect = function(e, change) {alert('Event selected.')};
// v.eventRightClickHandling = "ContextMenu";
// v.onEventRightClick = function(e) {alert('Event with id ' + e.value() + ' clicked.')};
// v.eventDeleteHandling = "JavaScript";
// v.onEventDelete = function(e) {if (confirm('Do you really want to delete ' + e.text() + ' ?')) dpc1.eventDeleteCallBack(e);};
// v.headerClickHandling = "Disabled";
// v.onHeaderClick = function(c) {alert('Header with id ' + c.value + ' clicked.')};
// v.eventResizeHandling = "CallBack";
// v.onEventResize = function(e, newStart, newEnd) { alert('Event with id ' + e.id() + ' was resized.');};
// v.eventMoveHandling = "CallBack";
// v.onEventMove = function(e, newStart, newEnd, newResource, external, ctrl, shift) { var newColumn = newResource; var oldColumn = e.resource(); alert('Event with id ' + e.id() + ' was moved.');};
// v.timeRangeSelectedHandling = "JavaScript";
// v.onTimeRangeSelected = function(start, end, column) { var resource = column; create(start, end)};
// v.timeRangeDoubleClickHandling = "CallBack";
// v.onTimeRangeDoubleClick = function(start, end, column) { var resource = column; alert('TimeRangeDoubleClick')};
// v.eventEditHandling = "CallBack";
// v.onEventEdit = function(e, newText) {alert('The text of event ' + e.value() + ' was changed to ' + newText + '.');};
// v.callbackError = function(result, context) { alert('An exception was thrown in the server-side event handler:\n\n' + result.substring(result.indexOf('$$$')+3)); };
// v.cellProperties = {"0_1":{"business":0},"1_1":{"business":0},"2_1":{"business":0},"3_1":{"business":0},"4_1":{"business":0},"5_1":{"business":0},"6_1":{"business":0},"0_3":{"business":0},"1_3":{"business":0},"2_3":{"business":0},"3_3":{"business":0},"4_3":{"business":0},"5_3":{"business":0},"6_3":{"business":0},"0_5":{"business":0},"1_5":{"business":0},"2_5":{"business":0},"3_5":{"business":0},"4_5":{"business":0},"5_5":{"business":0},"6_5":{"business":0},"0_7":{"business":0},"1_7":{"business":0},"2_7":{"business":0},"3_7":{"business":0},"4_7":{"business":0},"5_7":{"business":0},"6_7":{"business":0},"0_9":{"business":0},"1_9":{"business":0},"2_9":{"business":0},"3_9":{"business":0},"4_9":{"business":0},"5_9":{"business":0},"6_9":{"business":0},"0_11":{"business":0},"1_11":{"business":0},"2_11":{"business":0},"3_11":{"business":0},"4_11":{"business":0},"5_11":{"business":0},"6_11":{"business":0},"0_13":{"business":0},"1_13":{"business":0},"2_13":{"business":0},"3_13":{"business":0},"4_13":{"business":0},"5_13":{"business":0},"6_13":{"business":0},"0_15":{"business":0},"1_15":{"business":0},"2_15":{"business":0},"3_15":{"business":0},"4_15":{"business":0},"5_15":{"business":0},"6_15":{"business":0},"0_17":{"business":0},"1_17":{"business":0},"2_17":{"business":0},"3_17":{"business":0},"4_17":{"business":0},"5_17":{"business":0},"6_17":{"business":0},"1_18":{"cssClass":"intrahour","business":1},"2_18":{"cssClass":"intrahour","business":1},"3_18":{"cssClass":"intrahour","business":1},"4_18":{"cssClass":"intrahour","business":1},"5_18":{"cssClass":"intrahour","business":1},"0_19":{"business":0},"1_19":{"business":1},"2_19":{"business":1},"3_19":{"business":1},"4_19":{"business":1},"5_19":{"business":1},"6_19":{"business":0},"1_20":{"cssClass":"intrahour","business":1},"2_20":{"cssClass":"intrahour","business":1},"3_20":{"cssClass":"intrahour","business":1},"4_20":{"cssClass":"intrahour","business":1},"5_20":{"cssClass":"intrahour","business":1},"0_21":{"business":0},"1_21":{"business":1},"2_21":{"business":1},"3_21":{"business":1},"4_21":{"business":1},"5_21":{"business":1},"6_21":{"business":0},"1_22":{"cssClass":"intrahour","business":1},"2_22":{"cssClass":"intrahour","business":1},"3_22":{"cssClass":"intrahour","business":1},"4_22":{"cssClass":"intrahour","business":1},"5_22":{"cssClass":"intrahour","business":1},"0_23":{"business":0},"1_23":{"business":1},"2_23":{"business":1},"3_23":{"business":1},"4_23":{"business":1},"5_23":{"business":1},"6_23":{"business":0},"1_24":{"cssClass":"intrahour","business":1},"2_24":{"cssClass":"intrahour","business":1},"3_24":{"cssClass":"intrahour","business":1},"4_24":{"cssClass":"intrahour","business":1},"5_24":{"cssClass":"intrahour","business":1},"0_25":{"business":0},"1_25":{"business":1},"2_25":{"business":1},"3_25":{"business":1},"4_25":{"business":1},"5_25":{"business":1},"6_25":{"business":0},"1_26":{"cssClass":"intrahour","business":1},"2_26":{"cssClass":"intrahour","business":1},"3_26":{"cssClass":"intrahour","business":1},"4_26":{"cssClass":"intrahour","business":1},"5_26":{"cssClass":"intrahour","business":1},"0_27":{"business":0},"1_27":{"business":1},"2_27":{"business":1},"3_27":{"business":1},"4_27":{"business":1},"5_27":{"business":1},"6_27":{"business":0},"1_28":{"cssClass":"intrahour","business":1},"2_28":{"cssClass":"intrahour","business":1},"3_28":{"cssClass":"intrahour","business":1},"4_28":{"cssClass":"intrahour","business":1},"5_28":{"cssClass":"intrahour","business":1},"0_29":{"business":0},"1_29":{"business":1},"2_29":{"business":1},"3_29":{"business":1},"4_29":{"business":1},"5_29":{"business":1},"6_29":{"business":0},"1_30":{"cssClass":"intrahour","business":1},"2_30":{"cssClass":"intrahour","business":1},"3_30":{"cssClass":"intrahour","business":1},"4_30":{"cssClass":"intrahour","business":1},"5_30":{"cssClass":"intrahour","business":1},"0_31":{"business":0},"1_31":{"business":1},"2_31":{"business":1},"3_31":{"business":1},"4_31":{"business":1},"5_31":{"business":1},"6_31":{"business":0},"1_32":{"cssClass":"intrahour","business":1},"2_32":{"cssClass":"intrahour","business":1},"3_32":{"cssClass":"intrahour","business":1},"4_32":{"cssClass":"intrahour","business":1},"5_32":{"cssClass":"intrahour","business":1},"0_33":{"business":0},"1_33":{"business":1},"2_33":{…




// navigatornavigator
// /* DayPilotPro: DayPilot, Version=8.3.3601.1, Culture=neutral, PublicKeyToken=426941954f05e7fe */
// function dpn_Init() {
// var v = new DayPilot.Navigator('ContentPlaceHolder1_DayPilotNavigator1');
// v.api = 1;
// v.bound = 'dpc1';
// v.cellHeight = 20;
// v.cellWidth = 20;
// v.clientName = 'dpn';
// v.command = 'navigate';
// v.cssOnly = true;
// v.theme = '';
// v.dayHeaderHeight = 20;
// v.items = {"2017-06-30T00:00:00":1,"2017-06-19T00:00:00":1,"2017-06-25T00:00:00":1,"2017-06-22T00:00:00":1,"2017-06-16T00:00:00":1,"2017-07-09T00:00:00":1,"2017-06-23T00:00:00":1,"2017-06-24T00:00:00":1};
// v.cells = {};
// v.locale = 'en-us';
// v.month = 6;
// v.orientation = 'Vertical';
// v.rowsPerMonth = 'Auto';
// v.selectMode = 'week';
// v.selectionStart = new DayPilot.Date('2017-06-18T00:00:00');
// v.selectionEnd = new DayPilot.Date('2017-06-24T00:00:00');
// v.showMonths = 3;
// v.showWeekNumbers = true;
// v.skipMonths = 3;
// v.titleHeight = 20;
// v.uniqueID = 'ctl00$ContentPlaceHolder1$DayPilotNavigator1';
// v.visible = true;
// v.weekStarts = 0;
// v.weekNumberAlgorithm = 'Auto';
// v.year = 2017;
// v.callbackError = function(result, context) { alert('An exception was thrown in the server-side event handler:\n\n' + result.substring(result.indexOf('$$$')+3)); };
// v.timeRangeSelectedHandling = 'Bind';
// v.onTimeRangeSelected = function(start, end, day) {alert(start.toString() + '\n' + end.toString());};
// v.visibleRangeChangedHandling = 'CallBack';
// v.onVisibleRangeChanged = function(start, end) {alert(start.toString() + '\n' + end.toString());};
// v.init();
// return v.internal.initialized() ? v : null;
// }
// DayPilot.Locale.register(new DayPilot.Locale('en-us', {dayNames:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],dayNamesShort:['Su','Mo','Tu','We','Th','Fr','Sa'],monthNames:['January','February','March','April','May','June','July','August','September','October','November','December',''],timePattern:'h:mm tt',datePattern:'M/d/yyyy',dateTimePattern:'M/d/yyyy h:mm tt',timeFormat:'Clock12Hours','weekStarts':0}));
// var dpn = dpn_Init() || dpn;




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
//  modal = new DayPilot.Angular.Modal();
  
//         this.modal.onClosed = function(args) { 
//             if(args.result == "OK") { 
//                 dpc1.commandCallBack('refresh'); 
//             }
//             dpc1.clearSelection();
//         };

  // @ViewChild('calendar') calendar: DayPilot.Angular.Calendar;

  name: string;
  last: number = 1;

  events: any[] = [
    { start: "2016-09-09", end: "2016-09-10", id: 1, text: "Event 1", resource: "R1" }
  ];

  calendarconfig: any = {
    // v.allDayEnd = "DateTime";
    // api : 1,
    // allDayEventBorderColor : "#000000",
    // allDayEventFontFamily : "Tahoma",
    // allDayEventFontSize : "8pt",
    // allDayEventFontColor : "#000000",
    // allDayEventHeight : 25,
    // allowEventOverlap : true,
    // allowMultiSelect : true,
    // autoRefreshCommand : "refresh",
    // autoRefreshEnabled : false,
    // autoRefreshInterval  : 60,
    // autoRefreshMaxCount  : 20,
    // borderColor  : "#000000",
    // businessBeginsHour  : 9,
    // businessEndsHour  : 18,
    // clientName  : "dpc1",
    // cellBackColor  : "#FFFFD5",
    // cellBackColorNonBusiness  : "#FFF4BC",
    // cellBorderColor  : "#000000",
    // cellHeight  : 25,
    // cellDuration  : 30,
    // columnMarginRight  : 5,
    // columnWidthSpec  : "Auto",
    // columnWidth  : 200,
    // crosshairColor  : "Gray",
    // crosshairOpacity  : 20,
    // crosshairType  : "Header",
    // theme  : "calendar_default",
    // cssOnly  : true,

 dayBeginsHour : 0,
 dayEndsHour : 0,
 days : 7,
 doubleClickTimeout : 300,
 durationBarColor : "Blue",
 durationBarVisible : true,
 durationBarWidth : 5,
 durationBarImageUrl : null,
//  eventArrangement : "Full",
//  eventBackColor : "#FFFFFF",
//  eventBorderColor : "#000000",
//  eventFontFamily : "Tahoma",
//  eventFontSize : "8pt",
//  eventFontColor : "#000000",
//  eventHeaderFontSize : "8pt",
//  eventHeaderFontColor : "White",
//  eventHeaderHeight : 14,
//  eventHeaderVisible : false,
//  eventSelectColor : "Red",
//  headerFontSize : "10pt",
//  headerFontFamily : "Tahoma",
//  headerFontColor : "#000000",
//  headerHeight : 20,
//  headerHeightAutoFit : false,
//  headerLevels : 1,
//  height : 300,
 heightSpec : "BusinessHours",
 hideFreeCells : false,
//  hourHalfBorderColor : "#F3E4B1",
//  hourBorderColor : "#EAD098",
//  hourFontColor : "#000000",
//  hourFontFamily : "Tahoma",
//  hourFontSize : "16pt",
//  hourNameBackColor : "#ECE9D8",
//  hourNameBorderColor : "#ACA899",
//  hourWidth : 60,
//  initScrollPos : "450",
//  loadingLabelText : "Loading...",
//  loadingLabelVisible : true,
//  loadingLabelFontSize : "10pt",
//  loadingLabelFontFamily : "Tahoma",
//  loadingLabelFontColor : "#FFFFFF",
//  loadingLabelBackColor : "Red",
//  messageHTML : "Welcome!",
//  messageHideAfter : 5000,
//  moveBy : "Full",
//  notifyCommit : "Immediate",
//  numberFormat : "0.00",
//  roundedCorners : false,
//  rtl : false,
 scrollLabelsVisible : true,
 selectedColor : "#316AC5",
 shadow : "Fill",
 showToolTip : true,
 showAllDayEvents : true,
 showAllDayEventStartEnd : true,
 showCurrentTime : true,
 showHeader : true,
 showHours : true,
 sortDirections : [],
 startDate : new DayPilot.Date(),
 timeFormat : "Clock12Hours",
 timeHeaderCellDuration : 60,

 useEventBoxes : "Always",
 useEventSelectionBars : false,
 viewType : "Week",
 visible : true,
 weekStarts : 0,
 widthUnit : "Percentage",
 cornerHTML : null,
 cornerBackColor : null,
//  contextMenu : ContentPlaceHolder1_DayPilotMenu1,
//  contextMenuSelection : cmSelection,
//  bubble : bubble,
//  columnBubble : bubble,
 eventTapAndHoldHandling : "Move",
 timeRangeTapAndHoldHandling : "Select",
 afterEventRender : function(e, div) {},
//  afterRender : function(data, isCallBack) {afterRender(isCallBack),},
 eventClickHandling : "JavaScript",
//  onEventClick : function(e) {edit(e),},
 eventDoubleClickHandling : "PostBack",
//  onEventDoubleClick : function(e) {alert(e.value()),},
 eventHoverHandling : "Bubble",
 eventSelectHandling : "JavaScript",
    // scale: "Day",
    // startDate: new DayPilot.Date(),
    // days: new DayPilot.Date().daysInMonth(),
    // timeHeaders: [
    //   { groupBy: "Month" },
    //   { groupBy: "Day", format: "d" }
    // ],
    // cellWidthSpec: "Auto",
    // resources: [
    //   { name: "频道静态标签", id: "R1" },
    //   { name: "频道静态标签", id: "R2" },
    //   { name: "首页下拉", id: "R3" },
    //    { name: "第二屏通栏", id: "R4" },
    //    { name: "升级弹窗", id: "R5" },
    //    { name: "第二屏通栏", id: "R6" },
    // ],
    onTimeRangeSelected: args => {
      alert("start: " + args.start);
    },
    onEventClicked: args => {
      alert("clicked: " + args.e.text());
    },
    onEventMoved: args => {
      this.calendar.control.message("Moved");
    },
    onEventResized: args => {
      this.calendar.control.message("Moved");
    }
  };


  @ViewChild('navigator') navigator: DayPilot.Angular.Navigator;
  
  navigatorconfig : any ={

 cellHeight :  20,
 cellWidth :  20,
 command :  'navigate',
 cssOnly :  true,
 theme :  '',
 dayHeaderHeight :  20,
 items :  {"2017-06-30T00:00:00":1,
          "2017-06-19T00:00:00":1,
          "2017-06-25T00:00:00":1,
          "2017-06-22T00:00:00":1,
          "2017-06-16T00:00:00":1,
          "2017-07-09T00:00:00":1,
          "2017-06-23T00:00:00":1,
          "2017-06-24T00:00:00":1},
 cells :  {},
 locale :  'zh-cn',
 month :  6,
 orientation :  'Vertical',
 rowsPerMonth :  'Auto',
 selectMode :  'week',
 selectionStart :  new DayPilot.Date(),
//  selectionEnd :  new DayPilot.Date('2017-06-24T00:00:00'),
 showMonths :  3,
 showWeekNumbers :  true,
 skipMonths :  3,
 titleHeight :  20,
//  uniqueID :  'ctl00$ContentPlaceHolder1$DayPilotNavigator1',
 visible :  true,
 weekStarts :  0,
 weekNumberAlgorithm :  'Auto',
//  year :  2017,
callbackError : function(result, context) { 
  alert('An exception was thrown in the server-side event handler:\n\n' + result.substring(result.indexOf('$$$')+3)); 
},
timeRangeSelectedHandling :'Bind',
onTimeRangeSelected : function(args) {
  // alert(start + '\n' + end);
  // this.calendarconfig
  // startDate = args.day;
},
visibleRangeChangedHandling : 'CallBack',
onVisibleRangeChanged : function(start, end) {
  alert(start+ '\n' + end);
},
  
};

  constructor(public navCtrl: NavController) {

  }
  add() {
        this.last += 1;
        this.events.push({start: "2016:09-09", end: "2016-09-10", id: this.last, text: "Event " + this.last, resource: "R1"});
        this.calendar.control.message("Added");
  }

  goToDynamic() {
    // this.navCtrl.push(DpPage);
  }
  

  // @ViewChild('mapCanvas') mapElement: ElementRef;
  // constructor(public confData: ConferenceData, public platform: Platform) {
  // }

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
