import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild,ViewChildren,QueryList} from '@angular/core';
import { Slides } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import { Car_detailPage } from '../car_detail/car_detail';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { FilterPage } from '../filter/filter';
import { PopoverController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { BooknowPage } from '../booknow/booknow';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';



@Component({
  selector: 'page-chauffeur_list',
  templateUrl: 'chauffeur_list.html'
})
export class Chauffeur_listPage {
  @ViewChildren(Slides) slides: QueryList<Slides>;
  public chauffeurFilterObject:any;
  countryName:string;
  chauffeurOrderRequest:any;
  countryStartName:string;
  countryEndName:string;
  departureDate:any;

  userDetails:any;


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
      
    
      this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
      this.chauffeurFilterObject = navParams.get('carChauffureEvent');
      this.countryStartName = navParams.get('countryStartName');
      this.countryEndName = navParams.get('countryEndName');
      this.departureDate = navParams.get('departureDate');
      
      
   
  }

    ngOnInit() {
    this.callAllSubscribe(this.events);
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


  payment(price){

       if(this.serviceVar.isLogin != true){
      this.serviceVar.openAlert('Login!!','Please Login First.');
      return false;
    }
  

    //prepare parameter for yacht submit order
    let chauffeurOrderRequest = {
          id            :  "",
          name          :  "",
          bookingType   :  5, //5 for chauffeur
          departureDate :  this.departureDate,
          arrivalDate   :  "",
          ownerId       :  "",
          routeType     :  "",
          menuDetails   :  "",
          fromArea      :  this.countryStartName,
          type          :  "Add",
          toArea        :  this.countryEndName,
          currency      :  this.chauffeurFilterObject.currency,
          userId        :  this.userDetails.id,
          guests        :  "",
          deliveryPrice :  "",
          dropOffRate   :  "",
          formulaPrice  :  "",
          foodPrice     :  "",
          productPrice  :  Math.floor(price),
          extraTime     :  "",
          subtotal      :  Math.floor(price),
          total         :  Math.floor(price),
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
   
  

   presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(FilterPage);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss((popoverData) => {
        
    })


  }

   queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }



 presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
       this.serviceVar.loginCurrentPages = Chauffeur_listPage;
    }
    
  }

  carSubmitMoredetails(carId,carUpdatedPrice){

         if(carId == null || carId <= 0 ){
            this.serviceVar.openAlert('Alert','Please Wait While updating your information');
           return false;
          }


       let  carFilterParams = JSON.parse(window.localStorage.getItem('carFilterParams'));
            carFilterParams.carId = carId;
            carFilterParams.carUpdatedPrice = carUpdatedPrice;
       window.localStorage.setItem('carFilterParams',JSON.stringify(carFilterParams));
      this.navCtrl.push(Car_detailPage,{'carId':carId,'carUpdatedPrice':carUpdatedPrice});
  }
 
  
   goToSlide(index,arg) {
    console.log("INEDX="+index+"arg="+arg);
     this.slides.toArray()[index].slideTo(arg,500);
  }

  goToSlidenext(arg) {
     //  this.slides.slideTo(arg, 500);
     
  }
}
