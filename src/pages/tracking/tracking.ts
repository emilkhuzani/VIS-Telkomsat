import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
declare var google;

@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {
  @ViewChild('map') mapElement:ElementRef;
  map:any;
  locations:any;
  markers:any=[];
  id_node:any;
  path:any[]=[];
  nama_node:string;
  lastLatitude:any;
  lastLongitude:any;
  firstLatitude:any;
  firstLongitude:any;
  start:any;
  end:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, private loadingCtlr:LoadingController, private alertCtlr:AlertController) {
  	this.id_node=this.navParams.get('id_node');
  	this.nama_node=this.navParams.get('nama_node');
  	this.start=this.navParams.get('start');
  	this.end=this.navParams.get('end');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingPage');
    this.showMap();
    this.getMarker();
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

  getMarker(){
  	let marker,poly;
  	let infowindow = new google.maps.InfoWindow();
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Retrieving data from server...'
    });

    loading.present();
    let image = {
      url: "../../assets/imgs/marker/dot.png",
      size: new google.maps.Size(7, 7),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(3.5,3.5)
    };
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/tracking_vessel_v3.php?id_kapal='+this.id_node+'&start='+this.start+'&stop='+this.end)
    .timeout(15*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      loading.dismiss();
      this.markers = data.locations;
      let panjangData = this.markers.length;
      this.lastLatitude = this.markers[panjangData-1].lat;
      this.lastLongitude = this.markers[panjangData-1].long;
      this.firstLatitude = this.markers[0].lat;
      this.firstLongitude = this.markers[0].long;
      marker = new google.maps.Marker({
	    position: new google.maps.LatLng(this.lastLatitude,this.lastLongitude),
	    map: this.map,
	    label: 'E',
	  });
	  marker = new google.maps.Marker({
	    position: new google.maps.LatLng(this.firstLatitude,this.firstLongitude),
	    map: this.map,
	    label: 'S',
	  });
	  let latLng = new google.maps.LatLng(this.firstLatitude, this.firstLongitude);
    this.map.panTo(latLng);
      poly = new google.maps.Polyline({
        strokeColor: '#B25D71',
        strokeOpacity: 0.8,
        strokeWeight:3,
        map:this.map,
        icons: [{
          icon: {fillOpacity: 1,path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,scale: 2,fillColor: "#B25D71"},
          offset: '100%',
          repeat: '100px'
        }]
      });
      this.path = poly.getPath();
      for(let i=0;i<this.markers.length;i++){
        marker = new google.maps.Marker({
	      position: new google.maps.LatLng(this.markers[i].lat,this.markers[i].long),
	      map: this.map,
	      icon: image
        });
        let latitude = this.markers[i].lat;
        let longitude = this.markers[i].long;
        let update = this.markers[i].time_update;
        let nama_kapal = this.nama_node;
        this.path.push(new google.maps.LatLng(this.markers[i].lat,this.markers[i].long));
        google.maps.event.addListener(marker, 'click', (function(string) {
          return function() {
            infowindow.setContent('<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">'+nama_kapal+'</h1>'+
              '<div id="bodyContent">'+
              '<table width="100%" style="padding:10px;">'+
              '<tr>'+
              '<td style="padding:5px;"><b>Latitude</b></td>'+
              '<td style="padding:5px;">:</td>'+
              '<td style="padding:5px;">'+latitude+'</td>'+
              '</tr>'+
              '<tr>'+
              '<td style="padding:5px;"><b>Longitude</b></td>'+
              '<td style="padding:5px;">:</td>'+
              '<td style="padding:5px;">'+longitude+'</td>'+
              '</tr>'+
              '<tr>'+
              '<td style="padding:5px;"><b>Waktu Update</b></td>'+
              '<td style="padding:5px;">:</td>'+
              '<td style="padding:5px;">'+update+'</td>'+
              '</tr>'+
              '</table>'+
              '</div>'+
              '</div>');
            infowindow.open(this.map, string);
          }
        })(marker));
      }

    },err=>{
      loading.dismiss();
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
              this.getMarker();
            }
          }
        ]
      })
      alert.present();
    });
  }

}
