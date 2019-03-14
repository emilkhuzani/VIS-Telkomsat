import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { KapalPage } from '../pages/kapal/kapal';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { MapsPage } from '../pages/maps/maps';
import { NewsPage } from '../pages/news/news';
import { DetailPage } from '../pages/detail/detail';
import { MdDetailPage } from '../pages/md-detail/md-detail';
import { DetailBeritaPage } from '../pages/detail-berita/detail-berita';
import { MorePage } from '../pages/more/more';
import { FaqPage } from '../pages/faq/faq';
import { HelpPage } from '../pages/help/help';
import { DateTrackPage } from '../pages/date-track/date-track';
import { WeekTrackPage } from '../pages/week-track/week-track';
import { FollowVesselPage } from '../pages/follow-vessel/follow-vessel';
import { TrackingPage } from '../pages/tracking/tracking';
import { SensorPage } from '../pages/sensor/sensor';
import { SubSensorPage } from '../pages/sub-sensor/sub-sensor';
import { ModalResetPage } from '../pages/modal-reset/modal-reset';
import { SearchResultPage } from '../pages/search-result/search-result';
import { SearchResultMapPage } from '../pages/search-result-map/search-result-map';
import { PopoverPage } from '../pages/popover/popover';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { HiddenBarDirective } from '../directives/hidden-bar/hidden-bar';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WelcomePage,
    LoginPage,
    KapalPage,
    MapsPage,
    NewsPage,
    MdDetailPage,
    DetailBeritaPage,
    DetailPage,
    MorePage,
    HelpPage,
    FaqPage,
    DateTrackPage,
    WeekTrackPage,
    FollowVesselPage,
    TrackingPage,
    SensorPage,
    SubSensorPage,
    ModalResetPage,
    SearchResultPage,
    SearchResultMapPage,
    PopoverPage,
    HiddenBarDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ImgFallbackModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WelcomePage,
    LoginPage,
    KapalPage,
    MapsPage,
    NewsPage,
    MdDetailPage,
    DetailBeritaPage,
    DetailPage,
    MorePage,
    HelpPage,
    FaqPage,
    DateTrackPage,
    WeekTrackPage,
    FollowVesselPage,
    TrackingPage,
    SensorPage,
    SubSensorPage,
    ModalResetPage,
    SearchResultPage,
    SearchResultMapPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
