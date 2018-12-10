import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { FaqPage } from '../faq/faq';
import { HelpPage } from '../help/help';

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  goAbout(){
  	this.navCtrl.push(AboutPage,{},{animate:true,direction:'forward'});
  }

  goFaq(){
  	this.navCtrl.push(FaqPage,{},{animate:true,direction:'forward'});
  }

  goHelp(){
  	this.navCtrl.push(HelpPage,{},{animate:true,direction:'forward'});
  }

}
