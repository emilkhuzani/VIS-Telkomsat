import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  nama_node:string;
  id_node:string;
  foto:string;
  last_seen:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private app : App, private view:ViewController) {
  	this.nama_node = this.navParams.get('nama_node');
  	this.id_node = this.navParams.get('id_node');
  	this.foto = encodeURI("http://vis.telkomsat.co.id/images_backup/"+this.navParams.get('foto'));
  	this.last_seen = this.navParams.get('last_seen');
  }
  goDetail(){
  	this.view.dismiss();
  	this.app.getRootNav().push(DetailPage, {id_node:this.id_node,nama_node:this.nama_node},{animate:true, direction:'forward'});
  }

  closePopo(){
  	this.view.dismiss();
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

}
