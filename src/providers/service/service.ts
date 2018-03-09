import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Events} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {AlertController} from 'ionic-angular';
import { ModalController , ViewController  } from 'ionic-angular';
import 'rxjs/add/operator/timeout';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServiceProvider {
	//define class variable
    API_URL : string =  'http://immidia.co/immidia/api/ws/controller/index.php?';
    IMAGE_PATH:string;
    yachtCountry:any;
    carCountry:any;
    villaCountry:any;
    yachtState :any;
    yachtDepartureCity:any;
    yachtArrivalCity:any;
    carState:any;
    carDays:any;
    villaState:any;
    customLoading:any
    carClassification:any;
    bookingFilterObject:any;
    yachtDetails:any;
    isQuickYachtFilter:boolean;
    isQuickCarFilter:boolean;
    isQuickVillaFilter:boolean;
    carCity:any;
    villaCity:any;
    Time:any;
    yachtFoodList:any;
    yachtAddToCart:any;
    yachtCartAmount:any;
    yachtTime:any;
   	villaFoodList:any;
   	villaAddToCart:any;
   	villaCartAmount:any;
   	isLogin:boolean;
   	loginCurrentPages:any;
   	userDetails:any;
   	userCountry:any;
    userState:any;
    userCity:any;
    modalObject:any;
    isSuperYacht:boolean;

  constructor(private http: Http, public loadingCtrl: LoadingController,public events: Events,private alertController: AlertController,public modalCtrl: ModalController) {
    	this.yachtCountry = null;
    	this.carCountry = null;
    	this.villaCountry= null;
        this.yachtState = null;
    	this.carState = null
   		this.villaState = null;
   		this.carDays = null;
   		this.IMAGE_PATH = 'http://immidia.co/immidia/';
   		this.isQuickYachtFilter = false;
   		this.isQuickCarFilter = false;
   		this.isQuickVillaFilter = false;
   		this.yachtFoodList= null;
   		this.yachtAddToCart = [];
   		this.villaAddToCart = [];
   		this.isSuperYacht = false;
   	

   		if(window.localStorage.getItem('isLogin') != null || window.localStorage.getItem('isLogin') != undefined){
   			this.isLogin = (window.localStorage.getItem('isLogin') == '1' ) ? true : false;
   			
   	
   		}else{
   			this.isLogin = false;
   		
   		}
   		//console.log("IsLoginService"+this.isLogin);
    }


    /*****************************CUSTOM FUNCTION*****************************
							CUSTOM FUNCTION BLOCK START
     *************************************************************************/

  	defaultLoader(){

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 2000);
    }


    showToModal(pageName){
     this.modalObject = this.modalCtrl.create(pageName); // login validate
        this.modalObject.present();
    }

    hideToModal(){

    		if(this.modalObject){
		        this.modalObject.dismiss();
		        this.modalObject = null;
   		    }  
    }



    showLoader(msg:string){
      this.customLoading = this.loadingCtrl.create({
        content: msg,
        duration: 5000,
        dismissOnPageChange: false
      });

      this.customLoading.present();
    }


    hideLoader(){

    	if(this.customLoading){
		        this.customLoading.dismissAll();
		        this.customLoading = null;
   		 }  	
    }

    diffDays(d1, d2)
    {
      var ndays;
      var tv1 = d1.valueOf();  // msec since 1970
      var tv2 = d2.valueOf();

      ndays = (tv2 - tv1) / 1000 / 86400;
      ndays = Math.round(ndays - 0.5);
      return ndays;
    }

    openAlert(title,msg){
  	 	let alert = this.alertController.create({
        title: title,
        subTitle: msg,
        buttons: ['OK']
  	  });
  	  alert.present();
    }

    jsonToQueryString(json) {
            return '?' + 
                Object.keys(json).map(function(key) {
                    return encodeURIComponent(key) + '=' +
                        encodeURIComponent(json[key]);
                }).join('&');
     }


   	 parseQueryString(queryString) {
       var params = {}, queries, temp, i, l;
    // Split into key/value pairs
		    queries = queryString.split("&");
		    // Convert the array of strings into an object
		    for ( i = 0, l = queries.length; i < l; i++ ) {
		        temp = queries[i].split('=');
		        params[temp[0]] = temp[1];
		    }
		    return params;
 	 }

 /*********************COMMON FUNCTION FOR ALL CATEGORY*****************/
	getBookingStatus(bookingId) { // Common funciton for all
		    
		 
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_booking_details&bookingId='+bookingId)
		       	.timeout(3000)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		        this.events.publish('bookingStatusEvent',data.data);
		        
		      	}else{
		      		
		      	  this.events.publish('bookingStatusEvent',null);

		      	}
		          ////console.log(JSON.stringify(this.yachtCountry));
		          resolve(data.data);
		        },
		        error =>{
		        	
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	 }

 	getCurrency(currencyId){
 	  	
      if (currencyId == 1) {
             return 'EURO';
      } else if (currencyId == 2) {
        	 return	 'USD';
      } else if (currencyId == 3) {
             return  'AED';
      }
      
  	}

  	getCurrencyInSymbol(currencyId){ // if need any symbol need to replace text
  		  if (currencyId == 1) {
             return 'EURO';
	      } else if (currencyId == 2) {
	        	 return	 'USD';
	      } else if (currencyId == 3) {
	             return  'AED';
	      }
  	}


  	SubmitOrder(data){

 	  		this.showLoader('Please Wait for Payment....');
 	  

 	  		var result =  this.jsonToQueryString(data).replace("?","");;
 	  		console.log("NOW RESULT Is"+result);

 	 		 return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=booking&'+result)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		        this.events.publish('OrderEvent',data.data);
		        
		      	}else{
		      		this.hideLoader();
		      	this.events.publish('OrderEvent',null);
		      	 
		      	}
		        // alert("YACHT_submit"+JSON.stringify(data.data));
		          resolve(data.data);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	  		
 	  	}

    /*****************************CUSTOM FUNCTION*****************************
							CUSTOM FUNCTION BLOCK END
     *************************************************************************
		/	
			/	
				/	
					/

						/
							/
								/
									/
										/
											/
												/


    /*****************************YACHT FUNCTION*****************************
							YACHT FUNCTION BLOCK START
     *************************************************************************/


   getYachtCountry() { // country for yacht
		    
		 
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_yachtcountry_list')
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		          this.yachtCountry = data.data;
		      	}else{
		     
		      	  this.yachtCountry = null;
		      	}
		          ////console.log(JSON.stringify(this.yachtCountry));
		          resolve(this.yachtCountry);
		        },
		        error =>{
		      
		        		//this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	 }


 	  getYachtState(country) { //country for villa
 	  	console.log("country==="+country);
 	  		this.showLoader('Listing Yacht States..');
		
		    return new Promise(resolve => {
		    	console.log("hello mukesh ");
		      this.http.get(this.API_URL+'access=true&action=get_yachtstate_list&countryId='+country)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
		        	 console.log("state11"+JSON.stringify(this.yachtState));
		          this.yachtState = data.data;
		          this.events.publish('yachtStateEvent',data.data);
		      	}else{
		      	   this.hideLoader();
		      	  this.yachtState = null;
		      	  this.events.publish('yachtStateEvent',null);
		      	}
		         console.log("state"+JSON.stringify(this.yachtState));
		          resolve(data.data);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }


 

 	     getYachtDepartureCity(country,state,days,daysId,yachtType,routeType) { //country for villa

 	    // console.log(this.API_URL+'access=true&action=get_yachtdeparture_list&countryId='+country+'&stateId='+state+'&days='+days+'&daysId='+daysId+'&yachtType='+yachtType+'&routeType='+routeType);
 	  		this.showLoader('Listing Yacht Departure Cities..');
		   
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_yachtdeparture_list&countryId='+country+'&stateId='+state+'&days='+days+'&daysId='+daysId+'&yachtType='+yachtType+'&routeType='+routeType)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
				  this.yachtDepartureCity = data.data;
		          this.events.publish('yachtDepartureCityEvent',data.data);
		      	}else{
		      		this.hideLoader();
		      	  this.yachtDepartureCity = null;
		      	   this.events.publish('yachtDepartureCityEvent',null);
		      	}
		          //console.log(JSON.stringify(this.yachtDepartureCity));

		         
		          resolve(this.yachtDepartureCity);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }

 	   getYachtArrivalCity(country,state,days,daysId,departureCity,yachtType,routeType) { //country for villa

 	    	////console.log(this.API_URL+'access=true&action=get_yachtdeparture_list&countryId='+country+'&stateId='+state+'&days='+days+'&daysId='+daysId+'&yachtType='+yachtType+'&routeType='+routeType);
 	  		this.showLoader('Listing Yacht Arrival Cities..');
		  
		 	
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_yacht_arrival_port&countryId='+country+'&stateId='+state+'&days='+days+'&daysId='+daysId+'&departureId='+departureCity+'&yachtType='+yachtType+'&routeType='+routeType)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
				  this.yachtArrivalCity = data.data;
		          this.events.publish('yachtArrivalCityEvent',data.data);
		      	}else{
		      		this.hideLoader();
		      	  this.yachtArrivalCity = null;
		      	   this.events.publish('yachtArrivalCityEvent',null);
		      	}
		          //console.log(JSON.stringify(this.yachtArrivalCity));

		         
		          resolve(this.yachtArrivalCity);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }

 	  getYachtBookingFilterData(guest,state,departureCity,days,departureDate,yachtType,routeType,arrivalCity) { //country for villa
 	  		this.isQuickCarFilter = false;	
 	    	this.showLoader('Please Wait Data is Listing...');
 	    	console.log(this.API_URL+'access=true&action=get_yacht_booking_list&guests='+guest+'&stateId='+state+'&startCity='+departureCity+'&days='+days+'&bookingDate='+departureDate+'&yachtType='+yachtType+'&routeType='+routeType+'&arrivalPort='+arrivalCity); 
			    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_yacht_booking_list&guests='+guest+'&stateId='+state+'&startCity='+departureCity+'&days='+days+'&bookingDate='+departureDate+'&yachtType='+yachtType+'&routeType='+routeType+'&arrivalPort='+arrivalCity)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
				  this.bookingFilterObject = data.data;
		          this.events.publish('yachtBookingFilterEvent',data.data);
		      	}else{
		      		this.hideLoader();
		      	  this.bookingFilterObject = null;
		      	   this.events.publish('yachtBookingFilterEvent',null);
		      	}
		          //console.log(JSON.stringify(this.bookingFilterObject));

		         
		          resolve(this.bookingFilterObject);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }


 	    getYachtBrowseFeetFilterData(stateId,yachtType,guest) { //country for villa
 	    	this.isQuickYachtFilter = true;
 	    	this.showLoader('Please Wait Data is Listing...');
 	    	  console.log("hello----????????????");
			    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_quick_yacht_available_list&destination='+stateId+'&yachtType='+yachtType+'&guests='+guest)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
				  this.bookingFilterObject = data.data;
		          this.events.publish('yachtBookingFilterEvent',data.data);
		      	}else{
		      		this.hideLoader();
		      	  this.bookingFilterObject = null;
		      	   this.events.publish('yachtBookingFilterEvent',null);
		      	}
		          console.log("hello----");

		         
		          resolve(this.bookingFilterObject);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }

 	   getYachtDetails(yachtId){ //get yacht details

 	    	
 	  		
		    return new Promise(resolve => {
		    	
		      this.http.get(this.API_URL+'access=true&action=get_yacht_details&yachtId='+yachtId)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
			
		          this.events.publish('yachtDetailsEvent',data.data);
		      	}else{
		      	   this.hideLoader();
		      	   this.events.publish('yachtDetailsEvent',null);
		      	}
		         
		         
		          resolve(data.data);
		        },

		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }




   		getAllTime() { // country for yacht
		    
		 
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_time_list')
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		          this.Time = data.data;
		      	}else{
		      	  this.Time = null;
		      	}
		          //console.log(JSON.stringify(this.Time));
		          resolve(this.Time);
		        },
		        error =>{
		        	
		       				this.openAlert('Network Eorror','No internet access !');
		        });
		    });
 	 }


 	  getYachtMoreDetailsSubmitData(yachtId,departureCity,arrivalCity,days) { //country for villa
 	    	
 	    	this.showLoader('Please Wait Data is Listing...');
			    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_yacht_booking_list&yachtId='+yachtId+'&startPort='+departureCity+'&endCity='+arrivalCity+'&days='+days)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
			
		          this.events.publish('yachtMoreDetailsSubmitEvent',data.data);
		      	}else{
		      	 this.hideLoader();
		      	   this.events.publish('yachtMoreDetailsSubmitEvent',null);
		      	}
		          //console.log(JSON.stringify(data.data));

		         
		          resolve(data.data);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }


 	 	getYachtFood(stateId,departureCity){

 	 		this.showLoader('Please Wait Data is Listing...');
 	 		 return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_categorylistby_city&stateId='+stateId+'&cityId='+departureCity)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		        this.events.publish('yachtFoodListEvent',data.data);
		          this.yachtFoodList = data.data;
		      	}else{
		      		this.hideLoader();
		      	this.events.publish('yachtFoodListEvent',null);
		      	  this.yachtFoodList = null;
		      	}
		          //console.log(JSON.stringify(this.yachtFoodList));
		          resolve(this.yachtFoodList);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	 		
 	 	}

 	  	getDeliveryRate(departureCity,portOfReg){
 	  		 return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_deliverylime_ports&departurePort='+departureCity+'&portOfRegistryId='+portOfReg)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		        
		             this.events.publish('yachtDeliveryRateEvent',data.data);
		      	}else{
		      	 
		      	     this.events.publish('yachtDeliveryRateEvent',data.data);
		      	}
		          //console.log(JSON.stringify(data.data));
		          resolve(data.data);
		        },
		        error =>{
		        	
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	  	}
 	  
 	  	getFormulaPrice(arrivalCity,departureCity){
 	  		 return new Promise(resolve => {
 	  		 	console.log(this.API_URL+'access=true&action=get_formula_price&arrivalPort='+arrivalCity+'&departurePort='+departureCity);
		      this.http.get(this.API_URL+'access=true&action=get_formula_price&arrivalPort='+arrivalCity+'&departurePort='+departureCity)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		        
		             this.events.publish('yachtFormulaPriceEvent',data.data);
		      	}else{
		      	 
		      	     this.events.publish('yachtFormulaPriceEvent',data.data);
		      	}
		          console.log("FORMULA_P"+JSON.stringify(data.data));
		          resolve(data.data);
		        },
		        error =>{
		        	
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	  	}

 	  	getDropOff(arrivalCity,portOfReg){
 	  		 return new Promise(resolve => {
 	  		 	console.log(this.API_URL+'access=true&action=get_dropOffTime_ports&arrivalPort='+arrivalCity+'&portOfRegistryId='+portOfReg);
		      this.http.get(this.API_URL+'access=true&action=get_dropOffTime_ports&arrivalPort='+arrivalCity+'&portOfRegistryId='+portOfReg)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		        
		             this.events.publish('yachtDropOffEvent',data.data);
		      	}else{
		      	 
		      	     this.events.publish('yachtDropOffEvent',data.data);
		      	}
		          console.log("DROPOOF"+JSON.stringify(data.data));
		          resolve(data.data);
		        },
		        error =>{
		        	
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	  	}


 	  	

	  superYachtDetails(mailId,name,country,msg,state,routeType,days,departureDate,depPortName,arrPortName,guest){

 	  		this.showLoader('Please wait ...');	
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+ 'access=true&action=super_yacht_mail&mailId='+mailId+'&name='+name+'&country='+country+'&message='+msg+'&state='+state+'&routeType='+routeType+'&days='+days+'&journeyDate='+departureDate+'&departurePort='+depPortName+'&arrivalPort='+arrPortName+'&noOfGuests='+guest)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
		          this.events.publish('superYachtEvent',data.data);
		      	}else{
		      		this.hideLoader();
		      	   this.events.publish('superYachtEvent',null);
		      	}
		          //console.log(JSON.stringify(data.data));		         
		          resolve(data.data);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }



	


 	 /*****************************YACHT FUNCTION*****************************
							YACHT FUNCTION BLOCK END
     *************************************************************************

     	/	
			/	
				/	
					/

						/
							/
								/
									/
										/
											/
												/
	 *****************************CAR FUNCTION*****************************
							CAR FUNCTION BLOCK START
     *************************************************************************/


      getCarChauffureData(duration,country) { //country for villa
      	console.log("asdasd===9");
 	   			    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_chauffeur_list_by_country&time='+duration+'&country_code='+country)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
				 console.log("asdasd===7");
		          this.events.publish('carChauffureEvent',data.data);
		      	}else{
		      		this.hideLoader();
		     
		      	   this.events.publish('carChauffureEvent',null);
		      	}
		          //console.log(JSON.stringify(this.bookingFilterObject));

		         
		          resolve(data.data);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }


 	 getCarCountry() { //country for villa
		   
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_allcountry_list_car')
		        .map(res => res.json())
		        .subscribe(data => {
		          this.carCountry = data.data;

		          //console.log(JSON.stringify(this.carCountry));
		          resolve(this.carCountry);
		        },
		        error =>{
		        	
		        		//this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	 }


 	  

 	  

 		  getCarState(){ //country for villa
			  
			 
			    return new Promise(resolve => {
			      this.http.get(this.API_URL+'access=true&action=get_state_list_car')
			        .map(res => res.json())
			        .subscribe(data => {
			          this.carState = data.data;
			          //console.log(JSON.stringify(this.carState));
			          resolve(this.carState);
			        },
			        error =>{
			        		
			        		//this.openAlert('Error!!',JSON.stringify(error));
			        });
			    });
 	  	  }	

 	  	 getCarHours(){ //country for villa
			    
			    return new Promise(resolve => {
			      this.http.get(this.API_URL+'access=true&action=get_allhour_list')
			        .map(res => res.json())
			        .subscribe(data => {
			          this.carDays = data.data;
			          //console.log(JSON.stringify(this.carDays));
			          resolve(this.carDays);
			        },
			        error =>{
			        		
			        	//	this.openAlert('Error!!',JSON.stringify(error));
			        });
			    });
 	  	  }	




 	  	   getCarCity(){ //country for villa
			    return new Promise(resolve => {
			      this.http.get(this.API_URL+'access=true&action=get_cities_list')
			        .map(res => res.json())
			        .subscribe(data => {
			          this.carCity = data.data;
			          //console.log(JSON.stringify(this.carCity));
			          resolve(this.carCity);
			        },
		        error =>{
		        	
		        		//this.openAlert('Error!!',JSON.stringify(error));
		        });
			    });
 	  	  }	


 	  	  



 	  	   getCarClassification(){ //country for villa
			  
			 
			    return new Promise(resolve => {
			      this.http.get(this.API_URL+'access=true&action=get_classification_list')
			        .map(res => res.json())
			        .subscribe(data => {
			          this.carClassification = data.data;
			          //console.log(JSON.stringify(this.carClassification));
			          resolve(this.carClassification);
			        },
		        error =>{
		        	
		        		//this.openAlert('Error!!',JSON.stringify(error));
		        });
			    });
 	  	  }	


 	  	  getCarBookingFilterData(days,guest,stateId,departureDate,driverType,classification) { //country for villa
 	  		this.isQuickCarFilter = false;	
 	    	this.showLoader('Please Wait Data is Listing...');
			    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_car_available_list&days='+days+'&noOfPasenger='+guest+'&stateId='+stateId+'&bookingDate='+departureDate+'&driver='+driverType+'&classification='+classification)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
				  this.bookingFilterObject = data.data;
		          this.events.publish('carBookingFilterEvent',data.data);
		      	}else{
		      		this.hideLoader();
		      	  this.bookingFilterObject = null;
		      	   this.events.publish('carBookingFilterEvent',null);
		      	}
		          //console.log(JSON.stringify(this.bookingFilterObject));

		         
		          resolve(data.data);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }


 	    getCarBrowseFeetFilterData(departureCity,guest) { //country for villa
 	    	this.isQuickCarFilter = true;
 	    	this.showLoader('Please Wait Data is Listing...');
			    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_quick_car_available_list&destination='+departureCity+'&guests='+guest)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
				  this.bookingFilterObject = data.data;
		          this.events.publish('carBookingFilterEvent',data.data);
		      	}else{
		      		this.hideLoader();
		      	  this.bookingFilterObject = null;
		      	   this.events.publish('carBookingFilterEvent',null);
		      	}
		          //console.log(JSON.stringify(this.bookingFilterObject));

		         
		          resolve(this.bookingFilterObject);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }




 	   getCarDetails(carId){

 	  		this.showLoader('Listing Car Details...');	
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_car_details&carId='+carId)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
		          this.events.publish('carDetailsEvent',data.data);
		      	}else{
		      		this.hideLoader();
		      	   this.events.publish('carDetailsEvent',null);
		      	}
		          //console.log(JSON.stringify(data.data));		         
		          resolve(data.data);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }
 	  	  

 	  getCarMoreDetailsSubmitData(carId,departureCity,arrivalCity,days,departureDate) { //country for villa
 	    	
 	    	this.showLoader('Please Wait Data is Listing...');
			    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_individualcar_availability&carId='+carId+'&startCity='+departureCity+'&endCity='+arrivalCity+'&days='+days+'&bookingDate='+departureDate)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
			
		          this.events.publish('carMoreDetailsSubmitEvent',data.data);
		      	}else{
		      	 this.hideLoader();
		      	   this.events.publish('carMoreDetailsSubmitEvent',null);
		      	}
		          //console.log(JSON.stringify(data.data));

		         
		          resolve(data.data);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }




 	 /*****************************CAR FUNCTION*****************************
							CAR FUNCTION BLOCK END
     *************************************************************************
 	   	/	
			/	
				/	
					/

						/
							/
								/
									/
										/
											/
												/
	 *****************************VILLA FUNCTION*****************************
							VILLA FUNCTION BLOCK START
     *************************************************************************/


 	  
 	   getVillaState() { //country for villa
		   
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_state_list_villa')
		        .map(res => res.json())
		        .subscribe(data => {
		          this.villaState = data.data;
		          //console.log(JSON.stringify(this.villaState));
		          resolve(this.villaState);
		        },
		        error =>{
		        
		        		//this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }

 	   getVillaCountry() { //country for villa
		   
		 
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_allcountry_list_villa')
		        .map(res => res.json())
		        .subscribe(data => {
		          this.villaCountry = data.data;
		          //console.log(JSON.stringify(this.villaCountry));
		          resolve(this.villaCountry);
		        },
		        error =>{
		        		
		        		//this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	  }

 	   	getVillaMoreDetailsSubmitData(villaId,checkIn,checkOut) { //country for villa
 	    	
 	    	this.showLoader('Please Wait Data is Listing...');
			    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_villa_details&villaId='+villaId+'&arrivalDateTime='+checkIn+'&departureDateTime='+checkOut)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
			
		          this.events.publish('villaMoreDetailsSubmitEvent',data.data);
		      	}else{
		      	 this.hideLoader();
		      	   this.events.publish('villaMoreDetailsSubmitEvent',null);
		      	}
		          //console.log(JSON.stringify(data.data));

		         
		          resolve(data.data);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }


 	  	getVillaCity(){ //country for villa
			    return new Promise(resolve => {
			      this.http.get(this.API_URL+'access=true&action=get_city_list')
			        .map(res => res.json())
			        .subscribe(data => {
			          this.villaCity= data.data;
			          //console.log(JSON.stringify(this.villaCity));
			          resolve(this.villaCity);
			        },
		        error =>{
		        	
		        		//this.openAlert('Error!!',JSON.stringify(error));
		        		});
			    });
 	  	  }	

 	  	 getVillaBookingFilterData(destinationCity,guest,checkIn,checkOut) { //country for villa
 	  		console.log("Villa_SUBMIT_BOOK"+this.API_URL+'access=true&action=get_villa_booking_list&destinationId='+destinationCity+'&guests='+guest+'&arrivalDateTime='+checkIn+'&departureDateTime='+checkOut);
 	  		this.isQuickVillaFilter = false;	
 	    	this.showLoader('Please Wait Data is Listing...');
			    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_villa_booking_list&destinationId='+destinationCity+'&guests='+guest+'&arrivalDateTime='+checkIn+'&departureDateTime='+checkOut)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
				  this.bookingFilterObject = data.data;
		          this.events.publish('villaBookingFilterEvent',data.data);
		      	}else{
		      		this.hideLoader();
		      	  this.bookingFilterObject = null;
		      	   this.events.publish('villaBookingFilterEvent',null);
		      	}
		          console.log("VILLA_DATA_BOOKING"+JSON.stringify(this.bookingFilterObject));

		         
		          resolve(data.data);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }



 	   getVillaBrowseFeetFilterData(destinationCity,guest) { //country for villa
 	    	this.isQuickVillaFilter = true;
 	    	this.showLoader('Please Wait Data is Listing...');
 	    	console.log(this.API_URL+'access=true&action=get_quick_vill_available_list&destination='+destinationCity+'&guests='+guest);
			
			 return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_quick_vill_available_list&destination='+destinationCity+'&guests='+guest)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
				  this.bookingFilterObject = data.data;
		          this.events.publish('villaBookingFilterEvent',data.data);
		      	}else{
		      		this.hideLoader();
		      	  this.bookingFilterObject = null;
		      	   this.events.publish('villaBookingFilterEvent',null);
		      	}
		          console.log("VILLA_DATA"+JSON.stringify(data.data));
		          resolve(data.data);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }

 	      getVillaSaleFilterData(countryId) { //country for villa
 	    	
 	    	this.showLoader('Please Wait Data is Listing...');
 	    	console.log(this.API_URL+'access=true&action=get_villa_sale_list&country='+countryId);
			 return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_villa_sale_list&country='+countryId)
		        .map(res => res.json())
		        .subscribe(data => {
		        	console.log("SALES_DATA"+JSON.stringify(data));
		        if(data.status == true){	
				  
		          this.events.publish('villaSaleFilterEvent',data.data);
		      	}else{
		      		this.hideLoader();
		      	  this.bookingFilterObject = null;
		      	   this.events.publish('villaSaleFilterEvent',null);
		      	}
		        
		          resolve(data.data);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }

 	   
 	  	 
 	   getVillaDetails(villaId,checkIn,checkOut){
 	   	this.showLoader('Listing Villa Details...');	
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_villa_details&villaId='+villaId+'&arrivalDateTime='+checkIn+'&departureDateTime='+checkOut)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
		          this.events.publish('villaDetailsEvent',data.data);
		      	}else{
		      		this.hideLoader();
		      	   this.events.publish('villaDetailsEvent',null);
		      	}
		          console.log("VILLA_DATA"+JSON.stringify(data.data));		         
		          resolve(data.data);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }


 	   getVillaFood(stateId,departureCity){
     
	     this.showLoader('Please Wait Data is Listing...');
	      return new Promise(resolve => {
	      	//console.log("Api"+this.API_URL+'access=true&action=get_categoryVillalistby_city&stateId='+stateId+'&cityId='+departureCity);
	        this.http.get(this.API_URL+'access=true&action=get_categoryVillalistby_city&stateId='+stateId+'&cityId='+departureCity)
	          .map(res => res.json())
	          .subscribe(data => {
	          if(data.status == true){
	          this.events.publish('villaFoodListEvent',data.data);
	            this.villaFoodList = data.data;
	         }else{
	         	this.hideLoader();
	         this.events.publish('villaFoodListEvent',null);
	           this.villaFoodList = null;
	         }
	            //console.log(JSON.stringify(this.villaFoodList));
	            resolve(this.villaFoodList);
	          },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
	      });
     
    	}


    	 VillaSalesDetails(mailId,name,country,msg,departureDate){

 	  		this.showLoader('Please wait ...');	
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+ 'access=true&action=villa_Sales_mail&mailId='+mailId+'&name='+name+'&country='+country+'&message='+msg+'&journeyDate='+departureDate)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){	
		          this.events.publish('villaSalesEvent',data.data);
		      	}else{
		      		this.hideLoader();
		      	   this.events.publish('villaSalesEvent',null);
		      	}
		          //console.log(JSON.stringify(data.data));		         
		          resolve(data.data);
		        },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	   }




 	 /*****************************USER FUNCTION*****************************
							USER FUNCTION BLOCK END
     *************************************************************************
 	   	/	
			/	
				/	
					/

						/
							/
								/
									/
										/
											/
												/
	 *****************************USER FUNCTION*****************************
							USER FUNCTION BLOCK START
     *************************************************************************/

     getUserLoginDetails(mailId,password){
     
	     this.showLoader('Please Wait...');
	      return new Promise(resolve => {
	      
	        this.http.get(this.API_URL+'access=true&action=user_login&mailId='+mailId+'&password='+password)
	          .map(res => res.json())
	          .subscribe(data => {
	          if(data.status == true){
	          this.events.publish('userLoginEvent',data.data);
	          window.localStorage.setItem('isLogin','1');
	          this.isLogin = true;
	      	
	          }else{
	          	this.hideLoader();
	         	this.events.publish('userLoginEvent',null);
	         	 window.localStorage.setItem('isLogin','0');
	         	this.isLogin = false; 
	       
	         }
	            //console.log(JSON.stringify(data.data));
	         
	            resolve(data.data);
	          },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
	      });

	    	  
     
    	}


    changePassword(userId,password){
      this.showLoader('Please Wait...Updating your password');
       return new Promise(resolve => {
       
         this.http.get(this.API_URL+'access=true&action=change_password&password='+password+'&userId='+userId)
           .map(res => res.json())
           .subscribe(data => {
           	////console.log(JSON.stringify(data));
           if(data.status == true){
           this.events.publish('changePasswordEvent',data.status);
    
           }else{
           	this.hideLoader();
           this.events.publish('changePasswordEvent',data.status);
   
          }
             //console.log("Change_Password"+JSON.stringify(data.status));
             resolve(data.status);
           },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
       });
     
     }

     editProfile(userId,firstName,lastName,email,address,contactNumber){

     
      this.showLoader('Please Wait...');
       return new Promise(resolve => {
       
         this.http.get(this.API_URL+'access=true&action=edit_profile&type=Edit&editId='+userId+'&firstName='+firstName+'&lastName='+lastName+'&mailId='+email+'&contactNumber='+contactNumber+'&address='+address)
           .map(res => res.json())
           .subscribe(data => {
           	////console.log(JSON.stringify(data));
           if(data.status == true){
           this.events.publish('profileEvent',data.status);
        
           }else{
           	this.hideLoader();
           this.events.publish('profileEvent',data.status);
     
          }
             //console.log("profile"+JSON.stringify(data.status));
             resolve(data.status);
           },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
       });
     
     }

    signup(firstName,lastName,email,password,country,state,city,address,contactNumber,card,dob){

     
      this.showLoader('Please Wait...');
       return new Promise(resolve => {
       
         this.http.get(this.API_URL+'access=true&action=manage_users&type=Add&firstName='+firstName+'&lastName='+lastName+'&mailId='+email+'&contactNumber='+contactNumber+'&dob='+dob+'&address='+address+'&country='+country+'&state='+state+'&city='+city+'&nameOnCreditCard='+card)
           .map(res => res.json())
           .subscribe(data => {
           	////console.log(JSON.stringify(data));
           if(data.status == true){
           this.events.publish('signupEvent',data.status);
      
           }else{
           	this.hideLoader();
           this.events.publish('signupEvent',data.status);
       
          }
             //console.log("signup"+JSON.stringify(data.status));
             resolve(data.status);
           },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
       });
     
     }

     forgotPassword(email){

     
      this.showLoader('Please Wait...!!');
       return new Promise(resolve => {
       
         this.http.get(this.API_URL+'access=true&action=forget_password&mailId='+email)
           .map(res => res.json())
           .subscribe(data => {
           	////console.log(JSON.stringify(data));
           if(data.status == true){
           this.events.publish('forgotPasswordEvent',data.status);
        
           }else{
           	this.hideLoader();
           this.events.publish('forgotPasswordEvent',data.status);
       
          }
             //console.log("forgot_Password"+JSON.stringify(data.status));
             resolve(data.status);
           },
		        error =>{
		        		this.hideLoader();
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
       });
     
     }

     getUserCountry() { // country for signup
		    
		 
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_allcountry_list')
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		          this.userCountry = data.data;
		      	}else{
		      	  this.userCountry = null;
		      	}
		          //console.log("User_country"+JSON.stringify(this.userCountry));
		          resolve(this.userCountry);
		        },
		        error =>{
		        		
		        		//this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	}


 
 	   getUserState(countryId) { // country for signup
		    
		 
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_allstate_list_by_country&countryId='+countryId)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		           this.events.publish('userStateEvent',data.data);
		           this.userState = data.data;
		        	
		           }else{
		           this.events.publish('userStateEvent',data.data);
		           this.userState = null;
		       		
		          }
		          //console.log("User_state"+JSON.stringify(this.userState));
		          resolve(this.userState);
		        },
		        error =>{
		        	
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	}

 	getUserCity(stateId) { // country for signup
		    
		 
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_allcity_list_by_state&stateId='+stateId)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		           this.userCity = data.data;

		           this.events.publish('userCityEvent',data.data);
		        
		           }else{
		           this.userCity = null;

		           this.events.publish('userCityEvent',data.data);
		       
		          }
		          ////console.log(JSON.stringify(this.yachtCountry));
		          resolve(this.userCity);
		        },
		        error =>{
		        		
		        		this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	}


 		 validateUserFB(mailId) { // country for signup
		    return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=validateMail&mailId='+mailId)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		           this.events.publish('userValidateFBEvent',data.data);
		      	}else{
		      	   this.events.publish('userValidateFBEvent',null);
		      	}
		          //console.log("User_country"+JSON.stringify(this.userCountry));
		          resolve(data.data);
		        },
		        error =>{
		        		
		        this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });
 	     }	

 	     validateUserGPlus(mailId){

 	     	  return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=validateMail&mailId='+mailId)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		           this.events.publish('userValidateGPlusEvent',data.data);
		      	}else{
		      	   this.events.publish('userValidateGPlusEvent',null);
		      	}
		          //console.log("User_country"+JSON.stringify(this.userCountry));
		          resolve(data.data);
		        },
		        error =>{
		        		
		        this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });

 	     }



     /*****************************API FUNCTION*****************************
							API FUNCTION BLOCK END
     *************************************************************************/

     	jetQuery(data){
     		  this.showLoader("Thanks For Query!!...");
 	     	  return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=mail_to_jet&username='+data.firstname+
		      '&email='+data.email
		      +
		      '&phone='+data.phone+
		      '&jetDepDate='+data.jetDepDate+
		      '&jetArrDate='+data.jetArrDate+
		      '&jetCityFrom='+data.jetCityFrom+
		      '&jetCityTo='+data.jetCityTo+
		      '&jetType='+data.jetType+
		      '&no_of_passanger='+data.no_of_passanger+
		      '&jetdepartuetime='+data.jetdepartuetime+
		      '&arrivaljettime='+data.arrivaljettime+
		      '&SpecialRequest='+data.SpecialRequest+
		      '&jet_advertising='+data.jet_advertising+
		      '&jetRoundType='+data.jetRoundType+
			  '&sourceUrl=immidia.co')
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		           this.events.publish('jetQueryEvent',data.data);
		      	}else{
		      	   this.events.publish('jetQueryEvent',null);
		      	}
		          //console.log("User_country"+JSON.stringify(this.userCountry));
		          resolve(data.data);
		        },
		        error =>{
		        		
		        this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });

 	     }



     	getUserDetailsObject(userId){
     		  //this.showLoader("Thanks For Query!!...");
 	     	  return new Promise(resolve => {
		      this.http.get(this.API_URL+'access=true&action=get_user_details&userId='+userId)
		        .map(res => res.json())
		        .subscribe(data => {
		        if(data.status == true){
		           this.events.publish('userObjectEvent',data.data);
		      	}else{
		      	   this.events.publish('userObjectEvent',null);
		      	}
		          //console.log("User_country"+JSON.stringify(this.userCountry));
		          resolve(data.data);
		        },
		        error =>{
		        		
		        this.openAlert('Error!!',JSON.stringify(error));
		        });
		    });

 	     }
 	    
    



}
