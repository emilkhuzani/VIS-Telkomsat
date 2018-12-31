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
  CustomHeading:any;
  image:any;
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
      styles:[
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
      },
      {
        "featureType": "poi.attraction",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "100"
            }
        ]
      },
      {
        "featureType": "poi.business",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "100"
            }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
      },
      {
        "featureType": "poi.place_of_worship",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "100"
            }
        ]
      },
      {
        "featureType": "poi.school",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
      },
      {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "100"
            }
        ]
      },
      {
        "featureType": "poi.sports_complex",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
      },
      {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
      },
      {
        "featureType": "transit.station.bus",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
      },
      {
        "featureType": "transit.station.rail",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#15556f"
            },
            {
                "lightness": 17
            }
        ]
      }
    ]
    }
    this.map= new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
  customHeading(nilai,pembulat){
    this.CustomHeading=(Math.ceil(parseInt(nilai))%parseInt(pembulat) == 0) ? Math.ceil(parseInt(nilai)) : Math.round((parseInt(nilai)+parseInt(pembulat)/2)/parseInt(pembulat))*parseInt(pembulat);
    console.log(this.CustomHeading);
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
        let direction = new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng);
        let station = new google.maps.LatLng(this.locations[i].latheading, this.locations[i].longheading);
        let heading = google.maps.geometry.spherical.computeHeading(direction,station)+180;
        this.customHeading(heading,10);
        this.image = {
          url: '../../assets/imgs/marker_map/'+this.CustomHeading+'.png',
          scaledSize: new google.maps.Size(30, 30),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0,0)
        }
  	  	marker = new google.maps.Marker({
	        position: new google.maps.LatLng(this.locations[i].lat,this.locations[i].lng),
	        map: this.map,
          icon:this.image,
        });
        
        /*marker.setIcon({
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor : this.locations[i].stroke_color,
          fillColor: this.locations[i].fill_color,
          path: "M70 125 L 70 245 180 245 180 125 Q 180 65 125 10 70 70 70 125 M 70 185 L 180 185",
          scale: 0.060,
          rotation: heading
        });*/
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
        title : 'Error',
        message : 'Cannt retrive data from server',
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
      })
      alert.present();
  	});
  	
  }

}
