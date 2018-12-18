import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';


@IonicPage()
@Component({
  selector: 'page-sub-sensor',
  templateUrl: 'sub-sensor.html',
})
export class SubSensorPage {
  id_sensor:any;
  sensors:any;
  nama_sensor:any;
  datas:any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, private loadingCtlr:LoadingController, private alertCtlr:AlertController, private actionSheet:ActionSheetController) {
  	this.id_sensor=this.navParams.get('id_sensor');
  	this.nama_sensor=this.navParams.get('nama_sensor');
  	this.getSubSensor();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubSensorPage');
  }

  getSubSensor(){
   let loading = this.loadingCtlr.create({
  	  spinner:'dots',
  	  content:'Please wait...'
  	});
  	loading.present();
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/sensor/get_subsensor.php?id_sensor='+this.id_sensor)
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  loading.dismiss();
  	  this.sensors=data.records;
  	  for(let i=0;i<this.sensors.length;i++){
  	  	this.datas.push({
  	  	  'nama_sub_sensor':this.sensors[i].nama_sub_sensor,
  	  	  'nilai_sub_sensor':this.sensors[i].nilai_sub_sensor,
  	  	  'gambar_sub_sensor':encodeURI("http://vis.telkomsat.co.id/images_sensor/"+this.sensors[i].gambar_sub_sensor),
  	  	  'satuan_sub_sensor':this.sensors[i].satuan_sub_sensor,
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
  	  	  		this.getSubSensor();
  	  	  	}
  	  	  }
  	  	]
  	  });
  	  alert.present();
  	});
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
