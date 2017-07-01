import { Component } from '@angular/core';
import { ConferenceData } from '../../../providers/conference-data';

@Component({
  templateUrl: 'alltest.html'
})
export class AllTestPage{

  constructor(public confData: ConferenceData){
  }

  passages: any = this.confData.getAllTestPassage()
}