import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Events} from 'ionic-angular';
import * as $ from 'jquery';
import { ServiceProvider } from '../../providers/service/service';
import { BooknowPage } from '../booknow/booknow';
import { LoginPage } from '../login/login';
import { ModalController , ViewController  } from 'ionic-angular';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  public userCountry:any; 
  public userState:any;
  public userCity:any;
  public country:any;
  public countryName:any;
  public state:any;
  public firstName:any;
  public lastName:any;
  public email:any;
  public dob:any;
  public address:any;
  public contactNumber:any;
  public card:any;
  public city:any;
  public password:any;
  public confirmPassword:any;
  public stateName:any;
    public pageCounter:number;

  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events, private _storage: Storage,public modalCtrl: ModalController,public viewCtrl: ViewController) {
 	
   	this.userCountry = this.serviceVar.userCountry;
   	//this.userState = this.serviceVar.userState;
   	//this.userCity = this.serviceVar.userCity;

    if(window.localStorage.getItem('socialObject') != null){
      var object = JSON.parse(window.localStorage.getItem('socialObject'));
      this.firstName = object.fname;
      this.lastName = object.lname;
      this.email = object.email;
    } 


  }


    ngOnInit() {
    this.callAllSubscribe(this.events);
   }

    callAllSubscribe(events){

  events.subscribe('signupEvent', object => { // get yacht state by custom events
    
         this.dismiss();

         if(object != null){
            
             setTimeout(()=>{
                   
               this.serviceVar.showLoader('Thanks You..!!, Please active your Account');
                  if(this.pageCounter <= 1){
                    this.navCtrl.setRoot(BooknowPage);
                   }
           
               });
         }else{
         //  this.serviceVar.hideLoader();
           this.serviceVar.openAlert("Alert!!","No Results Found!!");

           //  setTimeout(()=>{
         
              // });
           return false;
         }
        this.pageCounter++;
    });

       events.subscribe('userStateEvent', object => { // get yacht state by custom events

         this.userState = object;
         console.log("userState"+JSON.stringify(this.userState));
         this.serviceVar.hideLoader();
              
    });

      events.subscribe('userCityEvent', object => { // get yacht state by custom events

         this.userCity = object;
         console.log(JSON.stringify(this.userCity));
         this.serviceVar.hideLoader();
              
    });
  }

  onSelectUserCountryChange(selectedValue:any){
    
    this.serviceVar.getUserState(selectedValue);
    this.country = selectedValue; 
      setTimeout(()=>{
        this.countryName = $('#country').text();
     
      },100);


  
 
  }

  goLogin(){
    this.navCtrl.push(LoginPage);
     
  }

  
  

onSelectUserStateChange(selectedValue:any){

   this.serviceVar.getUserCity(selectedValue);
      this.state = selectedValue; 
      setTimeout(()=>{
        this.stateName = $('#country').text();
     
      },100);


  
 
  }

    submitForm(){
     //yacht submit validation
      if(this.country == null || this.country < 0){
        this.serviceVar.openAlert("Alert!!","Please Select Country");
        return false;
      }
      /* if(this.state == null || this.state < 0){
        this.serviceVar.openAlert("Alert!!","Please Select State");
        return false;
      } */
   /*   if(this.city==null || this.city < 0){
        this.serviceVar.openAlert("Alert!!","Please Select City");
        return false;
      }
    */
      if(this.contactNumber == null || this.contactNumber < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter Contact Number");
        return false;
      }

      if(this.firstName == null || this.firstName < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter First Name");
        return false;
      }

      if(this.lastName == null || this.lastName < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter Last Name");
        return false;
      }
      if(this.email == null || this.email < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter Email");
        return false;
      }
      if(this.password == null || this.password < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter Password");
        return false;
      }
      if(this.confirmPassword == null || this.confirmPassword < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter Confirm Password");
        return false;
      }
   /*   if(this.card == null || this.card < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter Name on Card");
        return false;
      }*/
      if(this.dob == null || this.dob < 0){
        this.serviceVar.openAlert("Alert!!","Please Select Date of Birth");
        return false;
      }

     /*  if(this.address == null || this.address < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter Address");
        return false;
      } */

      if(this.password == this.confirmPassword){
    	 
        if(window.localStorage.getItem('socialObject') != null){
              window.localStorage.removeItem('socialObject');
        }

       this.pageCounter = 1;
    	this.serviceVar.signup(this.firstName,this.lastName,this.email,this.password,this.country,this.state,this.city,this.address,this.contactNumber,this.card,this.dob);

      }

     
 


  }


  public event = {
    month: '1990-02-19',
    timeStarts: '07:00',
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
