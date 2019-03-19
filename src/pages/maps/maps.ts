import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ActionSheetController,App, LoadingController, PopoverController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { MdDetailPage } from '../md-detail/md-detail';
import { DetailPage } from '../detail/detail';
import { SearchResultMapPage } from '../search-result-map/search-result-map';
import { PopoverPage } from '../popover/popover';
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
  MyMarker:any;
  image :any;
  CustomHeading:any;
  ShowSearchText:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http, public alertCtlr : AlertController, private modalCtlr:ModalController, private actionSheet:ActionSheetController, private app:App, private loadingCtlr:LoadingController, private popoverCtlr:PopoverController ) {
    this.id_user=localStorage.getItem('id_vis');
  	
  }

  ionViewDidLoad() {
    this.showMap();
    this.getPosition();
    this.refreshMarker();
  }

  onSearch(event){
    this.app.getRootNav().push(SearchResultMapPage,{search:event.target.value},{animate:true,direction:'forward'});
  }

  showMap(){
  	let mapOptions = {
    	zoom : 5,
    	mapTypeId: 'roadmap',
    	center: new google.maps.LatLng(-2.054689, 116.806152),
    	mapTypeControl:false,
		  streetViewControl:false,
		  fullScreenControl:false,
		  zoomControl:false,

    }
    this.map= new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
  customHeading(nilai,pembulat){
    this.CustomHeading=(Math.ceil(parseInt(nilai))%parseInt(pembulat) == 0) ? Math.ceil(parseInt(nilai)) : Math.round((parseInt(nilai)+parseInt(pembulat)/2)/parseInt(pembulat))*parseInt(pembulat);
    console.log(this.CustomHeading);
  }
  getPosition(){
  	let marker;
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/vessel/realtime/realtime.php?id_user='+this.id_user)
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  this.locations = data.locations;

      for(let i=0;i<this.locations.length;i++){
        let direction = new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng);
        let station = new google.maps.LatLng(this.locations[i].latheading, this.locations[i].longheading);
        let heading = google.maps.geometry.spherical.computeHeading(direction,station);
        this.customHeading(heading,10);
        this.image = {
          url: '../../assets/imgs/marker_map/normal/01.png',
          scaledSize: new google.maps.Size(70, 70),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(12.5,12.5)
        }
        marker = new google.maps.Marker({
	        position: new google.maps.LatLng(this.locations[i].lat,this.locations[i].lng),
	        map: this.map,
          //icon:this.image,
        });
        marker.setIcon({
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor : this.locations[i].stroke_color,
          fillColor: this.locations[i].fill_color,
          path: "M 0.00 0.02 C 18.62 18.54 37.08 37.22 55.76 55.67 C 73.87 37.70 91.68 19.41 110.00 1.70 L 110.00 145.39 C 91.67 164.07 72.95 182.37 54.58 201.00 L 54.53 201.00 C 36.33 182.89 18.26 164.64 0.00 146.58 L 0.00 0.02 Z",
          scale: 0.060,
          rotation: heading
        })
        let nama_node = this.locations[i].node_name;
        let id_node = this.locations[i].host_id;
        let last_seen = this.locations[i].status_poll;
        let foto = this.locations[i].foto;
        google.maps.event.addListener(marker, 'click', () =>{
          /*let action = this.actionSheet.create({
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
          action.present();*/
          let popover = this.popoverCtlr.create(PopoverPage,{nama_node:nama_node,id_node:id_node,foto:foto, last_seen:last_seen});
          popover.present();
        });
        this.markers.push(marker);
  	  }
  	  //this.markerCluster = new MarkerClusterer(this.map, this.markers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
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
        //this.markerCluster.clearMarkers();
    }
    this.markers=[];
    this.getPosition();
  }

  refreshMarker(){
  	setInterval(() => {
  	  for (let i=0;i<this.markers.length;i++){
  	  	this.markers[i].setMap(null);
  	  	//this.markerCluster.clearMarkers();
  	  }
  	  this.markers=[];
      this.getPosition();
    }, 60*1000);
  }

}
