import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { Limosine_detailPage } from '../limosine_detail/limosine_detail';
import * as $ from 'jquery';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { super_yachtPage} from '../super_yacht/super_yacht';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'page-yacht_detail',
  templateUrl: 'yacht_detail.html'
})
export class Yacht_detailPage {

  public yachtDetails : any;
  public yachtUpdatedPrice?:any;
  public imageUrl:string;
  public yachtTime:any;
  public departureHour:any;
  public arrivalHour:any;
  public yachtFilterParams:any;
  public isQuickFilter:boolean;
  public daysArray : any;
  public daysArrayInit:any;
  /***********variable for quick filter***************/

  public days : number;
  public routeType:number;
  public isDisabledArrival:boolean;
  public daysId:number;
  public departureDate:any;
  public arrivalDate:any;
  public yachtDepartureCity:any;
  public yachtArrivalCity:any;
  public departureCity:number;
  public arrivalCity:number;
  public departureCityName:string;
  public arrivalCityName:string;
  public isSuperYacht : boolean;
  public pageCounter:number;
  /***************************************************/

 constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,public modalCtrl: ModalController,public datepipe: DatePipe) {
       this.isQuickFilter = this.serviceVar.isQuickYachtFilter;
       this.imageUrl =  serviceVar.IMAGE_PATH;
       this.yachtFilterParams = JSON.parse(window.localStorage.getItem('yachtFilterParams'));
       this.yachtUpdatedPrice = this.yachtFilterParams.yachtUpdatedPrice;
       this.yachtDetails = null;
       this.yachtTime = serviceVar.Time;
     
       this.departureDate = (this.yachtFilterParams.departureDate != null) ? new Date(this.yachtFilterParams.departureDate).toISOString() :   new Date().toISOString();
       this.isSuperYacht = serviceVar.isSuperYacht;

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



       /***************quick yacht ****************/

 
            this.daysId = 4;
            this.routeType = 1;
            this.isDisabledArrival = true;

             if(this.isQuickFilter){
                this.validateSuperYacht(this.yachtFilterParams.yachtType);
             }

  }


   ngOnInit() {
    this.departureDate = this.datepipe.transform(this.departureDate, 'yyyy-MM-dd');
    this.validateYachtDefaultValue(this.isQuickFilter);
    this.serviceVar.getYachtDetails(this.yachtFilterParams.yachtId);

       /*******************************************/
       if(this.isQuickFilter == true){
            this.days = 1;
           this.serviceVar.getYachtDepartureCity(this.yachtFilterParams.countryId,this.yachtFilterParams.stateId,this.days,this.daysId,this.yachtFilterParams.yachtType,this.routeType);
       }

    this.callAllSubscribe(this.events);
   }

  queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }

  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = Yacht_detailPage;
    }
    
  }
  
  getCurrency(currencyId){
    return this.serviceVar.getCurrencyInSymbol(currencyId)
  }


  callAllSubscribe(events){

    events.subscribe('yachtDetailsEvent', object => { // get yacht state by custom events
      console.log("hello testing.");
      if(object != null){
         this.yachtDetails = object;
         console.log(JSON.stringify(this.yachtDetails));
        
        }else{
   
           this.serviceVar.openAlert("Alert!!","No Results Found!!");
           return false;
        }

         
      
    });


    events.subscribe('yachtMoreDetailsSubmitEvent', object => { // get yacht state by custom events
        
         if(object != null){

           if(this.pageCounter <= 1){
             this.navCtrl.push(Limosine_detailPage,{"yachtMoreDetailsObject":object});
           }


             window.localStorage.setItem('yachtMoreDetailsObject',JSON.stringify(object));
             
         }else{
           window.localStorage.setItem('yachtMoreDetailsObject',null);
          
           this.serviceVar.openAlert("Alert!!","No Results Found!!");
           return false;
         }
             //   this.serviceVar.hideLoader();

             this.pageCounter++;
        
    });



    /****************yacht quick filter************************/
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

    /*********************************************************/

  }


  validateYachtDefaultValue(isQuickFilter:boolean){

     if(isQuickFilter != true){ 
       setTimeout(()=>{ // set departure hour
          if(this.yachtFilterParams.daysId == 1 ){
             this.departureHour = '09:00';
          }else if(this.yachtFilterParams.daysId == 2){
             this.departureHour = '14:00';
          }else if(this.yachtFilterParams.daysId == 3){
             this.departureHour = '12:00';
          }else if(this.yachtFilterParams.daysId == 4){
             this.departureHour = '09:00';
          }else{

             this.departureHour = '19:00';
          }
          
       },1000);

        setTimeout(()=>{ // set arrival hour
           if(this.yachtFilterParams.daysId == 1 ){
             this.arrivalHour = '13:00';
           }else if(this.yachtFilterParams.daysId == 2){
             this.arrivalHour = '18:00';
           }else if(this.yachtFilterParams.daysId == 3){
             this.arrivalHour = '12:00';
           }else if(this.yachtFilterParams.daysId == 4){
             this.arrivalHour = '19:00';
           }else{
            this.arrivalHour = '19:00';
           }
      },1000);

     }else{ // for quick yacht

             this.departureHour = '19:00';
             this.arrivalHour = '19:00';

     }
  }


  goBack(){
      this.navCtrl.pop();
  }

   
  submitYachtForm(){

            
        //variable for validate is quick yacht or booking
         var departureCity,arrivalCity,daysId;
             
         if(window.localStorage.getItem('yachtFilterParams') != null){
            let yachtFilterParams = JSON.parse(window.localStorage.getItem('yachtFilterParams'));
            yachtFilterParams.yachtId = this.yachtFilterParams.yachtId;
            yachtFilterParams.price = this.yachtFilterParams.yachtUpdatedPrice;
            yachtFilterParams.departureHour  = this.departureHour;
            yachtFilterParams.arrivalHour = this.arrivalHour;

            /***************for quick yacht*************/
            if(this.isQuickFilter == true){
                 yachtFilterParams.days = this.days;
                 yachtFilterParams.daysId = this.daysId;
                 yachtFilterParams.routeType = this.routeType;
                 yachtFilterParams.departureDate = this.departureDate;
                 yachtFilterParams.arrivalDate = this.arrivalDate; 
                 yachtFilterParams.departureCity   = this.departureCity;
                 yachtFilterParams.departureCityName = this.departureCityName;
                 yachtFilterParams.arrivalCityName = this.arrivalCityName;
                 yachtFilterParams.arrivalCity = this.arrivalCity;

                  departureCity = this.departureCity;
                  arrivalCity = this.arrivalCity;
                  daysId = this.daysId;

            }else{

                 departureCity = yachtFilterParams.departureCity;
                 arrivalCity = yachtFilterParams.arrivalCity;
                 daysId = yachtFilterParams.daysId;

            }
            /******************************************/

             this.pageCounter = 1;

            window.localStorage.setItem('yachtFilterParams',JSON.stringify(yachtFilterParams));
            this.serviceVar.getYachtMoreDetailsSubmitData(this.yachtFilterParams.yachtId,departureCity,arrivalCity,daysId);
          }else{
             this.serviceVar.openAlert("Sorry!!"," Some information is Missing.");
             return false;
          }
  }


   onSelectYachtDepartureHourChange(selectedValue:any){
     this.departureHour = selectedValue;
   }

   onSelectYachtArrivalHourChange(selectedValue:any){
     this.arrivalHour = selectedValue;
   }


    /*************************quick yacht******************************/

   onSelectYachtDaysChange(selectedValue:any){ //date selection and disabled arrival

    if(selectedValue == 5){
      this.isDisabledArrival = false;
    }else{
      this.isDisabledArrival = true;
    }

    this.daysId = selectedValue; 


     setTimeout(()=>{ // set departure hour
          if(this.daysId == 1 ){
             this.departureHour = '09:00';
          }else if(this.daysId == 2){
             this.departureHour = '14:00';
          }else if(this.daysId == 3){
             this.departureHour = '12:00';
          }else if(this.daysId == 4){
             this.departureHour = '09:00';
          }else{

             this.departureHour = '19:00';
          }
          
       },1000);

        setTimeout(()=>{ // set arrival hour
           if(this.daysId == 1 ){
             this.arrivalHour = '13:00';
           }else if(this.daysId == 2){
             this.arrivalHour = '18:00';
           }else if(this.daysId == 3){
             this.arrivalHour = '12:00';
           }else if(this.daysId == 4){
             this.arrivalHour = '19:00';
           }else{
            this.arrivalHour = '19:00';
           }
      },1000);



  }


  onSelectYachtDepartureDateChange(selectedValue:any){ // Departure date selection
      
      this.departureDate = selectedValue;     
      this.days = 1;
    
      this.serviceVar.getYachtDepartureCity(this.yachtFilterParams.countryId,this.yachtFilterParams.stateId,this.days,this.daysId,this.yachtFilterParams.yachtType,this.routeType);
       
      if(this.daysId == 5){
            var now = new Date(this.departureDate); 
            this.arrivalDate = new Date(now.setDate(now.getDate() + 7)).toISOString();;  
      } 

  }

  onSelectYachtArrivalDateChange(selectedValue:any){ // Arraival date selection

      this.arrivalDate = selectedValue;

       if(this.daysId == 5){
          this.days = this.serviceVar.diffDays(new Date(this.departureDate),new Date(this.arrivalDate));
      }else{
         this.days = 1;
      }

     

     this.serviceVar.getYachtDepartureCity(this.yachtFilterParams.countryId,this.yachtFilterParams.stateId,this.days,this.daysId,this.yachtFilterParams.yachtType,this.routeType);
      

  }

  onSelectYachtDepartureCityChange(selectedValue:any){ // Arraival date selection

      this.departureCity = selectedValue;

       if(this.daysId == 5){
          this.days = this.serviceVar.diffDays(new Date(this.departureDate),new Date(this.arrivalDate));
      }else{
         this.days = 1;
      }

      setTimeout(()=>{
        this.departureCityName = $('#departureCity').text();
            
      },100);


     this.serviceVar.getYachtArrivalCity(this.yachtFilterParams.countryId,this.yachtFilterParams.stateId,this.days,this.daysId,this.departureCity,this.yachtFilterParams.yachtType,this.routeType);
   
  }

   onSelectYachtArrivalCityChange(selectedValue:any){
      setTimeout(()=>{
         this.arrivalCityName = $('#arrivalCity').text();        
      },100);
   } 



    /*************************************************************/



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
  

  submitSuperYachtForm(){

    
         if(this.isQuickFilter == true){

            if(this.daysId == 6){
               this.days = 7;
             }else if(this.daysId == 7){
                this.days = 7 * 2;
             }else if(this.daysId == 8){
                this.days = 7 * 3;
             }else if(this.daysId == 9){
                this.days = 7 * 4;
            } 
           if(window.localStorage.getItem('yachtFilterParams') != null){
                let yachtFilterParams = JSON.parse(window.localStorage.getItem('yachtFilterParams'));

                 yachtFilterParams.days = this.days;
                 yachtFilterParams.daysId = this.daysId;
                 yachtFilterParams.routeType = this.routeType;
                 yachtFilterParams.departureDate = this.departureDate;
                 yachtFilterParams.arrivalDate = this.arrivalDate; 
                 yachtFilterParams.departureCity   = this.departureCity;
                 yachtFilterParams.departureCityName = this.departureCityName;
                 yachtFilterParams.arrivalCityName = this.arrivalCityName;
                 yachtFilterParams.arrivalCity = this.arrivalCity;
                 window.localStorage.setItem('yachtFilterParams',JSON.stringify(yachtFilterParams));
                }
            }

    if(this.serviceVar.isLogin){
      this.serviceVar.showToModal(super_yachtPage);
    }else{
      this.serviceVar.openAlert("Auth Required","Please Login First.");
      return false;
     }

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
           this.serviceVar.isSuperYacht = true;

           setTimeout(()=>{
             
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
            this.isSuperYacht = this.serviceVar.isSuperYacht;
            setTimeout(()=>{
              
              this.daysId =  (this.yachtFilterParams.daysId != null) ? this.yachtFilterParams.daysId : 4 ;
              this.daysArray = tempArray;
            },3000);
    }

  }



}

  





 