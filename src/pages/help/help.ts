import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  txtphone:string;
  txtsubject:string;
  txtmessage:string;
  formgroup:FormGroup;
  phone:AbstractControl;
  subject:AbstractControl;
  message:AbstractControl;
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtlr:LoadingController, private formbuilder:FormBuilder, private http : Http, private alertCtlr:AlertController) {
  	this.formgroup = formbuilder.group({
      phone:['',Validators.compose([Validators.minLength(5),Validators.maxLength(50),Validators.required])],
      subject:['',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(100)])],
      message:['',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(1000)])]
    });
    this.phone=this.formgroup.controls['phone'];
    this.subject=this.formgroup.controls['subject'];
    this.message=this.formgroup.controls['message'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  doHelp(){
    let loading = this.loadingCtlr.create({
      spinner : 'dots',
      content : 'Please wait...'
    });
    loading.present();
    this.http.get('http://vis.telkomsat.co.id/api.vessel.tracking/app/hubungi.php?id_user='+localStorage.getItem('id_vis')+'&telpon='+this.txtphone+'&subjek='+this.txtsubject+'&pesan='+this.txtmessage)
    .timeout(3*1000)
    .map(res=>res.json())
    .subscribe(data=>{
	  loading.dismiss();
	  let alert = this.alertCtlr.create({
	  	title : 'Thank you',
	  	message : 'thank you for your question, we will try to answer it as soon as posible',
	  	buttons : ['Ok'],
	  });
	  alert.present()
    },err=>{
      loading.dismiss();
      let alert = this.alertCtlr.create({
	  	title : 'Error',
	  	message : 'internet connection lost, please try again',
	  	buttons : ['Ok'],
	  });
	  alert.present()
    });
  }



}
