import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExaminationinfoPage } from './examinationinfo';

@NgModule({
  declarations: [
    ExaminationinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ExaminationinfoPage),
  ],
  exports: [
    ExaminationinfoPage
  ]
})
export class ExaminationinfoPageModule {}
