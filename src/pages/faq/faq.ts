import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, private loadingCtlr:LoadingController) {
  	this.getFaq();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

  getFaq(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Please wait...',
    });
    loading.present();
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/app/get_faq.php')
    .timeout(3*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      loading.dismiss();
      this.faq=data.faq;
    },err=>{

    })
  }

}
