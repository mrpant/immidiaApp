import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Villa_sale_listPage } from '../villa_sale_list/villa_sale_list';
import * as $ from 'jquery';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';


@Component({
  selector: 'page-villa-sale',
  templateUrl: 'villa_sale.html'
})
export class Villa_salePage {

  public villaCountry:any; 
  public country:number;
  public countryName:string;

  public pageCounter:number;

  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public modalCtrl: ModalController) {
  	//set yacht country data
      this.villaCountry = this.serviceVar.villaCountry;

  }

   ngOnInit() {
    this.callAllSubscribe(this.events);
   }


 presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = Villa_salePage;
    }
    
  }


   queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }

 callAllSubscribe(events){

  events.subscribe('villaSaleFilterEvent', object => { // get yacht state by custom events
        
         if(object != null){
             
             
             
                if(this.pageCounter <= 1){
                 this.navCtrl.push(Villa_sale_listPage,{"villaSaleFilterObject":object,"countryName":$('#country').text()});
                }
               
               
           
         }else{
          // this.serviceVar.hideLoader();
           this.serviceVar.openAlert("Alert!!","No Villa Avaialble for sale");
        
           return false;
         }
        this.pageCounter ++;
    });
  }

   submitVillaForm(){

       if(this.country==null || this.country < 0){
        this.serviceVar.openAlert("Alert!!","Please Select Country");
        return false;
       }
     this.pageCounter = 1;
     console.log("country"+this.country);
     this.serviceVar.getVillaSaleFilterData(this.country);
    
  }








}
