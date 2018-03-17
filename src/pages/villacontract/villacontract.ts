import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-villacontract',
  templateUrl: 'villacontract.html'
})
export class VillaContractPage {

  public villaLimo:any;
  public userDetails:any;
  public villaDetails:any;
  public villaFilterParams:any;

  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,private iab: InAppBrowser,public modalCtrl: ModalController) {
       this.villaLimo = JSON.parse(window.localStorage.getItem('villaDriverObject'));
      this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
      this.villaDetails = JSON.parse(window.localStorage.getItem('villaMoreDetailsObject'));
      this.villaFilterParams = JSON.parse(window.localStorage.getItem('villaFilterParams'));
       serviceVar.getUserDetailsObject(this.villaDetails.userId);
        this.callAllSubscribe(events);
  }

    callAllSubscribe(events){
      events.subscribe('userObjectEvent', object => { 
        this.villaDetails.userId = object.firstName +' '+  object.lastName;
      });
    }



  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = VillaContractPage;
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
    
   
  getCurrency(currencyId){
          return this.serviceVar.getCurrencyInSymbol(currencyId)
       }

}



