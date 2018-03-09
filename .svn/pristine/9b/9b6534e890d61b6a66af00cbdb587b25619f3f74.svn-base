import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular';
import * as $ from 'jquery';
import { Insurance_detailPage } from '../insurance_detail/insurance_detail';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { DatePipe } from '@angular/common';
 

@Component({
  selector: 'page-car_detail',
  templateUrl: 'car_detail.html'
})
export class Car_detailPage {

  public carDetails : any;
  public carUpdatedPrice?:any;
  public imageUrl:string;
  public isQuickFilter:boolean;
  public carTime:any;
  public carCity:any;
  public carFilterParams:any;
  public departureCity:number;
  public arrivalCity:number;
  public departureCityName:string;
  public arrivalCityName:string;
  public departureHour:any;
  public arrivalHour:any;
  public days:any;
  public departureDate:any;
  public carDays:any;
  tempPrice:number;
  public pageCounter:number;
  public driverType:number;
  public tempDays:any;

  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,public modalCtrl: ModalController,public datepipe: DatePipe) {
       this.isQuickFilter = serviceVar.isQuickCarFilter;
       this.imageUrl =  serviceVar.IMAGE_PATH;
       this.carFilterParams = JSON.parse(window.localStorage.getItem('carFilterParams'));
       this.serviceVar.getCarDetails(this.carFilterParams.carId);
       this.carUpdatedPrice = this.carFilterParams.carUpdatedPrice;
       this.carDetails = null;
       this.driverType = 1;
       this.carTime = serviceVar.Time;
       this.carCity = serviceVar.carCity;
    






       this.getCarCity(this.carCity);
       this.carDays = this.serviceVar.carDays;
       this.departureDate = new Date().toISOString();
       this.tempPrice = this.carUpdatedPrice;


       if(this.isQuickFilter){
           setTimeout(()=>{
             this.days = 5;
             this.departureHour = "09:00";
             this.arrivalHour = "09:00";
           },500);
         }else{
            setTimeout(()=>{
             this.departureHour = "09:00";
             var tempArr = parseInt(this.carFilterParams.days) + 9;
             this.arrivalHour = tempArr +":"+"00";
            },500);
         }
      
   
  }
  
    ngOnInit() {
    this.departureDate = this.datepipe.transform(this.departureDate, 'yyyy-MM-dd');


    this.callAllSubscribe(this.events);
   }

   presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
       this.serviceVar.loginCurrentPages = Car_detailPage;
    }
    
  }

  queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }

  getCurrency(currencyId){
    return this.serviceVar.getCurrencyInSymbol(currencyId)
  }

  callAllSubscribe(events){

    events.subscribe('carDetailsEvent', object => { // get yacht state by custom events
         if(object != null){
         this.carDetails = object;
         console.log("car_details"+JSON.stringify(this.carDetails));
         this.serviceVar.hideLoader();
         }else{
             this.serviceVar.openAlert("Alert!!","No Result Found!!");
             this.serviceVar.hideLoader();
         }
            
    });




    events.subscribe('carMoreDetailsSubmitEvent', object => { // get yacht state by custom events
        
         if(object != null){
             
            
             if(this.pageCounter <= 1){
                this.navCtrl.push(Insurance_detailPage,{"carMoreDetailsObject":object});
              }
                
                window.localStorage.setItem('carMoreDetailsObject',JSON.stringify(object));
              
        
             
         }else{
           window.localStorage.setItem('carMoreDetailsObject',null);
         //  this.serviceVar.hideLoader();
           this.serviceVar.openAlert("Alert!!","No Result Found!!");
           
           return false;
         }
          
         this.pageCounter++;
           
              
    });

  }


      getCarCity(carCity:any){ // get yacht city
         
           var tempArray = []; 
           
           var i = 1;
          
          for(let data of carCity) {
            console.log("city"+JSON.stringify(data));
            if(this.carFilterParams.stateId == data.stateId){
                tempArray.push(data);
             }

             if(carCity.length == i){
                    this.carCity = tempArray;
              }

            i++;
          }
      }



  onSelectCarDaysChange(selectedValue:any){
    
    this.carUpdatedPrice = this.tempPrice;
    
     setTimeout(()=>{
           var price = 0 ;
           var days = $('#days').text();
           if(days == '1day'){
             console.log("_if");
            price = this.tempPrice * 1;
           }else {
            
            var daysStr =  days.split("days")[0]; 
               if(!isNaN(daysStr)){
                price = this.tempPrice * days.split("days")[0];
               }
           }
           this.carUpdatedPrice = (price == 0) ? this.carUpdatedPrice : price ;

           //addition of arrival hours
           if(selectedValue < 5 ){
           this.tempDays = $('#days').text().split("hrs")[0];
           var tempArrival  = parseInt(this.departureHour.split(":")[0]) + parseInt(this.tempDays);
           this.arrivalHour = tempArrival+":"+this.departureHour.split(":")[1];
           console.log(this.arrivalHour);
          }
             
            
      
     },100);
   


  }

  onSelectDepartureCityChange(selectedValue:any){ //date selection and disabled arrival
   
    this.departureCity  = selectedValue;

     setTimeout(()=>{
        this.departureCityName = $('#departureCity').text();     
      },100);
  }




   onSelectArrivalCityChange(selectedValue:any){ //date selection and disabled arrival
      this.arrivalCity  = selectedValue;

     setTimeout(()=>{
        this.arrivalCityName = $('#arrivalCity').text();     
      },100);
  }

  onSelectCarDepartureHourChange(selectedValue:any){
    this.departureHour = selectedValue;

     //addition of arrival hours
         setTimeout(()=>{
           var tempArrival  = parseInt(this.departureHour.split(":")[0]) +  ( (this.carFilterParams.days!=null) ? parseInt(this.carFilterParams.days) : parseInt(this.tempDays) );
           this.arrivalHour = tempArrival+":"+this.departureHour.split(":")[1];
           console.log(this.arrivalHour);
          },100);


  }

  onSelectCarArrivalHourChange(selectedValue:any){
    this.arrivalHour = selectedValue;
  }



  goBack(){
      this.navCtrl.pop();
  }

   submitCarForm(){

        //variable for validate is quick yacht or booking
         var days,departureDate;
             
         if(window.localStorage.getItem('carFilterParams') != null){
            let carFilterParams = JSON.parse(window.localStorage.getItem('carFilterParams'));
             carFilterParams.carId = this.carFilterParams.carId;
             carFilterParams.price = this.carUpdatedPrice;
             carFilterParams.arrivalHour = this.arrivalHour;
             carFilterParams.departureHour = this.departureHour;
             carFilterParams.arrivalCity = this.arrivalCity; 
             carFilterParams.departureCity   = this.departureCity;
             carFilterParams.departureCityName = this.departureCityName;
             carFilterParams.arrivalCityName = this.arrivalCityName;

            /***************for quick yacht*************/
            if(this.isQuickFilter == true){
                 carFilterParams.days = this.days;
                 carFilterParams.departureDate = this.departureDate;
                   carFilterParams.driverType = this.driverType;
                  days = this.days;
                  departureDate = this.departureDate;
                   
            }else{

                 departureDate = carFilterParams.departureDate;
                 days = carFilterParams.days;

            }
            /******************************************/
           this.pageCounter = 1;
            window.localStorage.setItem('carFilterParams',JSON.stringify(carFilterParams));
       
           this.serviceVar.getCarMoreDetailsSubmitData(this.carFilterParams.carId,this.departureCity,this.arrivalCity,days,departureDate);
         
          }else{
             this.serviceVar.openAlert("Sorry!!"," Somthing is Missing...");
             return false;
          }
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
  

}
