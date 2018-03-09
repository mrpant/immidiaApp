import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Villa_listPage } from '../villa_list/villa_list';
import * as $ from 'jquery';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';


@Component({
  selector: 'page-villa',
  templateUrl: 'villa.html'
})
export class VillaPage {

  public guest:number;
  public villaCountry:any; 
  public villaState:any;
  public country:number;
  public countryName:string;
  public state:number;
  public stateName:string;
  public destinationCity:number;
  public destinationCityName:string;
  public villaCity:any;
  public pageCounter:number;

  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public modalCtrl: ModalController) {
  	//set yacht country data
      this.villaCountry = this.serviceVar.villaCountry;
  	//  this.villaState   = this.serviceVar.villaState;
      this.guest = 1;
   //   this.villaCity = serviceVar.villaCity;
 
    
  }

    ngOnInit() {
    this.callAllSubscribe(this.events);
   }


 presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = VillaPage;
    }
    
  }


   queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }

 callAllSubscribe(events){

  events.subscribe('villaBookingFilterEvent', object => { // get yacht state by custom events
        
         if(object != null){
             
             
             
                if(this.pageCounter <= 1){
                 this.navCtrl.push(Villa_listPage,{"villaFilterObject":object});
                }
               
               
           
         }else{
          // this.serviceVar.hideLoader();
           this.serviceVar.openAlert("Alert!!","No Results Found!!");
        
           return false;
         }
        this.pageCounter ++;
    });
  }




  onSelectVillaCountryChange(selectedValue:any){
  	
     var tempArray = []; 
 		
      var i = 1;
		for(let data of this.serviceVar.villaState) {

			if(selectedValue == data.countryId){
                tempArray.push(data);
			 }

       if(this.serviceVar.villaState.length == i){
         this.villaState = tempArray;
       }

      i++;
    }

     setTimeout(()=>{
        this.stateName = $('#country').text();     
      },100);
 
  }


onSelectVillaStateChange(selectedValue:any){ // get yacht city
     this.state = selectedValue;
    console.log("stateId"+selectedValue);
     var tempArray = []; 
     
     var i = 1;
    
    for(let data of this.serviceVar.villaCity) {
      console.log("city"+JSON.stringify(data));
      if(selectedValue == data.villaAreaId){
          tempArray.push(data);
       }

       if(this.serviceVar.villaCity.length == i){
         this.villaCity = tempArray;
         
       }

      i++;
    }

     setTimeout(()=>{
        this.stateName = $('#state').text();     
      },100);
   
  }

 onSelectVillaDestinationCityChange(selectedValue:any){
    this.destinationCity = selectedValue;
     setTimeout(()=>{
        this.destinationCityName = $('#destinationCity').text();     
      },100);
  }




   submitVillaForm(){
     //yacht submit validation
      if(this.country==null || this.country < 0){
        this.serviceVar.openAlert("Alert!!","Please Select Country");
        return false;
      }
      if(this.state==null || this.state < 0){
        this.serviceVar.openAlert("Alert!!","Please Select State");
        return false;
      }
      if(this.destinationCity==null || this.destinationCity < 0){
        this.serviceVar.openAlert("Alert!!","Please Select Destination City");
        return false;
      }
      if(this.guest < 0){
        this.serviceVar.openAlert("Alert!!","Guests should be greater than 0 ");
        return false;
      }
    
    
     
      //yacht booking filter data on storage
      let villaFilterParams = {
          countryId : this.country,
          stateId : this.state,
          destinationCity : this.destinationCity,
          destinationCityName: this.destinationCityName,
          guest:this.guest,
          stateName:this.stateName,
          countryName:this.countryName

      };
          this.pageCounter = 1;
        window.localStorage.setItem('villaFilterParams',JSON.stringify(villaFilterParams));
       this.serviceVar.getVillaBrowseFeetFilterData(this.destinationCity,this.guest);
  }



  onSelectVillaDaysChange(selectedValue:any){ //date selection and disabled arrival

    
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
