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
  selector: 'page-super_yacht',
  templateUrl: 'super_yacht.html'
})
export class super_yachtPage {

  public yachtFilterParams:any;
  public userDetails:any;
  public msg:string;
  public pageCounter:number;

    constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events, public modalCtrl: ModalController, public datepipe: DatePipe,public app:App) {
      this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
      this.yachtFilterParams = JSON.parse(window.localStorage.getItem('yachtFilterParams'));
    }

      
    ngOnInit() {
      this.callAllSubscribe(this.events);
    }


   callAllSubscribe(events){
      events.subscribe('superYachtEvent', object => {
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
      this.serviceVar.loginCurrentPages = super_yachtPage;
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
          var countryId =  this.yachtFilterParams.countryName;
          var msg = this.msg;
          var state = this.yachtFilterParams.stateName;
          var routeType = this.yachtFilterParams.routeType == 1 ?  'one way' : 'Return';
          var days = this.yachtFilterParams.days;
          var departureDate =  this.yachtFilterParams.departureDate;
          var depPort =  this.yachtFilterParams.departureCityName;
          var arrPort =  this.yachtFilterParams.arrivalCityName;
          var guest =   this.yachtFilterParams.guest;
            this.pageCounter = 1;
          this.serviceVar.superYachtDetails(mailId,name,countryId,msg,state,routeType,days,departureDate,depPort,arrPort,guest)
  }


  public event = {
    month: '1990-02-19',
    timeStarts: '07:00',
  }


 




}
