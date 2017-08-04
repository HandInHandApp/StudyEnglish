// import { Component } from '@angular/core';


// import { NavParams,NavController } from 'ionic-angular';


// import { ConferenceData } from '../../../providers/conference-data';

import { Component, Directive,Input,Output, OnDestroy, AfterViewInit,EventEmitter } from '@angular/core';



@Component({
 selector: 'timer-countdown',
 templateUrl: './countdown.component.html'
//  styleUrls: ['./timer.scss']
})

export class TimerPage implements AfterViewInit, OnDestroy {
 // 父组件传递截止日期
 @Input() endDate: number;
 // 父组件传递标题
 @Input() title: string;

 @Input() stop: boolean;

 @Output() childEvent = new EventEmitter<any>();


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
   if(this.stop == true || this.endDate == 0){
       
   }else{
        this.endDate = this.endDate - 1000;
        this.diff = this.endDate
   }

   if(this.endDate == 0) {
        this.childEvent.emit(this.title);
        clearInterval(this.timer);
   }
   
   //每秒发送通知
   this.childEvent.emit(this.title+"_"+this.endDate);
  }, 1000);
 }

 // 销毁组件时清除定时器
 ngOnDestroy() {
  if (this.timer) {
   clearInterval(this.timer);
  }
 }


}

