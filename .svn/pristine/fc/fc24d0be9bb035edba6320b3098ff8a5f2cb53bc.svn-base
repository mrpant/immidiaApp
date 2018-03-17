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

@Component({
  selector: 'page-car_list',
  templateUrl: 'car_list.html'
})
export class Car_listPage {
  @ViewChildren(Slides) slides: QueryList<Slides>;
  public carBookingFilterObject:any;
  public filterObjectLength:number;
  public imageUrl:string;
  public carFilterParams : any;
  isQuickFilter:boolean;
  pricefilter:number;

  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,public popoverCtrl: PopoverController,public modalCtrl: ModalController) {
      
    
      this.isQuickFilter = this.serviceVar.isQuickCarFilter;
      this.carFilterParams = JSON.parse(window.localStorage.getItem('carFilterParams')); //get yacht filter object

      //get filter object
      this.carBookingFilterObject = null;
      this.carBookingFilterObject = navParams.get('carFilterObject');
    
      this.filterObjectLength = this.carBookingFilterObject.length;
      this.imageUrl = serviceVar.IMAGE_PATH;
      this.pricefilter = 1;
   

  }


    ngOnInit() {
    this.callAllSubscribe(this.events);
   }

   
    callAllSubscribe(events){
       events.subscribe('priceFilterEvent', object => { 
         this.pricefilter = object;
       });
             
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
       this.serviceVar.loginCurrentPages = Car_listPage;
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
