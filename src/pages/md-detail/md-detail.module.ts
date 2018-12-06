import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MdDetailPage } from './md-detail';

@NgModule({
  declarations: [
    MdDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MdDetailPage),
  ],
})
export class MdDetailPageModule {}
