import { Component } from '@angular/core';
import {App, NavController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import {Events} from 'ionic-angular';
import * as $ from 'jquery';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ServiceProvider } from '../../providers/service/service';
import { ModalController , ViewController  } from 'ionic-angular';
import { BooknowPage } from '../booknow/booknow';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-villa-sale-query',
  templateUrl: 'villa_sale_query.html'
})
export class Villa_sale_queryPage {

  public yachtFilterParams:any;
  public userDetails:any;
  public msg:string;
  public pageCounter:number;
  villaDetails:any;

    constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events, public modalCtrl: ModalController, public datepipe: DatePipe,public app:App, public viewCtrl : ViewController) {
      this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
      this.villaDetails = JSON.parse(window.localStorage.getItem('villaSalesRantObject'));
      
    }

  dismiss() {
    this.viewCtrl.dismiss();
  }
 
  getCurrency(currencyId){
    return this.serviceVar.getCurrencyInSymbol(currencyId)
   }
      
    ngOnInit() {
      this.callAllSubscribe(this.events);
    }


   callAllSubscribe(events){
      events.subscribe('villaSalesEvent', object => {
             this.serviceVar.showLoader('Thank You for Query!!...');
            setTimeout(()=>{
              this.serviceVar.hideToModal();
            if(this.pageCounter <= 1){
              this.app.getRootNav().setRoot(BooknowPage);
            }
              
            },300);

            this.pageCounter++;
      });
   }


  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = Villa_sale_queryPage;
    }
    
  }

   queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }

  submitQuery(){

     if(this.msg == null ){
        this.serviceVar.openAlert("Alert!!","Request Could not be Blank");
        return false;
      }
          var mailId  =  this.userDetails.mailId;
          var name =     this.userDetails.firstName +' '+this.userDetails.lastName;
          var countryId =  "";
          var msg = this.msg;
          var departureDate =  "";
          this.pageCounter = 1;
          this.serviceVar.VillaSalesDetails(mailId,name,countryId,msg,departureDate);
  }


  public event = {
    month: '1990-02-19',
    timeStarts: '07:00',
  }


 




}
