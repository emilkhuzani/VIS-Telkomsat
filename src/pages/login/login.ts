import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  txtemail:string;
  txtpassword:string;
  formgroup:FormGroup;
  email:AbstractControl;
  password:AbstractControl;
  id_vis:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formbuilder:FormBuilder, private loadingCtlr:LoadingController, private alertCtlr:AlertController, private http:Http ) {
  	this.formgroup = formbuilder.group({
      email:['',Validators.compose([Validators.email,Validators.minLength(5),Validators.maxLength(50),Validators.required])],
      password:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(50)])],
    });
    this.email=this.formgroup.controls['email'];
    this.password=this.formgroup.controls['password'];
  }
  doLogin(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Please wait...',
    });
    loading.present();
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = new RequestOptions({ headers: headers });
    let myData = {
      'email': this.txtemail,
      'password': this.txtpassword
    };
    this.http.post('http://vis.telkomsat.co.id/api.vessel.tracking/login/login.php',myData, requestOptions)
    .timeout(10*100)
    .map(res=>res.json())
    .subscribe(data=>{
      loading.dismiss();
      if(!data.pesanerror){
        localStorage.setItem('id_vis',data.id_user);
        this.navCtrl.push(TabsPage,{},{animate:true,direction:'forward'});
      }else{
        let alert = this.alertCtlr.create({
          title : 'Error',
          message : data.pesanerror,
          buttons : ['Ok'],
        });
        alert.present();
      }
    },err=>{
      loading.dismiss();
      let alert = this.alertCtlr.create({
        title : 'Error',
        message : 'Login failed, please try again',
        buttons : ['Ok'],
      });
      alert.present();
    });
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  forgotPassword(){
    let alert = this.alertCtlr.create({
        title : 'Are You Sure?',
        message : 'Do you want to reset your password? we will send email to you, and please follow the step on it',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Reset Password',
            handler: () => {
              
            }
          }
        ]
      });
      alert.present();
  }

}
