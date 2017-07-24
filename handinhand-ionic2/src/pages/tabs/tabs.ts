import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { TrainingPage } from '../schedule/schedule';
import { TestListPage } from '../test/test-list/test-list';
import { ExerciseIndexPage } from '../exercise/index/index';

import { LibraryPage } from '../library-page/library-page';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = TestListPage;
  tab2Root: any = TrainingPage;
  tab3Root: any = MapPage;
  tab4Root: any = ExerciseIndexPage;
  tab5Root: any = AboutPage;
  tab6Root: any = LibraryPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
