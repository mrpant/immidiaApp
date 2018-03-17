import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild,ViewChildren,QueryList} from '@angular/core';import { Slides } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { FilterPage } from '../filter/filter';
import { PopoverController } from 'ionic-angular';
import { Villa_sale_detailsPage } from '../villa_sale_details/villa_sale_details';

  
@Component({
  selector: 'page-villa-sale-list',
  templateUrl: 'villa_sale_list.html'
})
export class Villa_sale_listPage {
  @ViewChildren(Slides) slides:QueryList<Slides>;
  public villaSaleFilterObject:any;
  public filterObjectLength:number;
  public imageUrl:string;
  public villaFilterParams : any;
  countryName:string;
  pricefilter:number;

  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,public popoverCtrl: PopoverController) {
    
      //get filter object

      this.villaSaleFilterObject = navParams.get('villaSaleFilterObject');
      this.countryName = navParams.get('countryName');
      this.filterObjectLength = this.villaSaleFilterObject.length;
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
      this.serviceVar.loginCurrentPages = Villa_sale_listPage;
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

  villaSubmitMoreList(villaId,villaUpdatedPrice?:any){

       if(villaId  == null || villaId <= 0 ){
            this.serviceVar.openAlert('Alert','Please Wait while updating information.');
           return false;
        }

        /*let villaFilterParams = JSON.parse(window.localStorage.getItem('villaFilterParams'));
             villaFilterParams.villaId = villaId;
             villaFilterParams.villaUpdatedPrice = villaUpdatedPrice;*/
      //  window.localStorage.setItem('villaFilterParams',JSON.stringify(villaFilterParams));
      this.navCtrl.push(Villa_sale_detailsPage,{'villaId':villaId,'villaUpdatedPrice':villaUpdatedPrice,"countryName":this.countryName});
  }
  
  goToSlide(index,arg) {
    console.log("INEDX="+index+"arg="+arg);
     this.slides.toArray()[index].slideTo(arg,500);
  }
  
  goToSlidenext(arg) {
   //  this.slides.slideTo(arg, 500);
     
  }
}
