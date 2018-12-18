import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
  faq:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, private loadingCtlr:LoadingController, private alertCtlr:AlertController) {
  	this.getFaq();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

  getFaq(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Retrieving data from server...',
    });
    loading.present();
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/app/get_faq.php')
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      loading.dismiss();
      this.faq=data.faq;
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
              this.getFaq();
            }
          }
        ]
      });
      alert.present();
    })  
  }

  doRefresh(event){
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/app/get_faq.php')
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      event.complete();
      this.faq=data.faq;
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
              this.getFaq();
            }
          }
        ]
      });
      alert.present();
    })
  }

}
