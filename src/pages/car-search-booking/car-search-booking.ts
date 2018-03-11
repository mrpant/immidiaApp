import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Modal1Page } from '../modal/modal1';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ServiceProvider } from '../../providers/service/service';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { BooknowPage } from '../booknow/booknow';
import {Events} from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
/**
 * Generated class for the CarSearchBookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-search-booking',
  templateUrl: 'car-search-booking.html',
})
export class CarSearchBookingPage {
  bookingDetails :any;
  userDetails:any;
  isChecked:boolean = false;
  isCopy:boolean = false;
  userDetailsCopy:any;
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
  constructor(private iab: InAppBrowser,public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,public popoverCtrl: PopoverController,public modalCtrl: ModalController) {
    this.bookingDetails = { 
      carDetails : navParams.get('carDetails'),
      additionalDetails : navParams.get('additionalDetails')
    }
    this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
  }

  copyData(event) {
      if(this.isCopy){
        this.userDetailsCopy = this.userDetails;
      }else{
        this.userDetailsCopy = null;
      }
  }

  //YACHT  SUBMIT ORDER EVENET
  callAllSubscribe(events){
    events.subscribe('OrderEvent', object => { // send request to immidia Build
          
             setTimeout(()=>{
                this.serviceVar.hideLoader();
              },1000);

        if(object!=null && object !=""){
           const browser = this.iab.create('http://www.immidia.co/immidia/api/ws/controller/?access=true&action=payment&bookingId='+object,"_system",this.options);
            
        }

         setTimeout(()=>{
             
             this.navCtrl.popTo(BooknowPage);
            });
    });

}


payment(){

  if(this.isChecked == false){
    this.serviceVar.openAlert('Message','You must have to checked Terms And Conditions.');
    return false;
  }

  if(this.serviceVar.isLogin != true){
   this.serviceVar.openAlert('Login!!','Please Login First.');
   return false;
 }


 //prepare parameter for yacht submit order
 let chauffeurOrderRequest = {
       id            :  "",
       name          :  "",
       bookingType   :  5, //5 for chauffeur
       departureDate :  this.bookingDetails.carDetails.chauffeurDetails.pick_date,
       arrivalDate   :  this.bookingDetails.carDetails.chauffeurDetails.pick_date,
       ownerId       :  "",
       routeType     :  "",
       menuDetails   :  "",
       fromArea      :  this.bookingDetails.carDetails.chauffeurDetails.from,
       type          :  "Add",
       toArea        :  this.bookingDetails.carDetails.chauffeurDetails.to,
       currency      :  this.bookingDetails.additionalDetails.currency,
       userId        :  this.userDetails.id,
       guests        :  this.bookingDetails.carDetails.chauffeurDetails.passenger,
       deliveryPrice :  "",
       dropOffRate   :  "",
       formulaPrice  :  "",
       foodPrice     :  "",
       productPrice  :  Math.floor(this.bookingDetails.additionalDetails.price),
       extraTime     :  "",
       subtotal      :  Math.floor(this.bookingDetails.additionalDetails.price),
       total         :  Math.floor(this.bookingDetails.additionalDetails.currency),
       transactionFee:  "",
       websiteId     :  0, // for whitelabel case either should be 0
       departureHours:  "",
       arrivalHours  :  "",
       limoDetails   :  "",
       stateId       :  "",
       days          :  ""
   };

  this.serviceVar.SubmitOrder(chauffeurOrderRequest);



console.log("SUbmit_CHAUFFER_ORDER"+JSON.stringify(chauffeurOrderRequest));

}


  ionViewDidLoad() {
    console.log('ionViewDidLoad CarSearchBookingPage');
    this.callAllSubscribe(this.events);
  }

  presentModal() {

    if (this.serviceVar.isLogin) {
      this.navCtrl.push(ProfilePage);
    } else {
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = CarSearchBookingPage;
    }

  }

  queryForm() {

    let modal = this.modalCtrl.create(Modal1Page);
    modal.present();

  }

}