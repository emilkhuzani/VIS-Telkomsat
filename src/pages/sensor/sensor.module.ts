import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SensorPage } from './sensor';

@NgModule({
  declarations: [
    SensorPage,
  ],
  imports: [
    IonicPageModule.forChild(SensorPage),
  ],
})
export class SensorPageModule {}
