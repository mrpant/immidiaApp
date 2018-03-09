import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { YachtContractPage } from '../yachtcontract/yachtcontract';
import { BooknowPage } from '../booknow/booknow';

@Component({
  selector: 'page-your_choice',
  templateUrl: 'your_choice.html'
})
export class Your_choicePage {

	public yachtDetails:any;
	public imageUrl:string;
	public yachtFilterParams:any;
	public yachtCartAmount:any;
	public formula:string;
	public formulaPrice:number;
	public extraTime:number;
	public deliveryRate:number;
	public regularPrice:number;
	public dropOffRate:number;
	public transactionFee:number;
	public yachtSubTotal:number;
	public yachtTotal:number;
  public userDetails:any;
  public yachtLimo:any;
  public currencyName:string;
  public isTerm:boolean;


  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'no',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes'//Windows only    
    };


  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,private iab: InAppBrowser,public modalCtrl: ModalController) {
      this.yachtLimo = JSON.parse(window.localStorage.getItem('yachtLimoObject'));
      this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
      this.yachtDetails = JSON.parse(window.localStorage.getItem('yachtMoreDetailsObject'));
      this.yachtFilterParams = JSON.parse(window.localStorage.getItem('yachtFilterParams'));
      this.imageUrl = serviceVar.IMAGE_PATH; 
      this.yachtCartAmount = serviceVar.yachtCartAmount != null ? serviceVar.yachtCartAmount : 0;
      this.extraTime = 0;
      this.regularPrice = 0;
      this.deliveryRate = 0;
      this.dropOffRate = 0;
      this.formulaPrice= 0;
      this.transactionFee = 0;
      this.isTerm = false;
      serviceVar.getDeliveryRate(this.yachtFilterParams.departureCity,this.yachtDetails.portOfRegistryId);
      serviceVar.getFormulaPrice(this.yachtFilterParams.arrivalCity,this.yachtFilterParams.departureCity);
      serviceVar.getDropOff(this.yachtFilterParams.arrivalCity,this.yachtDetails.portOfRegistryId);
      this.callAllSubscribe(events);
      console.log("USER_DETAILS"+this.userDetails);
      console.log("user_id"+this.userDetails.id);
  }

  ngOnInit() {
    this.callAllSubscribe(this.events);
  }

  goToContract(){
    this.navCtrl.push(YachtContractPage);
  }
  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = Your_choicePage;
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

     //call for untill get total amount
     this.serviceVar.showLoader('Please Wait Updating Information...');

    events.subscribe('yachtDeliveryRateEvent', object => { // get yacht state by custom events
         if(object != null){

         	var timeDifference = 0;
       	 if (this.yachtFilterParams.routeType == 1) {
              if (this.yachtFilterParams.yachtType == 1) {
                timeDifference = object.motorOneWayTime;
               }else{
                timeDifference = object.sailOneWayTime;
              }

           }else{
              if (this.yachtFilterParams.yachtType == 1) {
                   timeDifference = object.motorOneWayTime;
			  }else{
                   timeDifference = object.sailOneWayTime;
				 }
            }

             if (this.yachtFilterParams.departureCityName != this.yachtDetails.portOfRegistry) {
                 this.deliveryRate = (timeDifference / 60) * this.yachtDetails.fuelConsumption * this.yachtDetails.commercialFuelPrice;


            } else {
              	this.deliveryRate = 0;
             
      		}


          }

         
      }); // end delivery rate




    events.subscribe('yachtFormulaPriceEvent', object => { 
    	console.log("mukesh"+JSON.stringify(object));
    	if(object != null){

    		 var timeDifference = 0;

	            if (this.yachtFilterParams.routeType == 1) {
	              if (this.yachtFilterParams.yachtType == 1) {

	                timeDifference = object.motorOneWayTotalTime;
	              } else {

	                timeDifference = object.sailOneWayTotalTime;
	              }

	            } else {
	              if (this.yachtFilterParams.yachtType == 0) {

	                timeDifference = object.sailReturnTotalTime;
	              } else {

	                timeDifference = object.motorReturnTotalTime;
	              }
	            }

	           //end calulating time diff
	           
	        if (this.yachtFilterParams.daysId != 5) {
             
              		this.regularPrice = (timeDifference / 60) * parseInt(this.yachtDetails.fuelConsumption) * parseInt(this.yachtDetails.commercialFuelPrice);
            } else {
             
            	 this.regularPrice  =     (parseInt(this.yachtFilterParams.price) * 35) / 100;
            }
 				

            /******************get formula price*************/
            	 var dayDifference = 0;
            	 var arrivalDate = new Date(this.yachtFilterParams.arrivalDate);
    			 var departureDate = new Date(this.yachtFilterParams.departureDate);

			    var timeDiff = Math.abs(arrivalDate.getTime() - departureDate.getTime());
			  
			    if (this.yachtFilterParams.daysId == 3) {
			     
			         dayDifference = (Math.ceil(timeDiff / (1000 * 3600 * 24))) * 1.5;
			
			    } else if (this.yachtFilterParams.daysId == 5) {
			     
			       dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
			   
			    } else {
			   			dayDifference = 1;
				}

        console.log("REGULAR_PRICE"+this.regularPrice);
        console.log("DAY_DIFF"+dayDifference);
				this.formulaPrice = this.regularPrice * dayDifference;

    	}

         
   	 }); //end  get regular price



     events.subscribe('yachtDropOffEvent', object => { 

     		if(object != null){
     		var timeDifference = 0;

     	     if (this.yachtFilterParams.routeType == 1) {
	              if (this.yachtFilterParams.yachtType == 1) {
               			 timeDifference = object.motorOneWayTime;
              } else {
              		  timeDifference = object.sailOneWayTotalTime;
              }

            } else {

              if (this.yachtFilterParams.yachtType == 1) {
                timeDifference = object.motorReturnTime;
              } else {
                timeDifference = object.sailReturnTime;
              }
            }

          if (this.yachtFilterParams.routeType == 1) {
            if (this.yachtFilterParams.arrivalCityName !== this.yachtDetails.portOfRegistry) {
             
              this.dropOffRate = (timeDifference / 60) * parseInt(this.yachtDetails.fuelConsumption) * parseInt(this.yachtDetails.commercialFuelPrice);
             
            } else {
             this.dropOffRate = 0;
              
            }

          }else{
              if (this.yachtFilterParams.departureCityName !== this.yachtDetails.portOfRegistry) {
             
              this.dropOffRate = (timeDifference / 60) * parseInt(this.yachtDetails.fuelConsumption) * parseInt(this.yachtDetails.commercialFuelPrice);
             
            } else {
              this.dropOffRate = 0;
              
            }
          }


        }

            

     }); //end dropOff events	


     setTimeout(()=>{
       console.log("DROP"+this.dropOffRate)
     	this.yachtSubTotal = parseInt(this.yachtFilterParams.price) + this.extraTime + this.deliveryRate +  this.dropOffRate + this.formulaPrice + this.yachtCartAmount;
     	console.log("Price"+parseInt(this.yachtFilterParams.price) +   this.extraTime + this.deliveryRate +  this.dropOffRate + this.formulaPrice + this.yachtCartAmount);
     	this.transactionFee = this.yachtSubTotal * 0.035;
     	this.yachtTotal = this.yachtSubTotal + this.transactionFee;
     	this.serviceVar.hideLoader();  

       if(window.localStorage.getItem('yachtFilterParams') != null){
          let yachtFilterParams = JSON.parse(window.localStorage.getItem('yachtFilterParams'));
          yachtFilterParams.formulaPrice = this.formulaPrice;
          yachtFilterParams.deliveryRate = this.deliveryRate;
          yachtFilterParams.yachtTotal = this.yachtTotal;
          window.localStorage.setItem('yachtFilterParams',JSON.stringify(yachtFilterParams));
        }




     },3000); //GET ALL TOTAL AMOUT



     //YACHT  SUBMIT ORDER EVENET
       events.subscribe('OrderEvent', object => { // send request to immidia Build
             
                setTimeout(()=>{
                   this.serviceVar.hideLoader();
                 },1000);

           if(object!=null && object !=""){
              const browser = this.iab.create('http://www.immidia.co/immidia/api/ws/controller/?access=true&action=payment&bookingId='+object,"_system",this.options);
                //REMOVE SESSION 
               window.localStorage.removeItem('yachtFilterParams');
               window.localStorage.removeItem('yachtMoreDetailsObject');
               window.localStorage.removeItem('yachtLimoObject');
           }

            setTimeout(()=>{
                
                this.navCtrl.popTo(BooknowPage);
               });
       });

    



	} // end of events calling






  getFormulaPrice(){

  	if (this.yachtFilterParams.daysId != 5) {

           if (this.yachtFilterParams.routeType == 0){
               this.formula  = "Return";
            	}else{
               this.formula = "Regular";
          	}
      
      }else{
             this.formula = 'Customized';
       
       }
       return this.formula;
  }


  	getExtraTime(){
  	      var departureHours = this.yachtFilterParams.departureHour.split(':');
          var departureMins = (+departureHours[0]) * 60 + (+departureHours[1]);
          var arrivalHours = this.yachtFilterParams.arrivalHour.split(':');
          var arrivalMins = (+arrivalHours[0]) * 60 + (+arrivalHours[1]);
         

         if (this.yachtFilterParams.daysId == 1 || this.yachtFilterParams.daysId == 2) {
            if ((arrivalMins - departureMins) == 300) {
             	 this.extraTime = (0.1 * this.yachtFilterParams.price);
            } else if ((arrivalMins - departureMins) < 360 && (arrivalMins - departureMins) > 300) {
              this.extraTime = (0.2 * this.yachtFilterParams.price);
            } else if ((arrivalMins - departureMins) < 420 && (arrivalMins - departureMins) > 360) {
              this.extraTime = (0.3 * this.yachtFilterParams.price);
            } else if ((arrivalMins - departureMins) < 480 && (arrivalMins - departureMins) > 420) {
              this.extraTime = (0.4 * this.yachtFilterParams.price);
            } else if ((arrivalMins - departureMins) > 480) {
              this.extraTime = (0.4 * this.yachtFilterParams.price);
            }
          }
          if (this.yachtFilterParams.daysId  == 4 || this.yachtFilterParams.daysId  == 5) {
            if ((arrivalMins - departureMins) == 660) {
             this.extraTime = (0.1 *  this.yachtFilterParams.price);
            } else if ((arrivalMins - departureMins) < 720 && (arrivalMins - departureMins) > 660) {
              this.extraTime = (0.2 * this.yachtFilterParams.price);
            } else if ((arrivalMins - departureMins) < 780 && (arrivalMins - departureMins) > 720) {
              this.extraTime = (0.3 * this.yachtFilterParams.price);
            } else if ((arrivalMins - departureMins) < 840 && (arrivalMins - departureMins) > 780) {
             this.extraTime = (0.4 *  this.yachtFilterParams.price);
            } else if ((arrivalMins - departureMins) > 840) {
             this.extraTime = (0.4 *  this.yachtFilterParams.price);
            }
          }
          if (this.yachtFilterParams.daysId  == 3) {
            if ((arrivalMins - departureMins) == 1500) {
              this.extraTime = (0.1 * this.yachtFilterParams.price);
            } else if ((arrivalMins - departureMins) < 1560 && (arrivalMins - departureMins) > 1500) {
             this.extraTime = (0.2 *  this.yachtFilterParams.price);
            } else if ((arrivalMins - departureMins) < 1620 && (arrivalMins - departureMins) > 1560) {
             this.extraTime = (0.3 *  this.yachtFilterParams.price);
            } else if ((arrivalMins - departureMins) < 1680 && (arrivalMins - departureMins) > 1620) {
              this.extraTime = (0.4 * this.yachtFilterParams.price);
            } else if ((arrivalMins - departureMins) > 1680) {
             this.extraTime = (0.4 *  this.yachtFilterParams.price);
            }
          }

          return this.extraTime;
  }

    
   isPay(selectedValue:any){
     this.isTerm = selectedValue;
   }


  submitOrder(){

    if(this.serviceVar.isLogin != true){
      this.serviceVar.openAlert('Login!!','Please Login First.');
      return false;
    }
  

    //prepare parameter for yacht submit order
    let yachtOrderRequest = {
          id            :  this.yachtDetails.id,
          name          :  this.yachtDetails.name,
          bookingType   :  4,
          departureDate :  this.yachtFilterParams.departureDate,
          arrivalDate   :  (this.yachtFilterParams.arrivalDate != null) ? this.yachtFilterParams.arrivalDate : this.yachtFilterParams.departureDate,
          ownerId       :  this.yachtDetails.ownerId,
          routeType     :  this.yachtFilterParams.routeType,
          menuDetails   :  this.serviceVar.yachtAddToCart,
          fromArea      :  this.yachtFilterParams.departureCityName,
          type          :  "Add",
          toArea        :  this.yachtFilterParams.arrivalCityName,
          currency      :  this.serviceVar.getCurrency(this.yachtDetails.currencyId),
          userId        :  this.userDetails.id,
          guests        :  this.yachtFilterParams.guest,
          deliveryPrice :   Math.floor(this.deliveryRate),
          dropOffRate   :   Math.floor(this.dropOffRate),
          formulaPrice  :   Math.floor(this.formulaPrice),
          foodPrice     :   Math.floor(this.serviceVar.yachtCartAmount),
          productPrice  :   Math.floor(this.yachtDetails.price),
          extraTime     :   Math.floor(this.extraTime),
          subtotal      :   Math.floor(this.yachtSubTotal),
          total         :   Math.floor(this.yachtTotal),
          transactionFee:   Math.floor(this.transactionFee),
          websiteId     :  0, // for whitelabel case either should be 0
          departureHours:  this.yachtFilterParams.departureHour,
          arrivalHours  :  this.yachtFilterParams.arrivalHour,
          limoDetails   :  this.yachtLimo,
          stateId       :  this.yachtFilterParams.stateId,
          days          :  this.yachtFilterParams.days
      };




   console.log("SUbmit_YACHT_ORDER"+JSON.stringify(yachtOrderRequest));
       
      
      if(this.isTerm == true){
        this.serviceVar.SubmitOrder(yachtOrderRequest);
      }else{
        this.serviceVar.openAlert("Alert!!",'Please Read Contract Terms & Conditions. ');
        return false;
      }
    

  }




}

