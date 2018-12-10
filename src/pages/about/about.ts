import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  versi:string;
  constructor(public navCtrl: NavController, private http:Http, private loadingCtlr:LoadingController) {
    this.getAbout();
  }

  getAbout(){
  	let loading = this.loadingCtlr.create({
  	  spinner : 'dots',
  	  content : 'Please wait...'
  	});
  	loading.present();
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/app/versi.php')
  	.timeout(3*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  loading.dismiss();
  	  this.versi = data.versi;
  	},err=>{
  	  loading.dismiss();
  	});
  }

}
