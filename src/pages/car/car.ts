import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Car_listPage } from '../car_list/car_list';
import * as $ from 'jquery';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';

 

  


@Component({
  selector: 'page-car',
  templateUrl: 'car.html'
})
export class CarPage {


  public guest:number;
  public carCountry:any; 
  public carState:any;
  public country:number;
  public countryName:string;
  public state:number;
  public stateName:string;
  public departureCity:number;
  public departureCityName:string;
  public carCity:any;
  public pageCounter:number;




 constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public modalCtrl: ModalController) {

    
  	
  	//set yacht country data
      
  	  this.carCountry = this.serviceVar.carCountry;
  	 // this.carState   = this.serviceVar.carState;
      this.guest = 1;
     // this.carCity = serviceVar.carCity;
      
    
   
   
  
  }

   ngOnInit() {
    this.callAllSubscribe(this.events);
   }

  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = CarPage;
    }
    
  }

   queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }

 callAllSubscribe(events){

  events.subscribe('carBookingFilterEvent', object => { // get yacht state by custom events
        
         if(object != null){
           
                  if(this.pageCounter <= 1){
                    this.navCtrl.push(Car_listPage,{"carFilterObject":object});
                  }
             
         }else{
         //  this.serviceVar.hideLoader();
           this.serviceVar.openAlert("Alert!!","No Results Found!!");
             
           return false;
         }
            
             this.pageCounter++;
    });
  }


  onSelectCarCountryChange(selectedValue:any){

    console.log(this.serviceVar.carState);

  	this.country = selectedValue;
     var tempArray = []; 
 		  
    var i = 1;
		for(let data of this.serviceVar.carState) {

			if(selectedValue == data.countryId){
          tempArray.push(data);
			 }

       if(this.serviceVar.carState.length == i){
         this.carState = tempArray;
       }

      i++;
    }


    setTimeout(()=>{
        this.countryName = $('#country').text();
      this.serviceVar.hideLoader();
    },1000);
 
  }


  onSelectCarStateChange(selectedValue:any){ // get yacht city
    this.state = selectedValue;
    this.serviceVar.showLoader('Listing Car States..'); 
     var tempArray = []; 
     
     var i = 1;
    
    for(let data of this.serviceVar.carCity) {
      console.log("city"+JSON.stringify(data));
      if(selectedValue == data.stateId){
          tempArray.push(data);
       }

       if(this.serviceVar.carCity.length == i){
         this.carCity = tempArray;
         
       }

      i++;
    }

     setTimeout(()=>{
        this.stateName = $('#state').text();     
      },100);
   

  
  }






  onSelectCarCityChange(selectedValue:any){ //date selection and disabled arrival
    this.departureCity  = selectedValue;

     setTimeout(()=>{
        this.departureCityName = $('#departureCity').text();     
      },100);
  }


  submitCarForm(){
     //yacht submit validation
      if(this.country==null || this.country < 0){
        this.serviceVar.openAlert("Alert!!","Please Select Country");
        return false;
      }
      if(this.state==null || this.state < 0){
        this.serviceVar.openAlert("Alert!!","Please Select State");
        return false;
      }
      if(this.departureCity==null || this.departureCity < 0){
        this.serviceVar.openAlert("Alert!!","Please Select Departure City");
        return false;
      }
      
      
      if(this.guest < 0){
        this.serviceVar.openAlert("Alert!!","Guests should be greater than 0 ");
        return false;
      }
    
     
      //yacht booking filter data on storage
      let carFilterParams = {
          countryId : this.country,
          stateId : this.state,
          departureCity : this.departureCity,
          departureCityName: this.departureCityName,
          guest:this.guest,
          stateName:this.stateName,
          countryName:this.countryName

      };

       this.pageCounter = 1;
       window.localStorage.setItem('carFilterParams',JSON.stringify(carFilterParams));
       this.serviceVar.getCarBrowseFeetFilterData(this.departureCity,this.guest);
 


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
