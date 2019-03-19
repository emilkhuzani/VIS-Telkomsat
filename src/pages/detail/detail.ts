import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ActionSheetController, ModalController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { DateTrackPage } from '../date-track/date-track';
import { WeekTrackPage } from '../week-track/week-track';
import { FollowVesselPage } from '../follow-vessel/follow-vessel';
import { SensorPage } from '../sensor/sensor';
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  nama_kapal:string;
  id_node:string;
  foto:string;
  favorit:boolean;
  distance:any;
  journey:any;
  speed:string;
  anchoring:string;
  sensor:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, private loadingCtlr:LoadingController, private alertCtlr:AlertController, private actionSheet : ActionSheetController, private modalCtlr:ModalController) {
  	this.nama_kapal = this.navParams.get('nama_node');
  	this.id_node = this.navParams.get('id_node');
    this.getDetail();
    this.cekFavorit();
    this.getVoyage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  getDetail(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Retrieving vessel data from server...',
    });  
    loading.present();
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/detail_v3.php?id_node='+this.id_node)
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      loading.dismiss();
      this.sensor=data.sensor;
      this.foto=encodeURI('http://vis.telkomsat.co.id/images_backup/'+data.foto);
    },err=>{
      loading.dismiss();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrieve vessel data from server',
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
              this.getDetail();
            }
          }
        ]
      });
      alert.present();
    })
  }

  getVoyage(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Calculating voyage data...',
    });  
    loading.present();
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/history_voyage.php?id_node='+this.id_node)
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      loading.dismiss();
      this.distance = data.jarak;
      
      this.speed = data.kecepatan;
      if(this.distance==0){
        this.journey=0;
      }else{
        this.journey = data.waktu;
      }
      this.anchoring = data.lama_anchor;
    },err=>{
      loading.dismiss();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Something wrong when calculating data on server',
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
              this.getVoyage();
            }
          }
        ]
      });
      alert.present();
    });
  }

  openSheet(string,string_1,string_2){
    let action = this.actionSheet.create({
      title : string,
      buttons: [
            {
              text: string_1+' '+string_2,
              icon: 'boat',
              handler: () => {
              }
            },
            {
              text: '1 Week',
              icon: 'clock',
              handler: () => {
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              icon: 'close',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
    });
    action.present();
  }

  openMap(){
    this.navCtrl.push(WeekTrackPage,{id_node:this.id_node,nama_node:this.nama_kapal},{animate:true, direction:'forward'});
  }

  openMapFollow(){
    this.navCtrl.push(FollowVesselPage,{id_node:this.id_node,nama_node:this.nama_kapal},{animate:true, direction:'forward'});
    
  }

  openModal(){
    let modal = this.modalCtlr.create(DateTrackPage,{id_node:this.id_node,nama_node:this.nama_kapal});
    modal.present();
  }

  cekFavorit(){
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/user/cek_favorit.php?id_node='+this.id_node+'&id_user='+localStorage.getItem('id_vis'))
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.hasil_cek=='tidakada'){
        this.favorit = true;
      }else{
        this.favorit = false;
      }
    },err=>{
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
              this.cekFavorit();
            }
          }
        ]
      });
      alert.present();
    });
  }

  addFavorit(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Please wait...',
    });  
    loading.present();
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/user/tambah_favorit.php?id_node='+this.id_node+'&id_user='+localStorage.getItem('id_vis'))
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      loading.dismiss();
      if(data.pesan){
        this.cekFavorit();
      }
    },err=>{
      loading.dismiss();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt add vessel to favorit because connection to server lost',
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
              this.addFavorit();
            }
          }
        ]
      });
      alert.present();

    });
  }

  removeFavorit(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Please wait...',
    });  
    loading.present();
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/user/lepas_favorit.php?id_node='+this.id_node+'&id_user='+localStorage.getItem('id_vis'))
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      loading.dismiss();
      if(data.pesan){
        this.cekFavorit();
      }
    },err=>{
      loading.dismiss();
      
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt remove vessel from favorit because connection to server lost',
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
              this.removeFavorit();
            }
          }
        ]
      });
      alert.present();
    });
  }

  goSensor(){
    this.navCtrl.push(SensorPage,{id_node:this.id_node,nama_node:this.nama_kapal},{animate:true,direction:'forward'});
  }

  doRefresh(event){
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/detail_v3.php?id_node='+this.id_node)
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      event.complete();
      this.sensor=data.sensor;
      this.foto=encodeURI('http://vis.telkomsat.co.id/images_backup/'+data.foto);
    },err=>{
      event.complete();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrieve vessel data from server',
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
              this.getDetail();
            }
          }
        ]
      });
      alert.present();
    });

    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/history_voyage.php?id_node='+this.id_node)
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      event.complete();
      this.distance = data.jarak;
      this.journey = data.waktu;
      this.speed = data.kecepatan;
      this.anchoring = data.lama_anchor;
    },err=>{
      event.complete();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Something wrong when calculating data on server',
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
              this.getVoyage();
            }
          }
        ]
      });
      alert.present();
    });

    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/user/cek_favorit.php?id_node='+this.id_node+'&id_user='+localStorage.getItem('id_vis'))
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      event.complete();
      if(data.hasil_cek=='tidakada'){
        this.favorit = true;
      }else{
        this.favorit = false;
      }
    },err=>{
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
              this.cekFavorit();
            }
          }
        ]
      });
      alert.present();
    });


  }

}
