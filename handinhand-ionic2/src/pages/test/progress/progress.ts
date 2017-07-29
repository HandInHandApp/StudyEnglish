// import { Component, Input } from '@angular/core';
import { Component, Directive,Input,Output, OnDestroy, AfterViewInit,EventEmitter } from '@angular/core';


@Component({
 selector: 'myprogress-bar',
 templateUrl: './progress.html'
})
export class ProgressPage implements AfterViewInit, OnDestroy {

   @Input('progress') progress;
 
  constructor() {
 
  }

 public precent_progress=0;
 // 定时器
 private timer;
 private orign_time;
 
ngAfterViewInit(){
 this.orign_time = this.progress;
   
    this.precent_progress=0
       this.timer = setInterval(() => {
           if(this.progress != 0){
                this.progress=this.progress -1
                this.precent_progress= Math.round(100-(this.progress*100)/this.orign_time)
                // this.precent_progress =parseInt(this.precent_progress) 
           }
        
  }, 1000);
    
  }

 // 销毁组件时清除定时器
 ngOnDestroy() {
  if (this.timer) {
   clearInterval(this.timer);
  }
 }

}

