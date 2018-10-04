import { Component } from '@angular/core';

import { AboutPage } from '../about/about';

import {OnlinePage} from '../online/online'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = OnlinePage;
  tab2Root = AboutPage;
  

  constructor() {

  }
}
