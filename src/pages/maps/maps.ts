import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ActionSheetController,App, LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { MdDetailPage } from '../md-detail/md-detail';
import { DetailPage } from '../detail/detail';
declare var google, MarkerClusterer;

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  @ViewChild('map') mapElement:ElementRef;
  map:any;
  locations:any;
  markers:any=[];
  id_user:any;
  markerCluster:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, public alertCtlr : AlertController, private modalCtlr:ModalController, private actionSheet:ActionSheetController, private app:App, private loadingCtlr:LoadingController ) {
    this.id_user=localStorage.getItem('id_vis');
  	
  }

  ionViewDidLoad() {
    this.showMap();
    this.getPosition();
    this.refreshMarker();
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
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/marker_v3_second.php?id_user='+this.id_user)
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  this.locations = data.locations;
  	  for(let i=0;i<this.locations.length;i++){
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
        let last_seen = this.locations[i].status_poll;
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
              text: last_seen,
              icon: 'eye',
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
  	  this.markerCluster = new MarkerClusterer(this.map, this.markers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  	}, err=>{
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
              this.getPosition();
            }
          }
        ]
      });
      alert.present();
  	});
  	
  }

  refresh(){
    for (let i=0;i<this.markers.length;i++){
        this.markers[i].setMap(null);
        this.markerCluster.clearMarkers();
    }
    this.markers=[];
    this.getPosition();
  }

  refreshMarker(){
  	setInterval(() => {
  	  for (let i=0;i<this.markers.length;i++){
  	  	this.markers[i].setMap(null);
  	  	this.markerCluster.clearMarkers();
  	  }
  	  this.markers=[];
      this.getPosition();
    }, 60*1000);
  }

}
