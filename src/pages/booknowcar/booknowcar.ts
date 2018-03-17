import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import * as $ from 'jquery';
import { Car_listPage } from '../car_list/car_list';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { DatePipe } from '@angular/common';



 
@Component({
  selector: 'page-booknowcar',
  templateUrl: 'booknowcar.html'
})
export class BooknowcarPage {

  public guest:number;
  public driverType :number;
  public days : number;
  public carType:number;
  public carCountry:any; 
  public carState:any;
  public carDays:any;
  public carClassification:any;
  public departureDate:any;
  public country:number;
  public countryName:string;
  public state:number;
  public stateName:string;
  public classification:number;
  public pageCounter:number;




  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public modalCtrl: ModalController,public datepipe: DatePipe) {


  	//set yacht country data
      
  	  this.carCountry = this.serviceVar.carCountry;
  	 // this.carState   = this.serviceVar.carState;
      this.carDays = this.serviceVar.carDays;
      this.guest = 1;
      this.carType = 1;
      this.days = 5;
      this.driverType = 1;
      this.carClassification = this.serviceVar.carClassification;
       this.departureDate = new Date().toISOString();
  }

   ngOnInit() {
    this.callAllSubscribe(this.events);
    this.departureDate = this.datepipe.transform(this.departureDate, 'yyyy-MM-dd');
   }


   presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = BooknowcarPage;
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
         
           this.serviceVar.openAlert("Alert!!","No Results Found!!");
            
           return false;
         }
        
         this.pageCounter++;
            
        
    });
  }



  onSelectCarCountryChange(selectedValue:any){

    console.log(this.serviceVar.carState);

    this.country = selectedValue;
  	 this.serviceVar.showLoader('Listing Car States..');  
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
     setTimeout(()=>{
        this.stateName = $('#state').text();     
      },100);
   
  }


  onSelectCarDaysChange(selectedValue:any){ //date selection and disabled arrival

    this.days = selectedValue; 

  }


  onSelectCarDepartureDateChange(selectedValue:any){ // Departure date selection
      this.departureDate = selectedValue;     
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
      if(this.departureDate==null || this.departureDate < 0){
        this.serviceVar.openAlert("Alert!!","Please Select Departure Date");
        return false;
      }
    
      if(this.classification == null || this.classification < 0){
        this.serviceVar.openAlert("Alert!!","Please Select Car Classification");
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
          days : this.days,
          departureDate : this.departureDate,
          driverType: this.driverType,
          guest:this.guest,
          stateName:this.stateName,
          countryName:this.countryName

      };
     this.pageCounter = 1; 
       window.localStorage.setItem('carFilterParams',JSON.stringify(carFilterParams));
    this.serviceVar.getCarBookingFilterData(this.days,this.guest,this.state,this.departureDate,this.driverType,this.classification);
 


  }

  



  incrementGuestCounter(){
       this.guest++;
  }

  decrementGuestCounter(){
    if(this.guest > 1){
      this.guest--;
    }
  }

  public event = {
    month: '1990-02-19',
    timeStarts: '07:00',
  }

}
