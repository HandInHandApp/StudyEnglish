import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';

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

import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';

import { ExerciseData } from '../providers/exercise/exercise-data';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { KeysPipe } from '../directives/keyspipe';

// import { DayPilotCalendarComponent,DayPilotModule} from 'daypilot-pro-angular';
import { DayPilot } from 'daypilot-pro-angular';

import { TestListPage } from '../pages/test/test-list/test-list';
import { ExaminationDetailPage } from '../pages/examination-detail/examination-detail';
import { TrainingDetailPage } from '../pages/training-detail/training-detail';
import { AllTestPage } from '../pages/test/alltest/alltest'
import { MiniTestPage } from '../pages/test/minitest/minitest'
import { TopListPage } from '../pages/test/top-list/top-list'
import { ListeningTestPage } from '../pages/test/listening-test/listening-test'
import { WritingTestPage   } from '../pages/test/writing-test/writing-test'
import { SpeakingTestPage  } from '../pages/test/speaking-test/speaking-test'
import { ReadingTestPage   } from '../pages/test/reading-test/reading-test'
import { DirectionPage } from   '../pages/directions/directions'

import { ReadingReviewPage   } from '../pages/test/reading-review/reading-review'
import { TestReportPage   } from '../pages/test/test-report/test-report'

import { ExerciseIndexPage } from '../pages/exercise/index/index';
import { ExerciseTypePage } from '../pages/exercise/exercise-type/exercise-type';
import { ExerciseItemPage } from '../pages/exercise/exercise-item/exercise-item';
import { ExerciseAnswerPage } from '../pages/exercise/exercise-answer/exercise-answer';

// import { AngularFireModule } from "angularfire2";
import {EventDetailPage} from "../pages/map/create.component";
import {AutoCreatePage} from "../pages/map/autocreate";
import { FormsModule }   from '@angular/forms';

import { TimerPage   } from '../pages/test/timer/timer'
import { ProgressPage   } from '../pages/test/progress/progress'



import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';

import { AudioPlay } from '../components/audio-player/audio-player';
import { ButtonBar } from '../components/button-bar/button-bar';
import { ProgressSlider } from '../components/progress-slider/progress-slider';
import { VuGauge } from '../components/vu-gauge/vu-gauge';

import {  RecordListPage} from '../pages/recordlist-page/recordlist-page';
import { TrackPage } from '../pages/track-page/track-page';
import { LibraryPage } from '../pages/library-page/library-page';
import { RecordPage } from '../pages/record-page/record-page';
import { IdbAppData } from '../providers/idb-app-data/idb-app-data';
import { IdbAppFS } from '../providers/idb-app-fs/idb-app-fs';
import { AppState } from '../providers/app-state/app-state';
import { MasterClock } from '../providers/master-clock/master-clock';

import { ContainsPipe, NotContainsPipe } from '../pages/test/reading-test/reading-test.pipe';

// import { ExaminationinfoPage } from '../pages/examinationinfo/examinationinfo';
@NgModule({
  declarations: [
    ConferenceApp,
    ExaminationDetailPage,
    TrainingDetailPage,
    AllTestPage,
    MiniTestPage,
    TopListPage,
    DirectionPage,

    ListeningTestPage,
    WritingTestPage, 
    SpeakingTestPage, 
    ReadingTestPage,

    ReadingReviewPage, 
    TestReportPage, 

    AboutPage,
    AccountPage,
    ExerciseIndexPage,
    ExerciseTypePage,
    ExerciseItemPage,
    ExerciseAnswerPage,
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

    EventDetailPage,
    AutoCreatePage,
    TimerPage,
    ProgressPage,
    RecordPage,
            AudioPlay,
        ButtonBar,
        ProgressSlider,
        VuGauge,
        LibraryPage,
        TrackPage,
        RecordListPage,
    // AngularFireModule
    // Pipe
    ContainsPipe,
    NotContainsPipe,
    KeysPipe


  ],
  imports: [
    BrowserModule,
    HttpModule,
    // AngularFireModule,
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
    ExerciseIndexPage,
    ExerciseTypePage,
    ExerciseItemPage,
    ExerciseAnswerPage,
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
    AutoCreatePage,
    AllTestPage,
    MiniTestPage,
    TopListPage,
    ListeningTestPage,
    WritingTestPage, 
    SpeakingTestPage, 
    ReadingTestPage,
    DirectionPage,
    // TimerPage,
    RecordPage,
    LibraryPage,
    TrackPage,
    RecordListPage,

    ReadingReviewPage,
    TestReportPage
  ],
  providers: [
    StatusBar,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ExerciseData,
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    Media,
    File,
    IdbAppData,
    IdbAppFS,
    AppState,
    MasterClock
  ]
})
export class AppModule { }
