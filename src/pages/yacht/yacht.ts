import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Yacht_listPage } from '../yacht_list/yacht_list';
import * as $ from 'jquery';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';



@Component({

  selector: 'page-yacht',
  templateUrl: 'yacht.html'
})
export class YachtPage {

  public guest:number;
  public yachtType :number;
  public countryName:string;
  public country:number;
  public yachtCountry:any; 
  public yachtState:any;
  public state:number;
  public stateName:string;
  public pageCounter:number;
 // public isDisabledArrival:boolean;

   constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public modalCtrl: ModalController) {

  	
  	//set yacht country data
      
  	  this.yachtCountry = this.serviceVar.yachtCountry;
      this.guest = 1;
      this.yachtType = 1;

   console.log("event cons....111");

  }

  ngOnInit() {
    this.callAllSubscribe(this.events);
   }

  


  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = YachtPage;
    }
    
  }

  queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }
  
  callAllSubscribe(events){
   console.log("event call....111");
     events.subscribe('yachtStateEvent', object => { // get yacht state by custom events
         this.yachtState = object;
         console.log(JSON.stringify(this.yachtState));
         this.serviceVar.hideLoader();
            
    });

    events.subscribe('yachtBookingFilterEvent', object => { // get yacht state by custom events
         console.log("event call...."+this.pageCounter);
         if(object != null){
            
       
             //  this.serviceVar.hideLoader();
               if(this.pageCounter <= 1){
                this.navCtrl.push(Yacht_listPage,{"yachtFilterObject":object});
                }
             
         }else{
          // this.serviceVar.hideLoader();
           this.serviceVar.openAlert("Alert!!","No Results Found!!");
            
           return false;
         }
        

         this.pageCounter++;
           
    });

  }



  onSelectYachtCountryChange(selectedValue:any){
       this.serviceVar.getYachtState(selectedValue);
       this.country = selectedValue; 
      setTimeout(()=>{
        this.countryName = $('#country').text();
     
      },100);
 
  }

   onSelectYachtStateChange(selectedValue:any){ // get yacht city
    this.state = selectedValue;
     setTimeout(()=>{
        this.stateName = $('#state').text();     
      },100);
   
  }


  submitYachtForm(){
     //yacht submit validation
      if(this.country==null || this.country < 0){
        this.serviceVar.openAlert("Alert!!","Please Select Country");
        return false;
      }
      if(this.state==null || this.state < 0){
        this.serviceVar.openAlert("Alert!!","Please Select State");
        return false;
      }
      
      
      if(this.guest < 0){
        this.serviceVar.openAlert("Alert!!","Guests should be greater than 0 ");
        return false;
      }


      if(this.yachtType == 2){ // only for case on super yacht
        this.serviceVar.isSuperYacht = true;
      }

      //yacht booking filter data on storage
      let yachtFilterParams = {
          countryId : this.country,
          stateId : this.state,
          yachtType :this.yachtType,
          guest:this.guest,
          countryName : this.countryName,
          stateName : this.stateName

      };
       this.pageCounter = 1;
       window.localStorage.setItem('yachtFilterParams',JSON.stringify(yachtFilterParams));
      this.serviceVar.getYachtBrowseFeetFilterData(this.state,this.yachtType,this.guest);

  }
  


  incrementGuestCounter(){
       this.guest++;
  }

  decrementGuestCounter(){
    if(this.guest > 1){
      this.guest--;
    }
  }


}
