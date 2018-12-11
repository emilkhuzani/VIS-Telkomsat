import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App} from 'ionic-angular';
import { AboutPage } from '../about/about';
import { FaqPage } from '../faq/faq';
import { HelpPage } from '../help/help';

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  goAbout(){
  	this.app.getRootNav().push(AboutPage,{},{animate:true,direction:'forward'});
  }

  goFaq(){
  	this.app.getRootNav().push(FaqPage,{},{animate:true,direction:'forward'});
  }

  goHelp(){
  	this.app.getRootNav().push(HelpPage,{},{animate:true,direction:'forward'});
  }

}
