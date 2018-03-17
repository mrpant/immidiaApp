import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild,ViewChildren,QueryList} from '@angular/core';import { Slides } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import { Villa_detailPage } from '../villa_detail/villa_detail';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { FilterPage } from '../filter/filter';
import { PopoverController } from 'ionic-angular';
  
@Component({
  selector: 'page-villa_list',
  templateUrl: 'villa_list.html'
})
export class Villa_listPage {
  @ViewChildren(Slides) slides:QueryList<Slides>;
  public villaBookingFilterObject:any;
  public filterObjectLength:number;
  public imageUrl:string;
  public villaFilterParams : any;
  isQuickFilter:boolean;
  pricefilter:number;

  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,public popoverCtrl: PopoverController) {
           console.log("mukesh calling");
    
      this.isQuickFilter = this.serviceVar.isQuickVillaFilter;
      console.log("isQuickFilter"+this.isQuickFilter);
      this.villaFilterParams = JSON.parse(window.localStorage.getItem('villaFilterParams')); //get yacht filter object

      //get filter object
      this.villaBookingFilterObject = null;
      this.villaBookingFilterObject = navParams.get('villaFilterObject');
    
      this.filterObjectLength = this.villaBookingFilterObject.length;
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

  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = Villa_listPage;
    }
    
  }
  
 presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(FilterPage);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss((popoverData) => {
        
    })


  }
  villaSubmitMoredetails(villaId,villaUpdatedPrice?:any){

       if(villaId  == null || villaId <= 0 ){
            this.serviceVar.openAlert('Alert','Please Wait while updating information.');
           return false;
        }

        let villaFilterParams = JSON.parse(window.localStorage.getItem('villaFilterParams'));
             villaFilterParams.villaId = villaId;
             villaFilterParams.villaUpdatedPrice = villaUpdatedPrice;
        window.localStorage.setItem('villaFilterParams',JSON.stringify(villaFilterParams));
      this.navCtrl.push(Villa_detailPage,{'villaId':villaId,'villaUpdatedPrice':villaUpdatedPrice});
  }
  
  goToSlide(index,arg) {
    console.log("INEDX="+index+"arg="+arg);
     this.slides.toArray()[index].slideTo(arg,500);
  }
  
  goToSlidenext(arg) {
   //  this.slides.slideTo(arg, 500);
     
  }
}
