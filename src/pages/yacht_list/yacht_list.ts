import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild,ViewChildren,QueryList} from '@angular/core';
import { Slides } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import { Yacht_detailPage } from '../yacht_detail/yacht_detail';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { PopoverController } from 'ionic-angular';
import { FilterPage } from '../filter/filter';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';

@Component({
  selector: 'page-yacht_list',
  templateUrl: 'yacht_list.html'
})
export class Yacht_listPage {
  @ViewChildren(Slides) slides: QueryList<Slides>;
  public yachtBookingFilterObject:any;
  public filterObjectLength:number;
  public imageUrl:string;
  public yachtFilterParams : any;
  isQuickFilter:boolean;
  pricefilter:number;

  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,public popoverCtrl: PopoverController,public modalCtrl: ModalController) {
      
    
      this.isQuickFilter = this.serviceVar.isQuickYachtFilter;
      this.yachtFilterParams = JSON.parse(window.localStorage.getItem('yachtFilterParams')); //get yacht filter object

      //get filter object
      this.yachtBookingFilterObject = null;
      this.yachtBookingFilterObject = navParams.get('yachtFilterObject');
    
      this.filterObjectLength = this.yachtBookingFilterObject.length;
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
      this.serviceVar.loginCurrentPages = Yacht_listPage;
    }
    
  }

  queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(FilterPage);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss((popoverData) => {
        
    })


  }




  
  goToSlide(index,arg) {
    console.log("INEDX="+index+"arg="+arg);
   this.slides.toArray()[index].slideTo(arg,500);
  }

  goToSlidenext(arg) {
   // this.slides.slideTo(arg, 500);

     
  }


  YachtSubmitMoredetails(isBlocked:boolean,yachtId:number,yachtUpdatedPrice:string){

    console.log("isQUICL"+this.isQuickFilter);
           if(isBlocked){
              alert("Yacht has been Blocked on this Date ,Please Change Date First...");
              return false;
            }else{

               let yachtFilterParams = JSON.parse(window.localStorage.getItem('yachtFilterParams'));
                yachtFilterParams.yachtId = yachtId;
                yachtFilterParams.yachtUpdatedPrice = yachtUpdatedPrice;
                window.localStorage.setItem('yachtFilterParams',JSON.stringify(yachtFilterParams));
                this.navCtrl.push(Yacht_detailPage,{'yachtId':yachtId,'yachtUpdatedPrice':yachtUpdatedPrice});
            }
  }




  YachtSubmitWithQuickMoredetails(yachtId:number,yachtUpdatedPrice:string){

      if(yachtId == null || yachtId <= 0 ){
        this.serviceVar.openAlert('Alert','Please Wait while Updating Your Information.');
        return false;
      }


      console.log("isQUICL"+this.isQuickFilter);
      let yachtFilterParams = JSON.parse(window.localStorage.getItem('yachtFilterParams'));
          yachtFilterParams.yachtId = yachtId;
          yachtFilterParams.yachtUpdatedPrice = yachtUpdatedPrice;
          window.localStorage.setItem('yachtFilterParams',JSON.stringify(yachtFilterParams));
     this.navCtrl.push(Yacht_detailPage,{'yachtId':yachtId,'yachtUpdatedPrice':yachtUpdatedPrice});
  }


}
