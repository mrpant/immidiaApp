import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Yacht_listPage } from '../yacht_list/yacht_list';
import * as $ from 'jquery';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { DatePipe } from '@angular/common';

  


@Component({
  selector: 'page-booknowyacht',
  templateUrl: 'booknowyacht.html'
})
export class BooknowyachtPage {

  public guest:number;
  public yachtType :number;
  public days : number;
  public routeType:number;
  public yachtCountry:any; 
  public yachtState:any;
  public isDisabledArrival:boolean;
  public country:number;
  public state:number;
  public daysId:number;
  public departureDate:any;
  public arrivalDate:any;
  public yachtDepartureCity:any;
  public yachtArrivalCity:any;
  public departureCity:number;
  public arrivalCity:number;
  public storage:Storage;
  public countryName:string;
  public stateName :string;
  public departureCityName:string;
  public arrivalCityName:string;
  public daysArray : any;
  public daysArrayInit:any;
  public pageCounter:number;
 



  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events, private _storage: Storage,public modalCtrl: ModalController, public datepipe: DatePipe) {

  	
  	//set yacht country data
      
  		this.yachtCountry = this.serviceVar.yachtCountry;
      this.guest = 1;
      this.yachtType = 1;
      this.daysId = 4;
      this.routeType = 1;
      this.isDisabledArrival = true;
      this.storage = _storage;
      this.departureDate = new Date().toISOString();
      this.days = 1;

        this.daysArrayInit = [

               {'id' : 1 , 'name' : 'Half Day (9am - 1pm)'}, 
               {'id' : 2 , 'name' : 'Half Day (2pm - 6pm)'}, 
               {'id' : 3 , 'name' : '24 Hour (Noon - Noon)'}, 
               {'id' : 4 , 'name' : '1 Day (09:00 - 19:00 Hrs)'}, 
               {'id' : 5 , 'name' : 'More'}, 
               {'id' : 6 , 'name' : '1 Week'}, 
               {'id' : 7 , 'name' : '2 Week'}, 
               {'id' : 8 , 'name' : '3 Week'}, 
               {'id' : 9 , 'name' : '4 Week'}, 
                ];


  	//	console.log(JSON.stringify(this.serviceVar.yachtCountry));	



        
  }

    ngOnInit() {
    this.callAllSubscribe(this.events);
    this.departureDate = this.datepipe.transform(this.departureDate, 'yyyy-MM-dd');
    this.validateSuperYacht(this.yachtType);
   }

   presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = BooknowyachtPage;
    }
    
  }

   queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }

  callAllSubscribe(events){
     events.subscribe('yachtStateEvent', object => { // get yacht state by custom events

         this.yachtState = object;
         console.log(JSON.stringify(this.yachtState));
         this.serviceVar.hideLoader();
           
    });

     
     
     events.subscribe('yachtDepartureCityEvent', object => { //get yacht departure city by custom event
         this.yachtDepartureCity = object;
         console.log(JSON.stringify("yacht DATA"+this.yachtDepartureCity));
         this.serviceVar.hideLoader();
           
    });

    events.subscribe('yachtArrivalCityEvent', object => { //get yacht city by custom event
         this.yachtArrivalCity = object;
         console.log(JSON.stringify("yacht DATA"+this.yachtArrivalCity));
         this.serviceVar.hideLoader();
            
    });


     events.subscribe('yachtBookingFilterEvent', object => { // get yacht state by custom events
        
         if(object != null){   
           
              if(this.pageCounter <= 1){
                this.navCtrl.push(Yacht_listPage,{"yachtFilterObject":object});
              }
               // this.serviceVar.hideLoader();
           
         }else{
         
           this.serviceVar.openAlert("Alert!!","No Results Found!!");
             //this.serviceVar.hideLoader();
           return false;
         }
        this.pageCounter++;
 
    });

    

  }



  onSelectYachtCountryChange(selectedValue:any){ // get yacht state
      this.serviceVar.getYachtState(selectedValue);
      this.country = selectedValue; 
      setTimeout(()=>{
        this.countryName = $('#country option:selected').text();
     
      },100);
  }

  onSelectYachtStateChange(selectedValue:any){ // get yacht city
   
    this.state = selectedValue;
     setTimeout(()=>{
        this.stateName = $('#state option:selected').text();     
      },100);
     this.serviceVar.getYachtDepartureCity(this.country,this.state,this.days,this.daysId,this.yachtType,this.routeType);
    
  }


  onSelectYachtDaysChange(selectedValue:any){ //date selection and disabled arrival

    if(selectedValue == 5){
      this.isDisabledArrival = false;
    }else{
      this.isDisabledArrival = true;
    }


                
    this.daysId = selectedValue; 



      if(this.daysId == 5){ // for more days ..
            var now = new Date(this.departureDate); 
            this.arrivalDate = new Date(now.setDate(now.getDate() + 7)).toISOString();
      } 

  }


  onSelectYachtDepartureDateChange(selectedValue:any){ // Departure date selection
  
      this.departureDate = selectedValue;     
      this.days = 1;

  
    
      this.serviceVar.getYachtDepartureCity(this.country,this.state,this.days,this.daysId,this.yachtType,this.routeType);
      
      if(this.daysId == 5){
            var now = new Date(this.departureDate); 
            this.arrivalDate = new Date(now.setDate(now.getDate() + 7)).toISOString();
      } 

  }

  onSelectYachtArrivalDateChange(selectedValue:any){ // Arraival date selection

      this.arrivalDate = selectedValue;

       if(this.daysId == 5){
          this.days = this.serviceVar.diffDays(new Date(this.departureDate),new Date(this.arrivalDate));
      }else{
         this.days = 1;
      }

     

     this.serviceVar.getYachtDepartureCity(this.country,this.state,this.days,this.daysId,this.yachtType,this.routeType);
      

  }

  onSelectYachtDepartureCityChange(selectedValue:any){ // Arraival date selection

      this.departureCity = selectedValue;

       if(this.daysId == 5){
          this.days = this.serviceVar.diffDays(new Date(this.departureDate),new Date(this.arrivalDate));
      }else{
         this.days = 1;
      }

      setTimeout(()=>{
        this.departureCityName = $('#departureCity option:selected').text();
      },100);


     this.serviceVar.getYachtArrivalCity(this.country,this.state,this.days,this.daysId,this.departureCity,this.yachtType,this.routeType);
   
  }

   onSelectYachtArrivalCityChange(selectedValue:any){
      setTimeout(()=>{
         this.arrivalCityName = $('#arrivalCity option:selected').text();        
      },100);
   } 


  incrementGuestCounter(){
       this.guest++;
  }

  decrementGuestCounter(){
    if(this.guest > 1){
      this.guest--;
    }
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
      if(this.departureDate==null || this.departureDate < 0){
        this.serviceVar.openAlert("Alert!!","Please Select Departure Date");
        return false;
      }
      if(this.isDisabledArrival == false){
        if(this.arrivalDate==null ){
          this.serviceVar.openAlert("Alert!!","Please Select Arrival Date");
          return false;
        }
      }
      if(this.departureCity==null || this.departureCity < 0){
        this.serviceVar.openAlert("Alert!!","Please Select Departure City");
        return false;
      }

      if(this.arrivalCity==null || this.arrivalCity < 0){
        this.serviceVar.openAlert("Alert!!","Please Select Arrival City");
        return false;
      }

      if(this.guest < 0){
        this.serviceVar.openAlert("Alert!!","Guests should be greater than 0 ");
        return false;
      }


          if(this.daysId == 6){
               this.days = 7;
           }else if(this.daysId == 7){
              this.days = 7 * 2;
           }else if(this.daysId == 8){
              this.days = 7 * 3;
           }else if(this.daysId == 9){
              this.days = 7 * 4;
          }else{
            this.days = this.daysId;
          } 

      //yacht booking filter data on storage
      let yachtFilterParams = {
          countryId : this.country,
          stateId : this.state,
          days : this.days,
          daysId : this.daysId,
          yachtType :this.yachtType,
          routeType:this.routeType,
          departureDate : this.departureDate,
          arrivalDate: this.arrivalDate,
          departureCity:this.departureCity,
          arrivalCity:this.arrivalCity,
          guest:this.guest,
          countryName : this.countryName,
          stateName : this.stateName,
          departureCityName : this.departureCityName,
          arrivalCityName : this.arrivalCityName
      };
         this.pageCounter = 1;
     window.localStorage.setItem('yachtFilterParams',JSON.stringify(yachtFilterParams));
      this.serviceVar.getYachtBookingFilterData(this.guest,this.state,this.departureCity,this.days,this.departureDate,this.yachtType,this.routeType,this.arrivalCity);

  }


  public event = {
    // month: '1990-02-19',
    timeStarts: '07:00',
  }



  validateSuperYacht(selectedValue:any){

    console.log(selectedValue);
   var tempArray = [];
         this.serviceVar.showLoader('Please Wait ...');
    if(selectedValue == 2){
          for(let data of this.daysArrayInit) {
              console.log("VAL"+data.id);
               if(parseInt(data.id) > 5){
                    tempArray.push(data);
                   
                }             
          }

           setTimeout(()=>{
              this.serviceVar.isSuperYacht = true;
              this.daysId = 6;
              this.daysArray = tempArray;

           },3000);

      }else{
            this.serviceVar.isSuperYacht = false;
             for(let data of this.daysArrayInit) {

                if(parseInt(data.id) <= 5){
                    tempArray.push(data);
                }
                
            }
            setTimeout(()=>{
              this.daysId = 4;
              this.daysArray = tempArray;
            },3000);
    }

  }






}

