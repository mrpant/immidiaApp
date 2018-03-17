import { Component } from '@angular/core';
import {NavController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { SignupPage } from '../signup/signup';
import { ForgotPage } from '../forgot/forgot';
import {App , ModalController , ViewController  } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { BooknowPage } from '../booknow/booknow';
import { FirstPage } from '../first/first';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


	public mailId:string;
	public password:string;
  public viewCtrl:ViewController;
  public navCtrl:NavController;
    public pageCounter:number;

   constructor( navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,private facebook: Facebook,public modalCtrl: ModalController, viewCtrl: ViewController, public appCtrl: App,public auth: Auth, public user: User) {

     this.viewCtrl = viewCtrl;
     this.navCtrl = navCtrl;
   }


   ngOnInit() {
    this.callAllSubscribe(this.events);
   }

   

    callAllSubscribe(events){
	    events.subscribe('userLoginEvent', object => {

          this.dismiss();
          
	    	if(object!=null){

              if(object.status == 1){
                object.image = this.serviceVar.IMAGE_PATH+object.image;
    	    		window.localStorage.setItem('userDetails',JSON.stringify(object));	
              window.localStorage.setItem('isLogin','1');
              this.serviceVar.isLogin = true;
              
    	    		//this.serviceVar.hideLoader();
              this.events.publish('updateMenuEvent');


              if(this.pageCounter <= 1){
                if(this.serviceVar.loginCurrentPages == BooknowPage){
                    this.navCtrl.setRoot(FirstPage);
                  }else{
                    this.navCtrl.push(this.serviceVar.loginCurrentPages);
                }        
              }

            
             }else{
               this.serviceVar.showLoader("You are not authorized with Immidia,Activate your account first");
             }

	    	}else{
              this.serviceVar.isLogin = false;
	            this.serviceVar.openAlert("Alert!!","Invalid Credentials!!");
             // this.serviceVar.hideLoader();
	    	}
                     
          this.pageCounter++;
	    });



     events.subscribe('userValidateFBEvent', object => { // FACEBOOK LOGIN
       
       this.dismiss();

        if(object!=null){

          if(object.status == 1){

                object.image = this.user.social.facebook.data.profile_picture;  
                window.localStorage.setItem('userDetails',JSON.stringify(object));  
                window.localStorage.setItem('isLogin','1');
              
                this.serviceVar.isLogin = true;
                this.serviceVar.showLoader('Please Wait....');
                this.events.publish('updateMenuEvent');


              if(this.pageCounter <= 1){   

                  if(this.serviceVar.loginCurrentPages == BooknowPage){
                    this.navCtrl.setRoot(FirstPage);
                  }else{
                      this.navCtrl.push(this.serviceVar.loginCurrentPages);
                  }  

               }     
                    
          }else{
             this.serviceVar.showLoader("You are not authorized with Immidia,Activate your account first");
           } 

        }else{

            this.serviceVar.isLogin = false;
          let FBobject = {
            'fname' : this.user.social.facebook.data.full_name.split(' ')[0],
            'lname' : this.user.social.facebook.data.full_name.split(' ')[1],
            'email' : this.user.social.facebook.data.email
          };

          window.localStorage.setItem('socialObject',JSON.stringify(FBobject));
          this.serviceVar.showLoader('Please Wait....');

        if(this.pageCounter <= 1){ 

          this.navCtrl.push(SignupPage);
        }
         
               /*const full_name = this.user.social.facebook.data.full_name;
              const profile_picture = this.user.social.facebook.data.profile_picture;
              const facebook_raw_data = this.user.social.facebook.data.raw_data;*/
         }

          this.pageCounter++;       

      });

      events.subscribe('userValidateGPlusEvent', object => { // GOOGLE LOGIN
       

         this.dismiss();

        if(object!=null){

         if(object.status == 1){
               object.image = this.user.social.google.data.profile_picture;  
               window.localStorage.setItem('userDetails',JSON.stringify(object));  
               window.localStorage.setItem('isLogin','1');
               this.serviceVar.isLogin = true;
              
               this.events.publish('updateMenuEvent');
               this.serviceVar.showLoader('Please Wait....');

            if(this.pageCounter <= 1){ 
              if(this.serviceVar.loginCurrentPages == BooknowPage){
                this.navCtrl.setRoot(FirstPage);
              }else{
                  this.navCtrl.push(this.serviceVar.loginCurrentPages);
              }    
              
             }

           }else{
             this.serviceVar.showLoader("You are not authorized with Immidia,Activate your account first");
           }          
        }else{
            this.serviceVar.isLogin = false;
          let FBobject = {
            'fname' : this.user.social.google.data.full_name.split(' ')[0],
            'lname' : this.user.social.google.data.full_name.split(' ')[1],
            'email' : this.user.social.google.data.email
          };

          window.localStorage.setItem('socialObject',JSON.stringify(FBobject));
          this.serviceVar.showLoader('Please Wait....');
           
           if(this.pageCounter <= 1){ 
             this.navCtrl.push(SignupPage);
           }
               /*const full_name = this.user.social.facebook.data.full_name;
              const profile_picture = this.user.social.facebook.data.profile_picture;
              const facebook_raw_data = this.user.social.facebook.data.raw_data;*/
        }

            
        this.pageCounter++;

      });


       

	}


  


  loginSubmit(){
  	  if(this.mailId== null || this.mailId == " " ){
        this.serviceVar.openAlert("Alert!!","Please Enter Email");
        return false;
      }
      if(this.password== null || this.password == " " ){
        this.serviceVar.openAlert("Alert!!","Please Enter Password");
        return false;
      }
    this.serviceVar.showLoader('Please Wait....');
     this.pageCounter = 1;
  	this.serviceVar.getUserLoginDetails(this.mailId,this.password);
  }

  goSignUp(){

        this.navCtrl.push(SignupPage);
   
  }

  goForget(){
     this.navCtrl.push(ForgotPage);
  }


  facebookLogin(){
    this.serviceVar.showLoader("Loading...");
   this.auth.login('facebook').then(()=>{
     this.pageCounter = 1;
      this.serviceVar.validateUserFB(this.user.social.facebook.data.email);
   });

  }


  googleLogin(){
    this.serviceVar.showLoader("Loading...");
   this.auth.login('google').then(()=>{
   //  alert("GOOGLE_DATA"+JSON.stringify(this.user.social.google.data));
   this.pageCounter = 1;
      this.serviceVar.validateUserGPlus(this.user.social.google.data.email);
   });

  }




  dismiss() {
    this.viewCtrl.dismiss();
  }
 


}
