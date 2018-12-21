import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailBeritaPage } from './detail-berita';
import { HiddenBarDirective } from '../../directives/hidden-bar/hidden-bar';

@NgModule({
  declarations: [
    DetailBeritaPage,
    HiddenBarDirective
  ],
  imports: [
    IonicPageModule.forChild(DetailBeritaPage),
  ],
})
export class DetailBeritaPageModule {}
