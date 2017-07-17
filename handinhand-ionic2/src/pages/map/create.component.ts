import { Component } from '@angular/core';

import { NavParams, NavController } from 'ionic-angular';

import { ViewChild} from "@angular/core";
import {DayPilot} from "daypilot-pro-angular";
import { FormGroup, FormControl} from "@angular/forms";
// import {CreateEventParams, DataService} from "./data.service";
import { ConferenceData, CreateEventParams } from './../../providers/conference-data';

// import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'create-dialog',
  template: `
 <ion-header>
  <ion-navbar>
      <ion-title [hidden]="type === 'update'">创建</ion-title>
    <ion-title [hidden]="type === 'create'">更新</ion-title>
    
  </ion-navbar>
</ion-header>

<ion-content>


	<form #eventForm="ngForm" novalidate>
		<ion-list no-lines>
			<ion-item>
				<ion-label stacked color="primary">开始时间</ion-label>
				<ion-input [(ngModel)]="event.start" name="start" type="text" #start="ngModel" spellcheck="false" autocapitalize="off"
					required>
				</ion-input>
			</ion-item>


			<ion-item>
				<ion-label stacked color="primary">结束时间</ion-label>
				<ion-input [(ngModel)]="event.end" name="end" type="text" #end="ngModel" required>
				</ion-input>
			</ion-item>

      <ion-item>
				<ion-label stacked color="primary"> 任务</ion-label>
				<ion-input [(ngModel)]="event.text" name="text" type="text" #text="ngModel" required>
				</ion-input>
			</ion-item>
		
		</ion-list>

     <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" required>
      </div>
      <div class="form-group">
        <label for="alterEgo">Alter Ego</label>
        <input type="text" class="form-control" id="alterEgo">
      </div>
      <button type="submit" class="btn btn-success">Submit</button>
    </form>

		<ion-row responsive-sm>
			<ion-col>
				<button ion-button (click)="submit()" type="submit" block>提交</button>
			</ion-col>
	
		</ion-row>

	</form>



</ion-content>
  `,
  // template: `
  //   <daypilot-modal #modal (close)="closed()">
  //   <div class="center">
  //     <h1>New Event</h1>
  //     <form [formGroup]="form">
  //       <div class="form-item">
  //         <input formControlName="name" type="text" placeholder="Event Name"> <span *ngIf="!form.controls.name.valid">Event name required</span>
  //       </div>
  //       <div class="form-item">
  //         <input formControlName="start" type="text" placeholder="Start"> <span *ngIf="!form.controls.start.valid">Invalid datetime</span>
  //       </div>
  //       <div class="form-item">
  //         <input formControlName="end" type="text" placeholder="End"> <span *ngIf="!form.controls.end.valid">Invalid datetime</span>
  //       </div>
  //       <div class="form-item">
  //         <button (click)="submit()" [disabled]="!form.valid">Create</button>
  //         <button (click)="cancel()">Cancel</button>
  //       </div>
  //   </form>
  //   </div>
  //   </daypilot-modal>
  // `,
  // styles: [`
  // .center {
  //   max-width: 800px;
  //   margin-left: auto;
  //   margin-right: auto;
  // }
  // .form-item {
  //   margin: 4px 0px;
  // }
  // `]
})
export class EventDetailPage {

  event: CreateEventParams;
  type: any;

  constructor(public navParams: NavParams, public navCtrl: NavController, private ds: ConferenceData) {
    this.event = navParams.data.event;
    this.type = navParams.data.type;
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
    // let data = this.eventForm.getRawValue();

    // let params: CreateEventParams = {
    //   start: DayPilot.Date.parse(this.event.start, this.dateFormat).toString(),
    //   end: DayPilot.Date.parse(this.event.end, this.dateFormat).toString(),
    //   text: this.event.text
    // };

    // this.ds.createEvent(params).subscribe(result => {
    //   params.id = result.id;
    //   this.modal.hide();
    //   this.close.emit(params);
    // });
    // let params: Event  = event;

    this.ds.createEvent(this.event).subscribe(result => {
          console.log(result)
          this.event.objectId = result.objectId;
          // this.event.id = parseInt(result.objectId);
          var time =new Date();
          this.event.id = time.getTime() ;

          this.ds.updateEvent(this.event).subscribe(result => {
            console.log(result)
            // this.modal.hide();
            this.navCtrl.pop();

            
            // this.close.emit();
            
          })

           
      // params.id = result.id;
      // this.modal.hide();
      // this.close.emit(params);
    });
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
}
