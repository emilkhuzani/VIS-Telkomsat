import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController, AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { AboutPage } from '../about/about';
import { FaqPage } from '../faq/faq';
import { HelpPage } from '../help/help';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  nama_user:string;
  email:string;
  nama_pelanggan:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private app:App, private loadingCtlr:LoadingController, private http:Http, private alertCtlr:AlertController) {
    this.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  goAbout(){
  	this.app.getRootNav().push(AboutPage,{},{animate:true,direction:'forward'});
  }

  goFaq(){
  	this.app.getRootNav().push(FaqPage,{},{animate:true,direction:'forward'});
  }

  goHelp(){
  	this.app.getRootNav().push(HelpPage,{},{animate:true,direction:'forward'});
  }

  getUser(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Retrieving user data from server...',
    });
    loading.present();
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/login/user.php?id_user='+localStorage.getItem('id_vis'))
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      loading.dismiss();  
      this.nama_user=data.nama_user;
      this.email=data.username;
      this.nama_pelanggan=data.nama_pelanggan;
    },err=>{
      loading.dismiss();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrive user data from server',
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
              this.getUser();
            }
          }
        ]
      })
      alert.present();
    })
  }
  signOut(){
    let alert = this.alertCtlr.create({
        title : 'Are You Sure?',
        message : 'Do you want to exit from Telkomsat Vessel Information System?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Sign Out',
            handler: () => {
              localStorage.removeItem('id_vis');
              this.app.getRootNav().setRoot(LoginPage);
            }
          }
        ]
      })
      alert.present();
  }

  doRefresh(event){
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/login/user.php?id_user='+localStorage.getItem('id_vis'))
    .timeout(10*1000)
    .map(res=>res.json())
    .subscribe(data=>{
      event.complete(); 
      this.nama_user=data.nama_user;
      this.email=data.username;
      this.nama_pelanggan=data.nama_pelanggan;
    },err=>{
      event.complete();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Cannt retrive user data from server',
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
              this.getUser();
            }
          }
        ]
      })
      alert.present();
    })
  }
}
