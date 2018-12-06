import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  datas:any;
  vessels:any[]=[];
  news:any[]=[];
  constructor(public navCtrl: NavController, private http:Http, private loadingCtlr:LoadingController) {
    this.getProduct();
    this.getFavorit();
    this.getBerita();
  }

  getProduct(){
  	let loading = this.loadingCtlr.create({
  	  spinner : 'dots',
  	  content : 'Please wait...'
  	});
  	loading.present();
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/product/product.php')
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  loading.dismiss();
  	  this.datas=data.records;
  	}, err=>{
  	  loading.dismiss();
  	})
  }

  getFavorit(){
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/user/favorit.php?id_user='+localStorage.getItem('id_vis'))
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  for(let i = 0; i<data.records.length; i++){
        this.vessels.push({
          "nama_node":data.records[i].nama_node,
          "foto": "http://vis.telkomsat.co.id/images_backup/"+data.records[i].foto,
        })
      }
  	}, err=>{
  	})
  }

  getBerita(){
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/berita/get_berita.php')
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  for(let i = 0; i<data.records.length; i++){
        this.news.push({
          "judul_berita":data.records[i].judul_berita,
          "preview_berita":data.records[i].preview_berita,
          "gambar_berita":data.records[i].gambar_berita,
        })
      }
  	}, err=>{
  	})
  }

}
