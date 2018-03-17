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
  selector: 'page-yachtcontract',
  templateUrl: 'yachtcontract.html'
})
export class YachtContractPage {

  public yachtLimo:any;
  public userDetails:any;
  public yachtDetails:any;
  public yachtFilterParams:any;

     constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,private iab: InAppBrowser,public modalCtrl: ModalController) {
      this.yachtLimo = JSON.parse(window.localStorage.getItem('yachtLimoObject'));
      this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
      this.yachtDetails = JSON.parse(window.localStorage.getItem('yachtMoreDetailsObject'));
      this.yachtFilterParams = JSON.parse(window.localStorage.getItem('yachtFilterParams'));
       serviceVar.getUserDetailsObject(this.yachtDetails.userId); 
       this.callAllSubscribe(events);
      }


      callAllSubscribe(events){
      events.subscribe('userObjectEvent', object => { 
        this.yachtDetails.userId = object.firstName +' '+  object.lastName;
      });
    }


       presentModal(){

        if(this.serviceVar.isLogin){
          this.navCtrl.push(ProfilePage);
        }else{
          this.navCtrl.push(LoginPage);
          this.serviceVar.loginCurrentPages = YachtContractPage;
        }
        
      }

      queryForm(){
     
              let modal = this.modalCtrl.create(Modal1Page);
              modal.present();
          
      }

       getCurrency(currencyId){
          return this.serviceVar.getCurrencyInSymbol(currencyId)
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



