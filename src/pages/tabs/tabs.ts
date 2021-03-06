import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { KapalPage } from '../kapal/kapal';
import { MapsPage } from '../maps/maps';
import { NewsPage } from '../news/news';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  home = HomePage;
  boat = KapalPage;
  news = NewsPage;
  map = MapsPage;
  more = AboutPage;

  constructor() {

  }
}
