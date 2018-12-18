import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { TrackingPage } from '../tracking/tracking';


@IonicPage()
@Component({
  selector: 'page-date-track',
  templateUrl: 'date-track.html',
})
export class DateTrackPage {
  txtstart:any;
  txtend:any;
  formgroup:FormGroup;
  start:AbstractControl;
  end:AbstractControl;
  id_node:any;
  nama_node:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view : ViewController, private formbuilder:FormBuilder) {
    this.formgroup = formbuilder.group({
      start:['',Validators.compose([Validators.required])],
      end:['',Validators.compose([Validators.required])],
    });
    this.start=this.formgroup.controls['email'];
    this.end=this.formgroup.controls['password'];
    this.id_node=this.navParams.get('id_node');
    this.nama_node=this.navParams.get('nama_node');
  }

  closeModal(){
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateTrackPage');
  }

  doTracking(){
    this.navCtrl.push(TrackingPage,{id_node:this.id_node,nama_node:this.nama_node,start:this.txtstart,end:this.txtend},{animate:true,direction:'forward'});
  }

}
