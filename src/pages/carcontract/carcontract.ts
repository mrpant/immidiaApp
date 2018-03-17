import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';


@Component({
  selector: 'page-carcontract',
  templateUrl: 'carcontract.html'
})
export class CarContractPage {

  public carDriver:any;
  public userDetails:any;
  public carDetails:any;
  public carFilterParams:any;

  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,private iab: InAppBrowser,public modalCtrl: ModalController) {
       this.carDriver = JSON.parse(window.localStorage.getItem('carDriverObject'));
       this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
       this.carDetails = JSON.parse(window.localStorage.getItem('carMoreDetailsObject'));
       this.carFilterParams = JSON.parse(window.localStorage.getItem('carFilterParams'));
       serviceVar.getUserDetailsObject(this.carDetails.userId);
        this.callAllSubscribe(events);

  }


    callAllSubscribe(events){
      events.subscribe('userObjectEvent', object => { 
        this.carDetails.userId = object.firstName +' '+  object.lastName;
      });
    }




    getCurrency(currencyId){
          return this.serviceVar.getCurrencyInSymbol(currencyId)
       }



   presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = CarContractPage;
    }
    
  }

  queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }
       
  shownGroup = null;
  specs = [
    { title: "Special Condition", description: "" }
   
  ];

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };
    
  

}



