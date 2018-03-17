import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { Villalimosine_detailPage } from '../villalimosine_detail/villalimosine_detail';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'page-villa_detail',
  templateUrl: 'villa_detail.html'
})
export class Villa_detailPage {

  public villaDetails : any;
  public villaUpdatedPrice?:any;
  public imageUrl:string;
  public isQuickFilter:boolean;
  public villaFilterParams:any;
  public checkIn:any;
  public checkOut:any;
  public pageCounter:number;

  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,public modalCtrl: ModalController,public datepipe: DatePipe) {
       this.isQuickFilter = serviceVar.isQuickVillaFilter;
       this.imageUrl =  serviceVar.IMAGE_PATH;
       this.villaFilterParams = JSON.parse(window.localStorage.getItem('villaFilterParams'));
      
       this.villaUpdatedPrice = this.villaFilterParams.villaUpdatedPrice;
       this.villaDetails = null;
       this.checkIn = (this.villaFilterParams.checkIn != null) ? new Date(this.villaFilterParams.checkIn).toISOString() : new Date().toISOString();
       

       var now = new Date(this.checkIn); 
       var updatedcheckOut = new Date(now.setDate(now.getDate() + 7)).toISOString();

       this.checkOut = (this.villaFilterParams.checkOut != null) ? new Date(this.villaFilterParams.checkOut).toISOString() : updatedcheckOut;
      
   
  }
  
    ngOnInit() {
    this.checkIn = this.datepipe.transform(this.checkIn, 'yyyy-MM-dd');
    this.checkOut = this.datepipe.transform(this.checkOut, 'yyyy-MM-dd');
     this.serviceVar.getVillaDetails(this.villaFilterParams.villaId,this.checkIn,this.checkOut);
    this.callAllSubscribe(this.events);
   }

  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
    }
    
  }
  

  queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }

  
  callAllSubscribe(events){

    events.subscribe('villaDetailsEvent', object => { // get yacht state by custom events
         if(object.price != null){
         this.villaDetails = object;
         console.log("villa_details"+JSON.stringify(this.villaDetails));
         this.serviceVar.hideLoader();
         }else{
             this.serviceVar.openAlert("Alert!!","No Results Found!!");
             this.serviceVar.hideLoader();
         }

          
    });

        events.subscribe('villaMoreDetailsSubmitEvent', object => { // get yacht state by custom events
        console.log("VILLA_OBJECT"+JSON.stringify(object));
         if(object != null){

             window.localStorage.setItem('villaMoreDetailsObject',JSON.stringify(object));
             
               
             
                if(this.pageCounter <= 1){
                this.navCtrl.push(Villalimosine_detailPage,{"villaMoreDetailsObject":object});
                }
               

         }else{

             window.localStorage.setItem('villaMoreDetailsObject',JSON.stringify(object));
          //   this.serviceVar.hideLoader();
             this.serviceVar.openAlert("Alert!!","No Results Found!!");
             
             return false;
         }
          
           this.pageCounter++;
           
        
    });

  }

  submitVillaForm(){

        // get days diff
         var days = this.serviceVar.diffDays(new Date(this.checkIn),new Date(this.checkOut));

         if(window.localStorage.getItem('villaFilterParams') != null){
            let villaFilterParams = JSON.parse(window.localStorage.getItem('villaFilterParams'));
            villaFilterParams.villaId = this.villaFilterParams.villaId;
            if(this.isQuickFilter == true){
             villaFilterParams.price = this.villaDetails.price;
            }else{
            villaFilterParams.price = this.villaFilterParams.villaUpdatedPrice;
            }
            villaFilterParams.checkIn  = this.checkIn;
            villaFilterParams.checkOut = this.checkOut;
            villaFilterParams.days = days;
               this.pageCounter = 1;
            window.localStorage.setItem('villaFilterParams',JSON.stringify(villaFilterParams));
            this.serviceVar.getVillaMoreDetailsSubmitData(this.villaFilterParams.villaId,villaFilterParams.checkIn,villaFilterParams.checkOut);
          }else{
             this.serviceVar.openAlert("Sorry!!"," Somthing is Missing.");
             return false;
          }
  }


  onSelectVillaCheckInChange(selectedValue:any){ //date selection and disabled arrival

    this.checkIn = selectedValue;

     var now = new Date(this.checkIn); 
     this.checkOut = new Date(now.setDate(now.getDate() + 1)).toISOString();
  }

  onSelectVillaCheckOutChange(selectedValue:any){ //date selection and disabled arrival
   
   
    this.checkOut  = selectedValue;
    
  }


  goBack(){
      this.navCtrl.pop();
  }


  shownGroup = null;
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };
  
   getCurrency(currencyId){
    return this.serviceVar.getCurrencyInSymbol(currencyId)
   }



}
