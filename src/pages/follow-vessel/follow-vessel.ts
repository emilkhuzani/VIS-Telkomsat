import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, App } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { DetailPage } from '../detail/detail';
declare var google;

@IonicPage()
@Component({
  selector: 'page-follow-vessel',
  templateUrl: 'follow-vessel.html',
})
export class FollowVesselPage {
  @ViewChild('map') mapElement:ElementRef;
  map:any;
  locations:any;
  markers:any=[];
  id_node:any;
  nama_node:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, private actionSheet: ActionSheetController, private alertCtlr:AlertController, private app:App) {
  	this.id_node=this.navParams.get('id_node');
  	this.nama_node=this.navParams.get('nama_node');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowVesselPage');
    this.showMap();
    this.getPosition();
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

  getPosition(){
  	let marker;
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/follow_ship_v3.php?id_kapal='+this.id_node)
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  this.locations = data.locations;
  	  for(let i=0;i<this.locations.length;i++){
  	  	let latLng = new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng);
        this.map.panTo(latLng);
  	  	marker = new google.maps.Marker({
	        position: new google.maps.LatLng(this.locations[i].lat,this.locations[i].lng),
	        map: this.map,
        });
        let direction = new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng);
        let station = new google.maps.LatLng(this.locations[i].latheading, this.locations[i].longheading);
        let heading = google.maps.geometry.spherical.computeHeading(direction,station)+180;
        marker.setIcon({
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor : this.locations[i].stroke_color,
          fillColor: this.locations[i].fill_color,
          path: "M70 125 L 70 245 180 245 180 125 Q 180 65 125 10 70 70 70 125 M 70 185 L 180 185",
          scale: 0.060,
          rotation: heading
        });
        let nama_node = this.locations[i].node_name;
        let id_node = this.locations[i].host_id;
        google.maps.event.addListener(marker, 'click', () =>{
          let action = this.actionSheet.create({
            title : nama_node,
            buttons: [
            {
              text: 'Detail Vessel',
              icon: 'boat',
              handler: () => {
                this.app.getRootNav().push(DetailPage, {id_node:id_node,nama_node:nama_node},{animate:true, direction:'forward'});
                console.log('Destructive clicked');
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
        });
        this.markers.push(marker);
  	  }
  	}, err=>{
  	  let alert = this.alertCtlr.create({
        title : "Error",
        message : "Internet connection lost",
        buttons : ['Ok'],
  	  });
  	  alert.present();
  	});
  	
  }

}
