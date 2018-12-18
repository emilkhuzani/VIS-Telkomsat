import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-modal-reset',
  templateUrl: 'modal-reset.html',
})
export class ModalResetPage {
  txtemail:any;
  formgroup:FormGroup;
  email:AbstractControl;
  pesan:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view:ViewController, private formbuilder:FormBuilder, private http:Http, private loadingCtlr:LoadingController, private alertCtlr:AlertController) {
  	this.formgroup = formbuilder.group({
      email:['',Validators.compose([Validators.required, Validators.email])],
    });
    this.email=this.formgroup.controls['email'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalResetPage');
  }

  closeModal(){
  	this.view.dismiss();
  }

  doReset(){
  	let loading = this.loadingCtlr.create({
  	  spinner : 'dots',
  	  content : 'Please wait...'
  	});
  	loading.present();
  	this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/login/reset_password.php?email='+this.txtemail)
  	.timeout(10*1000)
  	.map(res=>res.json())
  	.subscribe(data=>{
  	  loading.dismiss();
  	  this.pesan = data.pesan;
  	}, err=>{
  	  loading.dismiss();
      let alert = this.alertCtlr.create({
	  	title : 'Error',
	  	message : 'Something wrong when sending message to server',
	  	buttons : ['Ok'],
	  });
	  alert.present()
  	});
  }

}
