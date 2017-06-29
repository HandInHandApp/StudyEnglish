import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { TrainingPage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { TestListPage } from '../pages/test-list/test-list';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

// import { DayPilotCalendarComponent,DayPilotModule} from 'daypilot-pro-angular';
import { DayPilot } from 'daypilot-pro-angular';

import { ExaminationDetailPage } from '../pages/examination-detail/examination-detail';
import { TrainingDetailPage } from '../pages/training-detail/training-detail';
import { AllTestPage } from '../pages/alltest/alltest'
import { TopListPage } from '../pages/top-list/top-list'
import { ListeningTestPage } from '../pages/listening-test/listening-test'



import { AngularFireModule } from "angularfire2";
import {EventDetailPage} from "../pages/map/create.component";
import { FormsModule }   from '@angular/forms';



// import { ExaminationinfoPage } from '../pages/examinationinfo/examinationinfo';
@NgModule({
  declarations: [
    ConferenceApp,
    ExaminationDetailPage,
    TrainingDetailPage,
    AllTestPage,
    TopListPage,
    ListeningTestPage,
    

    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    TrainingPage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    TestListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    
    DayPilot.Angular.Navigator,
    DayPilot.Angular.Scheduler,
    DayPilot.Angular.Gantt,
    DayPilot.Angular.Calendar,
    DayPilot.Angular.Month,
    DayPilot.Angular.Modal,
    // DayPilotCalendarComponent,
    // DayPilotModule,

    EventDetailPage
    // AngularFireModule


  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule,
    FormsModule,
    // BrowserAnimationsModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs' },
        { component: TrainingPage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:name' },
        { component: ExaminationDetailPage, name: 'ExaminationDetail', segment: 'ExaminationDetail/:name' },
        { component: TrainingDetailPage, name: 'TrainingDetail', segment: 'TrainingDetail/:name' },
        { component: EventDetailPage, name: 'EventDetail', segment: 'EventDetail/:id' },
        
        
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: TestListPage, name: 'TestList', segment: 'testList' },
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:name' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    TrainingPage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    TestListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    ExaminationDetailPage,
    TrainingDetailPage,
    EventDetailPage,
    AllTestPage,
    TopListPage,
    ListeningTestPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { }
