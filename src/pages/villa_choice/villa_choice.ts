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
import { VillaContractPage } from '../villacontract/villacontract';
import { BooknowPage } from '../booknow/booknow';

@Component({
  selector: 'page-villa_choice',
  templateUrl: 'villa_choice.html'
})
export class Villa_choicePage {

	public villaDetails:any;
	public villaFilterParams:any;
	public imageUrl:string;
	public transactionFee:number;
	public villaSubTotal:number;
	public villaTotal:number;
	public villaCartAmount:number;
  public isTerm :boolean;
  public userDetails:any;
  public villaLimo:any;


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
     this.villaLimo = JSON.parse(window.localStorage.getItem('villaLimoObject'));
     this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
     this.villaCartAmount = serviceVar.villaCartAmount != null ? serviceVar.villaCartAmount : 0;
     this.villaDetails = JSON.parse(window.localStorage.getItem('villaMoreDetailsObject'));
     this.villaFilterParams = JSON.parse(window.localStorage.getItem('villaFilterParams'));
     this.imageUrl = serviceVar.IMAGE_PATH;
     this.transactionFee = 0;
     this.villaSubTotal = 0;
     this.villaTotal = 0; 
     this.isTerm = false;
     this.serviceVar.showLoader('Please Wait Updating Information...');
     setTimeout(()=>{
     	this.villaSubTotal = parseInt(this.villaFilterParams.price) + ( parseInt(this.villaFilterParams.price) * parseInt(this.villaDetails.vat) * 0.01 ) + ( parseInt(this.villaFilterParams.price) * parseInt(this.villaDetails.cityTax) * 0.01 ) + ( parseInt(this.villaFilterParams.price) * parseInt(this.villaDetails.serviceTax) * 0.01 ) + this.villaCartAmount;
    	this.transactionFee = this.villaSubTotal * 0.035;
    	this.villaTotal = this.villaSubTotal + this.transactionFee;
      this.serviceVar.hideLoader(); 
      if(window.localStorage.getItem('villaFilterParams')!=null){
                      let villaFilterParams = JSON.parse(window.localStorage.getItem('villaFilterParams'));
                      villaFilterParams.villaTotal = this.villaTotal;
                      window.localStorage.setItem("villaFilterParams",JSON.stringify(villaFilterParams));
                    }    
     },3000);

       
  }

    ngOnInit() {
    this.callAllSubscribe(this.events);
   }


  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = Villa_choicePage;
    }
    
  }


  goToContract(){
    this.navCtrl.push(VillaContractPage);
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
                  window.localStorage.removeItem('villaFilterParams');
                 window.localStorage.removeItem('villaMoreDetailsObject');
                 window.localStorage.removeItem('villaLimoObject'); 


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

     if(this.serviceVar.isLogin != true){
      this.serviceVar.openAlert('Login!!','Please Login First');
      return false;
    }
    
    
    
    //prepare parameter for yacht submit order
    let villaOrderRequest = {
        "type":"Add",
        "departureDate": this.villaFilterParams.checkOut,
        "id":this.villaDetails.id,
        "price": Math.floor(this.villaTotal),
        "villaDestination":this.villaFilterParams.destinationCityName,
        "currency":this.serviceVar.getCurrency(this.villaDetails.currencyId),
        "userId":this.userDetails.id,
        "guests":this.villaFilterParams.guest,
        "ownerId":this.villaDetails.userId,
        "productPrice": Math.floor(this.villaDetails.price),
        "bookingType":3,
        "arrivalDate":this.villaFilterParams.checkIn,
        "websiteId":0, // only for immidia
        "menuDetails":this.serviceVar.villaAddToCart,
        "limoDetails":this.villaLimo,
        "total": Math.floor(this.villaTotal),
        "stateId":this.villaFilterParams.stateId,
        "foodPrice": Math.floor(this.serviceVar.villaCartAmount),
        "transactionFee":Math.floor(this.transactionFee),
        "vat":   Math.floor(this.villaFilterParams.price * this.villaDetails.vat * 0.01)
      };

   console.log("villaOrderRequest"+JSON.stringify(villaOrderRequest));
 
      
      if(this.isTerm == true){
        this.serviceVar.SubmitOrder(villaOrderRequest);
      }else{
        this.serviceVar.openAlert("Alert!!",'Please Read Contract Terms & Conditions. ');
        return false;
      }
    

  }

}

