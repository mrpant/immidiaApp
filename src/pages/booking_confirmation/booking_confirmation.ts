import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@Component({
  selector: 'page-booking_confirmation',
  templateUrl: 'booking_confirmation.html'
})
export class Booking_confirmationPage {

	  public userDetails:any;
	  public yachtDetails:any;
	  public yachtFilterParams:any;
	  public bookingStaus:boolean;

	constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams) {
	  this.userDetails = this.serviceVar.userDetails;
      this.yachtDetails = JSON.parse(window.localStorage.getItem('yachtMoreDetailsObject'));
      this.yachtFilterParams = JSON.parse(window.localStorage.getItem('yachtFilterParams'));

      this.serviceVar.getBookingStatus(navParams.get('bookingId'));

  	  this.callAllSubscribe(events);		
  	}


	  	callAllSubscribe(events){

		   	 	events.subscribe('bookingStatusEvent', object => { // get yacht state by custom events
		         if(object != null){
		         	this.bookingStaus = object.status;
		         	window.localStorage.removeItem('yachtFilterParams');
		         	window.localStorage.removeItem('yachtMoreDetailsObject');
		         	window.localStorage.removeItem('yachtLimoObject');
		         	
		         }
		        });
		}

}


