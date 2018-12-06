import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  slides:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.slides = [
    {
      title: "Realtime Ship Position",
      description: "Monitor your fleet realtime on your device, anywhere, anytime!",
      image: "../../assets/imgs/welcome/map.png",
    },
    {
      title: "Ship Historical Track",
      description: "With big database, you can track your fleet journey within daily until yearly period",
      image: "../../assets/imgs/welcome/ship.png",
    },
    {
      title: "Precision Position",
      description: "We use the new gps tracking technology with satelite support, to make the ship position more precision",
      image: "../../assets/imgs/welcome/satellite.png",
    }
    ];
    if(localStorage.getItem('id_vis')!=undefined){
      this.navCtrl.push(TabsPage, {}, {animate:true,direction:'forward'});
    }
  }
  goLogin(){
  	this.navCtrl.push(LoginPage,{},{animate:true,direction:'forward'});
  }

  insertId(){
    localStorage.setItem('id_vis','1');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
