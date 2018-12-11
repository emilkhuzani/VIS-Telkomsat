import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-date-track',
  templateUrl: 'date-track.html',
})
export class DateTrackPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private view : ViewController) {
  }

  closeModal(){
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateTrackPage');
  }

}
