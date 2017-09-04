import { NgModule } from '@angular/core';
import { IonicPageModule,IonicModule } from 'ionic-angular';
import { SpeakingTestPage } from './speaking-test';

@NgModule({
  declarations: [
    SpeakingTestPage,
  ],
  imports: [
    IonicPageModule.forChild(SpeakingTestPage),
  ],
  exports: [
    SpeakingTestPage
  ]
})
export class SpeakingTestPageModule {}
