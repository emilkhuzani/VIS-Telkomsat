import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { DetailBeritaPage } from '../detail-berita/detail-berita';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  news:any[]=[];
  lastId:any='';
  beritas:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http) {
  	this.getBerita();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  getBerita(){
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/berita/get_berita_v2.php?full=full&last_id=')
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  this.beritas = data.records;
  	  let PanjangData = this.beritas.length;
  	  this.lastId = this.beritas[PanjangData-1].id_berita;
  	  for(let i = 0; i<this.beritas.length; i++){
        this.news.push({
          "id_berita": this.beritas[i].id_berita,
          "judul_berita":this.beritas[i].judul_berita,
          "preview_berita":this.beritas[i].preview_berita,
          "gambar_berita":encodeURI(this.beritas[i].gambar_berita),
        })
      }
  	}, err=>{
  	})
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/berita/get_berita_v2.php?full=full&last_id='+this.lastId)
      .timeout(10*1000)
      .map(res=>res.json())
      .subscribe(data=>{
        if(data.pesan){

        }else{
          let panjangData = data.records.length;
          this.lastId = data.records[panjangData-1].id_berita;
          for(let i=0;i<data.records.length;i++){
            this.news.push({
              "id_berita": this.beritas[i].id_berita,
              "judul_berita":this.beritas[i].judul_berita,
              "preview_berita":this.beritas[i].preview_berita,
              "gambar_berita":encodeURI(this.beritas[i].gambar_berita),
            })
          }
        }
        
      },err=>{

      });
      infiniteScroll.complete();
    }, 500);
  }

  goDetail(id_berita){
    this.navCtrl.push(DetailBeritaPage,{id_berita:id_berita},{animate:true,direction:'forward'})
  }

}
