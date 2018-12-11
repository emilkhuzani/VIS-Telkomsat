import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeekTrackPage } from './week-track';

@NgModule({
  declarations: [
    WeekTrackPage,
  ],
  imports: [
    IonicPageModule.forChild(WeekTrackPage),
  ],
})
export class WeekTrackPageModule {}
