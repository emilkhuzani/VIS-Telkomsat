import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-detail-berita',
  templateUrl: 'detail-berita.html',
})
export class DetailBeritaPage {
  id_berita:string;
  judul_berita:string;
  gambar_berita:string;
  isi_berita:string;
  sumber_berita:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, private loadingCtlr:LoadingController, private alertCtlr:AlertController) {
  	this.id_berita = this.navParams.get('id_berita');
  	this.getBerita();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailBeritaPage');
  }

  getBerita(){
    let loading = this.loadingCtlr.create({
      spinner:'dots',
      content: 'Retrieving news data from server...',
    });
    loading.present();
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/berita/detail_berita.php?id_berita='+this.id_berita)
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      loading.dismiss();
      this.judul_berita=data.judul_berita;
      this.gambar_berita=encodeURI('http://vis.telkomsat.co.id/images_news/'+data.gambar_berita);
      this.isi_berita=data.isi_berita;
      this.sumber_berita=data.sumber_berita;
    },err=>{
      loading.dismiss();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrive maritime news data from server',
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
              this.getBerita();
            }
          }
        ]
      })
      alert.present();
    });
  }

  doRefresh(event){
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/berita/detail_berita.php?id_berita='+this.id_berita)
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      event.complete();
      this.judul_berita=data.judul_berita;
      this.gambar_berita=encodeURI('http://vis.telkomsat.co.id/images_news/'+data.gambar_berita);
      this.isi_berita=data.isi_berita;
      this.sumber_berita=data.sumber_berita;
    },err=>{
      event.complete();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrive maritime news data from server',
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
              this.getBerita();
            }
          }
        ]
      })
      alert.present();
    });
  }

}
