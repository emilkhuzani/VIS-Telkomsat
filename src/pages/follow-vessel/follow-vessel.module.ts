import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowVesselPage } from './follow-vessel';

@NgModule({
  declarations: [
    FollowVesselPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowVesselPage),
  ],
})
export class FollowVesselPageModule {}
