import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { ServiceProvider } from '../../providers/service/service';

@Component({
  selector: 'page-modal1',
  templateUrl: 'modal1.html'
})
export class Modal1Page {

	public contactNumber:string;
	public msg:string;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController,public sms: SMS, public serviceVar :ServiceProvider ) {
  	this.contactNumber = '+971 56 446 5203';
  	this.msg = ''+
				'Team IMMIDA - Instant Luxury Experiences.';
  }


  sendSms(){

    if(this.msg == ""){
      this.serviceVar.openAlert("_Blank","Message Could not be blank");
      return false;
    }

  	this.sms.send(this.contactNumber, this.msg);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
