import { Component } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, private http:Http, private loadingCtlr:LoadingController, private app:App) {
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
          "id_node":data.records[i].id_node,
          "nama_node":data.records[i].nama_node,
          "foto": encodeURI("http://vis.telkomsat.co.id/images_backup/"+data.records[i].foto),
        })
      }
  	}, err=>{
  	})
  }

  getBerita(){
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
        })
      }
  	}, err=>{
  	})
  }

  goDetail(id_node,nama_node){
    this.app.getRootNav().push(DetailPage,{id_node:id_node,nama_node:nama_node},{animate:true,direction:'forward'});
  }

  goDetailBerita(id_berita){
    this.app.getRootNav().push(DetailBeritaPage,{id_berita:id_berita},{animate:true,direction:'forward'});
  }

}
