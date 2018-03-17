import { Component } from '@angular/core';
import { NavController , ViewController} from 'ionic-angular';
import {Events} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { BooknowPage } from '../booknow/booknow';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {

    public email :any;
     public pageCounter:number;
    //public userDetails :any;


  	constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events, private _storage: Storage,public viewCtrl: ViewController) {
	

   	}


   ngOnInit() {
    this.callAllSubscribe(this.events);
   } 

   		callAllSubscribe(events){

 		 events.subscribe('forgotPasswordEvent', object => {
 		 	if(object == true){
             this.dismiss();
            
               if(this.pageCounter <= 1){
                 this.navCtrl.push(BooknowPage);
               }
                
             
            }else{

            
             this.serviceVar.openAlert("Alert!!","Email/User Does not exist!!");
             
             return false;
         }
          
          this.pageCounter++;
  		 });
	}

  goLogin(){
    this.navCtrl.push(LoginPage);
  }

	submitForm(){

      //change password submit validation

 
      if(this.email == null || this.email  < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter Your Email.");
        return false;
      }
      this.pageCounter = 1;
      this.serviceVar.forgotPassword(this.email);

  }


   dismiss() {
    this.viewCtrl.dismiss();
   }

}
