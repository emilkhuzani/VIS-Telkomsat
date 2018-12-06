import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, public actionSheet : ActionSheetController, private modalCtlr:ModalController ) {
    this.id_user=localStorage.getItem('id_vis');
  	
  }

  ionViewDidLoad() {
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
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/marker_v3_second.php?id_user='+this.id_user)
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
        google.maps.event.addListener(marker, 'click', () =>{
          
        });
        this.markers.push(marker);
  	  }
  	  var markerCluster = new MarkerClusterer(this.map, this.markers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  	});
  	
  }

}
