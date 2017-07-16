// import { Component } from '@angular/core';


// import { NavParams,NavController } from 'ionic-angular';


// import { ConferenceData } from '../../../providers/conference-data';

import { Component, Input, OnDestroy, AfterViewInit } from '@angular/core';

// @Component({
//    selector: 'roy-countdown',
//    templateUrl: `
//    <div class="count-down">
//   <div class="title">
//     <h4>
//       {{title}}
//     </h4>
//   </div>
//   <div class="body">
//     <div class="content">
//       <div class="top">
//         {{hour}}
//       </div>
//       <div class="bottom">
//         小时
//       </div>
//     </div>
//     <div class="content">
//       <div class="top">
//         {{minute}}
//       </div>
//       <div class="bottom">
//         分钟
//       </div>
//     </div>
//     <div class="content">
//       <div class="top">
//         {{second}}
//       </div>
//       <div class="bottom">
//         秒
//       </div>
//     </div>
//   </div>
// </div>
//    `

// })


@Component({
 selector: 'roy-countdown',
 templateUrl: './countdown.component.html'
//  styleUrls: ['./timer.scss']
})

export class TimerPage implements AfterViewInit, OnDestroy {
 // 父组件传递截止日期
 @Input() endDate: number;
 // 父组件传递标题
 @Input() title: string;
 // 小时差
 private hour: number;
 // 分钟差
 private minute: number;
 private minutestr: any;
 // 秒数差
 private second: number;
 private secondstr: any;
 // 时间差
 private _diff: number;
 private get diff() {
  return this._diff;
 }
 private set diff(val) {
  this._diff = Math.floor(val / 1000);
  this.hour = Math.floor(this._diff / 3600);
  this.minute = Math.floor((this._diff % 3600) / 60);
  this.second = (this._diff % 3600) % 60;
    
  this.minutestr = (this.minute<10)?  ("0"+this.minute.toString()): this.minute.toString() ;
  this.secondstr = (this.second<10)?  ("0"+this.second.toString()): this.second.toString() ;
 }
 // 定时器
 private timer;

 // 每一秒更新时间差
 ngAfterViewInit() {
  this.timer = setInterval(() => {
   this.endDate = this.endDate - 1000;
   this.diff = this.endDate
   console.log(this.endDate)
   console.log(this.diff)
  }, 1000);
 }

 // 销毁组件时清除定时器
 ngOnDestroy() {
  if (this.timer) {
   clearInterval(this.timer);
  }
 }


}

