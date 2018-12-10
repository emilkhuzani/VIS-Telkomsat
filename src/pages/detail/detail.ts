import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  nama_kapal:string;
  id_node:string;
  foto:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, private loadingCtlr:LoadingController) {
  	this.nama_kapal = this.navParams.get('nama_node');
  	this.id_node = this.navParams.get('id_node');
    this.getDetail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  getDetail(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Please wait...',
    });  
    loading.present();
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/detail_v3.php?id_node='+this.id_node)
    .timeout(3*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      loading.dismiss();
      //this.foto='http://vis.telkomsat.co.id/images/'+data.foto;
      this.foto=encodeURI('http://vis.telkomsat.co.id/images_backup/'+data.foto);
    },err=>{
      loading.dismiss();
    })
  }

}
