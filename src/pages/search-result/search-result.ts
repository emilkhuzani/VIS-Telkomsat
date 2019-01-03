import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, App, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { DetailPage } from '../detail/detail';
import { FollowVesselPage } from '../follow-vessel/follow-vessel';


@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {
  vessels:any;
  datas:any[]=[];
  pencarian:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, private loadingCtlr:LoadingController, private app : App, private alertCtlr:AlertController) {
  	this.pencarian=this.navParams.get('search');
  	this.getVessel();
  }

  getVessel(){
  	let loading = this.loadingCtlr.create({
  	  spinner : 'dots',
  	  content : 'Retrieving vessels data from server...',
  	});
  	loading.present();
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/search_list.php?id_user='+localStorage.getItem('id_vis')+'&keyword='+this.pencarian)
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  loading.dismiss();
  	  this.vessels=data.records;
      let vesselsData = this.vessels.length;
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
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrieve vessels data from server',
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
              this.getVessel();
            }
          }
        ]
      });
      alert.present();
  	});
  }
  followVessel(nama_node,id_node){
    this.app.getRootNav().push(FollowVesselPage,{id_node:id_node,nama_node:nama_node},{animate:true, direction:'forward'});
  }

  goDetail(id_node,nama_node){
    this.app.getRootNav().push(DetailPage, {id_node:id_node,nama_node:nama_node}, {animate:true,direction:'forward'});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultPage');
  }

}

