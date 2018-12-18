import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { SubSensorPage } from '../sub-sensor/sub-sensor';


@IonicPage()
@Component({
  selector: 'page-sensor',
  templateUrl: 'sensor.html',
})
export class SensorPage {
  id_node:any;
  nama_node:any;
  sensors:any;
  datas:any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtlr:LoadingController, private http:Http, private alertCtlr:AlertController, private actionSheet:ActionSheetController) {
  	this.id_node = this.navParams.get('id_node');
  	this.nama_node = this.navParams.get('nama_node');
  	this.getSensor();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SensorPage');
  }

  getSensor(){
  	let loading = this.loadingCtlr.create({
  	  spinner:'dots',
  	  content:'Please wait...'
  	});
  	loading.present();
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/sensor/get_sensor.php?id_node='+this.id_node)
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  loading.dismiss();
  	  this.sensors=data.records;
  	  for(let i=0;i<this.sensors.length;i++){
  	  	this.datas.push({
  	  	  'id_sensor':this.sensors[i].id_sensor,
  	  	  'name_sensor':this.sensors[i].name_sensor,
  	  	  'gambar_sensor':encodeURI("http://vis.telkomsat.co.id/images_sensor/"+this.sensors[i].gambar_sensor),
  	  	  'have_sub':this.sensors[i].have_sub,
  	  	  'satuan_sensor':this.sensors[i].satuan_sensor,
  	  	  'hasil':this.sensors[i].hasil
  	  	});
  	  }
  	},err=>{
  	  loading.dismiss();
  	  let alert = this.alertCtlr.create({
  	  	title : 'Error',
  	  	message : 'Something wrong when connecting to server',
  	  	buttons : [
  	  	  {
  	  	  	text : 'Cancel',
  	  	  	role : 'cancel',
  	  	  	handler : ()=>{
  	  	  	  console.log('cancel');
  	  	  	}

  	  	  },
  	  	  {
  	  	  	text : 'Try Again',
  	  	  	handler : ()=> {
  	  	  	  this.getSensor();
  	  	  	}
  	  	  }
  	  	]
  	  });
  	  alert.present();
  	});
  }

  openSub(id_sensor,nama_sensor){
  	this.navCtrl.push(SubSensorPage,{id_sensor:id_sensor,nama_sensor:nama_sensor},{animate:true,direction:'forward'});
  }

  openMenu(string,string_1,string_2){
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

}
