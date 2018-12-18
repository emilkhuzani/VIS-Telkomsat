import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  versi:string;
  constructor(public navCtrl: NavController, private http:Http, private loadingCtlr:LoadingController, private alertCtlr:AlertController) {
    this.getAbout();
  }

  getAbout(){
  	let loading = this.loadingCtlr.create({
  	  spinner : 'dots',
  	  content : 'Retrieving data from server...'
  	});
  	loading.present();
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/app/versi.php')
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  loading.dismiss();
  	  this.versi = data.versi;
  	},err=>{
  	  loading.dismiss();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrieve data from server',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Try Again',
            handler: () => {
              this.getAbout();
            }
          }
        ]
      });
      alert.present();
  	});
  }

  doRefresh(event){
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/app/versi.php')
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      event.complete();
      this.versi = data.versi;
    },err=>{
      event.complete();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrieve data from server',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Try Again',
            handler: () => {
              this.getAbout();
            }
          }
        ]
      });
      alert.present();
    });
  }

}
