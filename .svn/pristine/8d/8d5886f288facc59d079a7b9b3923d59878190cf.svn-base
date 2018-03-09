import { Component } from '@angular/core';
import {App, NavController } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { BooknowPage } from '../booknow/booknow';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

    public newPassword :any;
    public confirmPassword :any;
    public userDetails :any;
    public pageCounter:number;

    constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events, private _storage: Storage,public app:App) {
	
    }

   ngOnInit() {
    this.callAllSubscribe(this.events);
   }



	callAllSubscribe(events){

 		 events.subscribe('changePasswordEvent', object => {
 		 	if(object == true){

          
                  if(this.pageCounter <= 1){
                       
                     this.app.getRootNav().setRoot(BooknowPage);
                   }

            }else{

             this.serviceVar.openAlert("Alert!!","Error! Please try again!!");
            
             return false;
         }

              this.pageCounter++; 

  		 });
	}

	submitForm(){

      //change password submit validation

 
      if(this.newPassword ==null || this.newPassword  < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter New Password");
        return false;
      }
      
      
      if(this.confirmPassword==null || this.confirmPassword < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter Confirm Password");
        return false;
      }

      if(this.newPassword == this.confirmPassword){
      	
      	this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
         this.pageCounter = 1;
        this.serviceVar.changePassword(this.userDetails.id,this.newPassword);

      }

  }

}
