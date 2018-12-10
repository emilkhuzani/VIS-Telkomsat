import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailBeritaPage } from './detail-berita';

@NgModule({
  declarations: [
    DetailBeritaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailBeritaPage),
  ],
})
export class DetailBeritaPageModule {}
