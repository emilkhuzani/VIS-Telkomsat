import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { DetailPage } from '../detail/detail';
import { FollowVesselPage } from '../follow-vessel/follow-vessel';

@Component({
  selector: 'page-kapal',
  templateUrl: 'kapal.html',
})
export class KapalPage {
  vessels:any;
  datas:any[]=[];
  lastId:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, private loadingCtlr:LoadingController, private app : App) {
  	this.getVessel();
  }

  getVessel(){
  	let loading = this.loadingCtlr.create({
  	  spinner : 'dots',
  	  content : 'Please wait...',
  	});
  	loading.present();
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/list_vessel5.php?id_user='+localStorage.getItem('id_vis')+'&last_id=')
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  loading.dismiss();
  	  this.vessels=data.records;
      let vesselsData = this.vessels.length;
      this.lastId = this.vessels[vesselsData-1].id_node;
      console.log(this.lastId);
      for(let i = 0; i<this.vessels.length; i++){
          this.datas.push({
            "id_node":this.vessels[i].id_node,
            "nama_node":this.vessels[i].nama_node,
            "nama_pelanggan":this.vessels[i].owner,
            "foto": encodeURI("http://vis.telkomsat.co.id/images_backup/"+this.vessels[i].foto),
          })
        
      }
  	},err=>{
  	  loading.dismiss();
  	});
  }
  
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/list_vessel5.php?id_user='+localStorage.getItem('id_vis')+'&last_id='+this.lastId)
      .timeout(10*1000)
      .map(res=>res.json())
      .subscribe(data=>{
        if(data.pesan){

        }else{
          let panjangData = data.records.length;
          this.lastId = data.records[panjangData-1].id_node;
          for(let i=0;i<data.records.length;i++){
            this.datas.push({
              "id_node":data.records[i].id_node,
              "nama_node":data.records[i].nama_node,
              "nama_pelanggan":data.records[i].owner,
              "foto": encodeURI("http://vis.telkomsat.co.id/images_backup/"+data.records[i].foto),
            })
          }
        }
        
      },err=>{

      });
      infiniteScroll.complete();
    }, 500);
  }

  followVessel(nama_node,id_node){
    this.app.getRootNav().push(FollowVesselPage,{id_node:id_node,nama_node:nama_node},{animate:true, direction:'forward'});
  }

  goDetail(id_node,nama_node){
    this.app.getRootNav().push(DetailPage, {id_node:id_node,nama_node:nama_node}, {animate:true,direction:'forward'});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KapalPage');
  }

}
