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
import { CarContractPage } from '../carcontract/carcontract';
import { BooknowPage } from '../booknow/booknow';

@Component({
  selector: 'page-car_choice',
  templateUrl: 'car_choice.html'
})
export class Car_choicePage {

public carDetails:any;
public carFilterParams:any;
public imageUrl:string;
public transactionFee:number;
public carSubTotal :number;
public carTotal:number;
public isTerm:boolean;
public userDetails:any;
public driverDetails:any;



  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'no',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes'//Windows only    
    };

 constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,private iab: InAppBrowser,public modalCtrl: ModalController) {
 	    this.userDetails = JSON.parse(window.localStorage.getItem('userDetails')); 
      this.carDetails = JSON.parse(window.localStorage.getItem('carMoreDetailsObject'));
      this.carFilterParams = JSON.parse(window.localStorage.getItem('carFilterParams'));
      this.imageUrl = serviceVar.IMAGE_PATH; 
      this.transactionFee = 0;
      this.carSubTotal =0;
      this.carTotal = 0;
      this.isTerm = false;
      this.driverDetails = JSON.parse(window.localStorage.getItem('carDriverObject')); 

      this.serviceVar.showLoader('Please Wait Updating Information...');

               setTimeout(()=>{
                     this.serviceVar.hideLoader();
                     this.carSubTotal = parseInt(this.carFilterParams.price) + parseInt(this.carDetails.deliveryDetails.deliveryRate) + parseInt(this.carDetails.deliveryDetails.dropoffRate);
                     this.transactionFee = this.carSubTotal * 0.035;
                     this.carTotal = this.carSubTotal + this.transactionFee; 

                      if(window.localStorage.getItem('carFilterParams')!=null){
                      let carFilterParams = JSON.parse(window.localStorage.getItem('carFilterParams'));
                      carFilterParams.carTotal = this.carTotal;
                      window.localStorage.setItem('carFilterParams',JSON.stringify(carFilterParams));
                    }



                 },1000);
    
  }

    ngOnInit() {
    this.callAllSubscribe(this.events);
   }


    goToContract(){
    this.navCtrl.push(CarContractPage);
     }  

   presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = Car_choicePage;
    }
    
  }

  queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }
  
 getCurrency(currencyId){
    return this.serviceVar.getCurrencyInSymbol(currencyId)
  }


    callAllSubscribe(events){
      events.subscribe('OrderEvent', object => { // send request to immidia Build
              
               if(object!=null && object !=""){

                 setTimeout(()=>{
                   this.serviceVar.hideLoader();
                 },1000);

                    const browser = this.iab.create('http://www.immidia.co/immidia/api/ws/controller/?access=true&action=payment&bookingId='+object,"_system",this.options);
                 window.localStorage.removeItem('carFilterParams');
                 window.localStorage.removeItem('carMoreDetailsObject');
                 window.localStorage.removeItem('carDriverObject')

               }
               setTimeout(()=>{
             
               this.navCtrl.popTo(BooknowPage);
               });
        
           });
    }





   isPay(selectedValue:any){
     this.isTerm = selectedValue;
   }



  submitOrder(){

  

    //prepare parameter for yacht submit order
    let carOrderRequest = {
          "id" : this.carDetails.id,
          "ownerId":this.carDetails.userId,
          "price": Math.floor(this.carTotal),
          "bookingType":1,
          "departureDate": this.carFilterParams.departureDate,
          "arrivalDate":this.carFilterParams.arrivalDate,
          "fromArea":this.carFilterParams.departureCityName,
          "total": Math.floor(this.carTotal),
          "type":"Add",
          "toArea":this.carFilterParams.arrivalCityName,
          "currency":this.serviceVar.getCurrency(this.carDetails.currencyId),
          "userId":this.userDetails.id,
          "guests":this.carFilterParams.guest,
          "deliveryPrice": Math.floor(this.carDetails.deliveryDetails.deliveryRate),
          "dropoffRate": Math.floor(this.carDetails.deliveryDetails.dropoffRate),
          "productPrice":Math.floor(this.carDetails.price),
          "websiteId":0, // 0 for only immidia
          "subtotal": Math.floor(this.carSubTotal),
          "departureDateTime":this.carFilterParams.departureHour,
          "transactionFee": Math.floor(this.transactionFee),
          "isDriverOne" : (this.driverDetails != null) ? this.driverDetails.isDriverOne : null,
          "driverOneName" :  (this.driverDetails)?this.driverDetails.driverOneName:null,
          "driverOneDOB" :  (this.driverDetails)?this.driverDetails.driverOneDOB:null,
          "driverOneLicenseIssue" :  (this.driverDetails)?this.driverDetails.driverOneLicenseIssue:null,
          "isDriverTwo" : (this.driverDetails)?this.driverDetails.isDriverTwo:null,
          "driverTwoName" :  (this.driverDetails)?this.driverDetails.driverTwoName:null,
          "driverTwoDOB" :  (this.driverDetails)?this.driverDetails.driverTwoDOB:null,
          "driverTwoLicenseIssue" :  (this.driverDetails)?this.driverDetails.driverTwoLicenseIssue:null
      };




   console.log("carOrderRequest"+JSON.stringify(carOrderRequest));
 
      
      if(this.isTerm == true){
        this.serviceVar.SubmitOrder(carOrderRequest);
      }else{
        this.serviceVar.openAlert("Alert!!",'Please Read Contract Terms & Conditions. ');
        return false;
      }
    

  }

}

