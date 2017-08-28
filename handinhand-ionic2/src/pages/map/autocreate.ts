import { Component } from '@angular/core';

import { NavParams, NavController } from 'ionic-angular';

import { ViewChild} from "@angular/core";
import {DayPilot} from "daypilot-pro-angular";
import { FormGroup, FormControl} from "@angular/forms";
// import {CreateEventParams, DataService} from "./data.service";
import { ConferenceData, CreateEventParams } from './../../providers/conference-data';
// import { UserData } from '../../../providers/user-data';
// import { FormsModule }   from '@angular/forms';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'create-auto',
  templateUrl: 'autocreate.html'
})
export class AutoCreatePage {

  event: any;
  type: any;
  allhours:number;

  constructor(public navParams: NavParams, public navCtrl: NavController, private ds: ConferenceData, private userdata: UserData) {
    this.event = navParams.data.event;
    this.type = navParams.data.type;
    
    this.event.uid = userdata.getUserId()

    if(typeof(this.event.timephases) =="undefined" ){
      this.event.timephases=[]
    }else{
      this.event.timephases=JSON.parse(this.event.timephases)
    }
  }


  @ViewChild("modal") modal : DayPilot.Angular.Modal;
  // @Output() close = new EventEmitter();


  eventForm: FormGroup;
  dateFormat = "MM/dd/yyyy h:mm tt";

  // constructor(private fb: FormBuilder, private ds: ConferenceData) {
    // this.form = this.fb.group({
    //   name: ["", Validators.required],
    //   start: ["", this.dateTimeValidator(this.dateFormat)],
    //   end: ["", [Validators.required, this.dateTimeValidator(this.dateFormat)]]
    // });
  // }

  show(args: any) {
    args.name = "";

    this.eventForm.setValue({
      start: args.start.toString(this.dateFormat),
      end: args.end.toString(this.dateFormat),
      name: ""
    });
    this.modal.show();
  }

  submit() {
  

    // this.allhours =  (this.event.end - this.event.start)*this.event.duration
    
    var day1 = new DayPilot.Date(this.event.start);  
    var day2 = new DayPilot.Date(this.event.end);  
    var dayCount = (day2.getTime() - day1.getTime())/1000/60/60/24; 
    
    for(var i=0; i< dayCount; i++){
      var itemevent = this.event;

      var tmp:  DayPilot.Date = day1.addDays(i)
      itemevent.start = tmp.toString().split("T")[0],
      itemevent.end = itemevent.start;
      var time =new Date();
      itemevent.id = time.getTime() ;

      this.ds.createEvent(itemevent).subscribe(result => {
            console.log(result)
            itemevent.objectId = result.objectId;
            // this.event.id = parseInt(result.objectId);


            // this.ds.updateEvent(itemevent).subscribe(result => {
              // console.log(result)
              // this.modal.hide();
              // this.navCtrl.pop();
            // })
      });
    }
  }

  cancel() {
    this.modal.hide();
    // this.close.emit();
  }

  closed() {
    // this.close.emit();

  }

  dateTimeValidator(format: string) {
    return function(c:FormControl) {
      let valid = !!DayPilot.Date.parse(c.value, format);
      return valid ? null : {badDateTimeFormat: true};
    };
  }

  addNewToList(){
    console.log("addNewToList")
    this.event.timephases.push({"channelName":"","point":""})
    // this.detail.includeChannel[0].buName="1111xxx"
  }
  deleteFromList(item){
    this.event.timephases.pop(item)
  }

  caculation(){
  }
}
