import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
declare var google;
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
  	this.http.get('http://vts.patrakom.co.id/api.new/marker/marker.php?id_user='+this.id_user)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  this.locations = data.locations;
      Object.keys(this.locations).forEach(key=> {
      	marker = new google.maps.Marker({
	        position: new google.maps.LatLng(this.locations[key].latitude,this.locations[key].longitude),
	        map: this.map,
        });
        let direction = new google.maps.LatLng(this.locations[key].latitude, this.locations[key].longitude);
        let station = new google.maps.LatLng(this.locations[key].latitude_heading, this.locations[key].longitude_heading);
        let heading = google.maps.geometry.spherical.computeHeading(direction,station)+180;
        marker.setIcon({
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor : this.locations[key].stroke_color,
          fillColor: this.locations[key].fill_color,
          path: "M70 125 L 70 245 180 245 180 125 Q 180 65 125 10 70 70 70 125 M 70 185 L 180 185",
          scale: 0.060,
          rotation: heading
        });
        let nama=this.locations[key].nama_remote;
        let id_kapal=this.locations[key].id_remote;
        google.maps.event.addListener(marker, 'click', () =>{
          let menuSheet = this.actionSheet.create({
            title: nama,
            cssClass : 'nama-kapal',
            buttons:[
              {
                text : 'Close',
                role : 'cancel',
                cssClass : 'mybutton',
                icon : 'ios-close-circle-outline',
                handler:()=>{
                  console.log('close');
                }
              },
              {
                text : 'Detail',
                icon : 'ios-help-buoy-outline',
                cssClass : 'mybutton',
                handler :()=>{
                  let modalDetail = this.modalCtlr.create(DetailPage, { nama_kapal : nama, id_kapal : id_kapal });
                  modalDetail.present();
                }

              },
              {
              	text : 'Tracking',
                icon :  'ios-clock-outline',
                cssClass : 'mybutton',
              	handler:()=>{
              	  let modalTracking = this.modalCtlr.create(ModalInputTrackingPage, { nama_kapal : nama, id_kapal :  id_kapal });
                  modalTracking.present();
              	}
              },
              
            ]
          });
          menuSheet.present();
        });
        
        this.markers.push(marker);
        console.log(this.markers);
	  });
  	});
  	
  }

}
