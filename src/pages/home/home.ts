import { Component } from '@angular/core';
import { NavController, LoadingController, App, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { DetailPage } from '../detail/detail';
import { DetailBeritaPage } from '../detail-berita/detail-berita';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  datas:any;
  vessels:any[]=[];
  news:any[]=[];
  produks:any[]=[];
  jumlah_kapal:any;
  constructor(public navCtrl: NavController, private http:Http, private loadingCtlr:LoadingController, private app:App, private alertCtlr:AlertController) {
    this.getProduct();
    this.getVesselTotal();
    this.getFavorit();
    this.getBerita();
  }

  getProduct(){
  	let loading = this.loadingCtlr.create({
  	  spinner : 'dots',
  	  content : 'Retrieving product data from server...'
  	});
  	loading.present();
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/product/product.php')
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  loading.dismiss();
  	  this.datas=data.records;
      for(let i=0;i<this.datas.length;i++){
        this.produks.push({
          "gambar_produk": encodeURI("http://vis.telkomsat.co.id/produk/"+this.datas[i].gambar_produk)
        })
      }
  	}, err=>{
  	  loading.dismiss();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrieve product data from server',
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
              this.getProduct();
            }
          }
        ]
      });
      alert.present();
  	})
  }

  getVesselTotal(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Retrieving total vessels registered from server...'
    });
    loading.present();
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/user/jumlah_kapal.php?id_user='+localStorage.getItem('id_vis'))
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      loading.dismiss();
      this.jumlah_kapal=data.jumlah_kapal;
    }, err=>{
      loading.dismiss();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrieve vessels registered data from server',
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
              this.getVesselTotal();
            }
          }
        ]
      });
      alert.present();
    })
  }

  getFavorit(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Retrieving favorit vessel data from server...'
    });
    loading.present();
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/user/favorit.php?id_user='+localStorage.getItem('id_vis'))
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
      loading.dismiss();
      if(data.records){
        for(let i = 0; i<data.records.length; i++){
          this.vessels.push({
            "id_node":data.records[i].id_node,
            "nama_node":data.records[i].nama_node,
            "foto": encodeURI("http://vis.telkomsat.co.id/images_backup/"+data.records[i].foto),
          })
        }
      }else{

      }
  	  
  	}, err=>{
      loading.dismiss();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrieve favorit vessel data from server',
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
              this.getFavorit();
            }
          }
        ]
      });
      alert.present();
  	})
  }

  getBerita(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Retrieving maritime news from server...'
    });
    loading.present();
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/berita/get_berita_v2.php')
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
      loading.dismiss();
  	  for(let i = 0; i<data.records.length; i++){
        this.news.push({
          "id_berita":data.records[i].id_berita,
          "judul_berita":data.records[i].judul_berita,
          "preview_berita":data.records[i].preview_berita,
          "gambar_berita":encodeURI(data.records[i].gambar_berita),
        })
      }
  	}, err=>{
      loading.dismiss();
       let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrieve maritime news from server',
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
      });
      alert.present();
  	})
  }

  doRefresh(event){
    this.vessels=[];
    this.news=[];
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/product/product.php')
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      this.datas=data.records;
      event.complete();
    }, err=>{
      event.complete();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrieve product data from server',
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
              this.getProduct();
            }
          }
        ]
      });
      alert.present();
    });

    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/user/favorit.php?id_user='+localStorage.getItem('id_vis'))
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      for(let i = 0; i<data.records.length; i++){
        this.vessels.push({
          "id_node":data.records[i].id_node,
          "nama_node":data.records[i].nama_node,
          "foto": encodeURI("http://vis.telkomsat.co.id/images_backup/"+data.records[i].foto),
        });
        event.complete();
      }
    }, err=>{
      event.complete();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrieve favorit vessel data from server',
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
              this.getFavorit();
            }
          }
        ]
      });
      alert.present();
    });

    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/berita/get_berita_v2.php')
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      for(let i = 0; i<data.records.length; i++){
        this.news.push({
          "id_berita":data.records[i].id_berita,
          "judul_berita":data.records[i].judul_berita,
          "preview_berita":data.records[i].preview_berita,
          "gambar_berita":encodeURI(data.records[i].gambar_berita),
        });
        event.complete();
      }
    }, err=>{
      event.complete();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrieve maritime news from server',
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
      });
      alert.present();
    })
  
  }


  goDetail(id_node,nama_node){
    this.app.getRootNav().push(DetailPage,{id_node:id_node,nama_node:nama_node},{animate:true,direction:'forward'});
  }

  goDetailBerita(id_berita){
    this.app.getRootNav().push(DetailBeritaPage,{id_berita:id_berita},{animate:true,direction:'forward'});
  }

}
