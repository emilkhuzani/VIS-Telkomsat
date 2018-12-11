import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ActionSheetController, ModalController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { DateTrackPage } from '../date-track/date-track';
import { WeekTrackPage } from '../week-track/week-track';
import { FollowVesselPage } from '../follow-vessel/follow-vessel';
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  nama_kapal:string;
  id_node:string;
  foto:string;
  favorit:boolean;
  distance:string;
  journey:string;
  speed:string;
  anchoring:string;
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
      content : 'Please wait...',
    });  
    loading.present();
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/detail_v3.php?id_node='+this.id_node)
    .timeout(3*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      loading.dismiss();
      this.foto=encodeURI('http://vis.telkomsat.co.id/images_backup/'+data.foto);
    },err=>{
      loading.dismiss();
    })
  }

  getVoyage(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Please wait...',
    });  
    loading.present();
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/history_voyage.php?id_node='+this.id_node)
    .timeout(3*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      loading.dismiss();
      this.distance = data.jarak;
      this.journey = data.waktu;
      this.speed = data.kecepatan;
      this.anchoring = data.lama_anchor;
    },err=>{
      loading.dismiss();
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
    let action = this.actionSheet.create({
      title : 'MAP TRACKING',
      buttons: [
            {
              text: 'Open Map',
              icon: 'map',
              handler: () => {
                this.navCtrl.push(WeekTrackPage,{id_node:this.id_node,nama_node:this.nama_kapal},{animate:true, direction:'forward'});
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

  openMapFollow(){
    let action = this.actionSheet.create({
      title : 'FOLLOW VESSEL',
      buttons: [
            {
              text: 'Open Map',
              icon: 'map',
              handler: () => {
                this.navCtrl.push(FollowVesselPage,{id_node:this.id_node,nama_node:this.nama_kapal},{animate:true, direction:'forward'});
              }
            },
            {
              text: 'Realtime',
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

  openModal(){
    let modal = this.modalCtlr.create(DateTrackPage,{id_node:this.id_node});
    modal.present();
  }

  cekFavorit(){
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/user/cek_favorit.php?id_node='+this.id_node+'&id_user='+localStorage.getItem('id_vis'))
    .timeout(3*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.hasil_cek=='tidakada'){
        this.favorit = true;
      }else{
        this.favorit = false;
      }
    },err=>{

    });
  }

  addFavorit(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Please wait...',
    });  
    loading.present();
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/user/tambah_favorit.php?id_node='+this.id_node+'&id_user='+localStorage.getItem('id_vis'))
    .timeout(3*1000)
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
        message : 'Internet connection lost, please try again',
        buttons : ['Ok'],
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
    .timeout(3*1000)
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
        message : 'Internet connection lost, please try again',
        buttons : ['Ok'],
      });
      alert.present();

    });
  }

}
