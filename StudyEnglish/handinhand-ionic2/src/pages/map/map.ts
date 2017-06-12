import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';
import { DayPilot } from 'daypilot-pro-angular';
import { NavController } from 'ionic-angular';
declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('scheduler') scheduler: DayPilot.Angular.Scheduler;

  name: string;
  last: number = 1;

  events: any[] = [
    { start: "2016-09-09", end: "2016-09-10", id: 1, text: "Event 1", resource: "R1" }
  ];

  config: any = {
    scale: "Day",
    startDate: "2016-09-01",
    days: new DayPilot.Date("2016-09-09").daysInMonth(),
    timeHeaders: [
      { groupBy: "Month" },
      { groupBy: "Day", format: "d" }
    ],
    cellWidthSpec: "Auto",
    resources: [
      { name: "频道静态标签", id: "R1" },
      { name: "频道静态标签", id: "R2" },
      { name: "首页下拉", id: "R3" },
       { name: "第二屏通栏", id: "R4" },
       { name: "升级弹窗", id: "R5" },
       { name: "第二屏通栏", id: "R6" },
    ],
    onTimeRangeSelected: args => {
      alert("start: " + args.start);
    },
    onEventClicked: args => {
      alert("clicked: " + args.e.text());
    },
    onEventMoved: args => {
      this.scheduler.control.message("Moved");
    },
    onEventResized: args => {
      this.scheduler.control.message("Moved");
    }
  };
  constructor(public navCtrl: NavController) {

  }
  add() {
        this.last += 1;
        this.events.push({start: "2016-09-09", end: "2016-09-10", id: this.last, text: "Event " + this.last, resource: "R1"});
        this.scheduler.control.message("Added");
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
