import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
declare var google;


@IonicPage()
@Component({
  selector: 'page-md-detail',
  templateUrl: 'md-detail.html',
})
export class MdDetailPage {
  @ViewChild('map') mapElement:ElementRef;
  nama_node:any;
  map:any;
  locations:any;
  markers:any=[];
  id_user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view:ViewController) {
  	this.nama_node=this.navParams.get('nama_node');
  }

  ionViewDidLoad() {
    this.showMap();
  }

  showMap(){
  	let mapOptions = {
    	zoom : 5,
    	mapTypeId: google.maps.MapTypeId.ROADMAP,
    	center: new google.maps.LatLng(-2.054689, 116.806152),
    	mapTypeControl:false,
		streetViewControl:false,
		fullScreenControl:false,
		zoomControl:false,
    }
    this.map= new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  closeModal(){
  	this.view.dismiss();
  }

}
