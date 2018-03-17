import { Component, ViewChild } from '@angular/core';
import { Nav, Platform  } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { VillaFood_drinksPage } from '../pages/villa-food-drinks/villa-food-drinks';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FirstPage } from '../pages/first/first';
import { YachtPage } from '../pages/yacht/yacht';
import { AirplanePage } from '../pages/airplane/airplane';
import { CarPage } from '../pages/car/car';
import { VillaPage } from '../pages/villa/villa';
import { LoginPage } from '../pages/login/login';
import { ForgotPage } from '../pages/forgot/forgot';
import { SignupPage } from '../pages/signup/signup';
import { BooknowPage } from '../pages/booknow/booknow';
import { FaqPage } from '../pages/faq/faq';
import { ContactPage } from '../pages/contact/contact';
import { BooknowcarPage } from '../pages/booknowcar/booknowcar';
import { BooknowvillaPage } from '../pages/booknowvilla/booknowvilla';
import { BooknowairplanePage } from '../pages/booknowairplane/booknowairplane';
import { BooknowyachtPage } from '../pages/booknowyacht/booknowyacht';
import { Yacht_listPage } from '../pages/yacht_list/yacht_list';
import { Car_listPage } from '../pages/car_list/car_list';
import { Villa_listPage } from '../pages/villa_list/villa_list';
import { Yacht_detailPage } from '../pages/yacht_detail/yacht_detail';
import { Car_detailPage } from '../pages/car_detail/car_detail';
import { Villa_detailPage } from '../pages/villa_detail/villa_detail';
import { Limosine_detailPage } from '../pages/limosine_detail/limosine_detail';
import { Food_drinksPage } from '../pages/food_drinks/food_drinks';
import { Your_choicePage } from '../pages/your_choice/your_choice';
import { Villa_choicePage } from '../pages/villa_choice/villa_choice';
import { Villalimosine_detailPage } from '../pages/villalimosine_detail/villalimosine_detail';
import { Car_choicePage } from '../pages/car_choice/car_choice';
import { Insurance_detailPage } from '../pages/insurance_detail/insurance_detail';
import { Booking_summaryPage } from '../pages/booking_summary/booking_summary';
import { Booking_confirmationPage } from '../pages/booking_confirmation/booking_confirmation';
import { ProfilePage } from '../pages/profile/profile';
import { TravellerPage } from '../pages/traveller/traveller';
import { DocumentsPage } from '../pages/documents/documents';
import { SettingsPage } from '../pages/settings/settings';
import { ServiceProvider } from '../providers/service/service';
import { Edit_ProfilePage } from '../pages/edit_profile/edit_profile';
import { RideDetailsPage } from '../pages/ride-details/ride-details';
import { JetCharterPage } from '../pages/jet-charter/jet-charter';
import { JetDetailPage } from '../pages/jet-detail/jet-detail';
import { CarSearchPage } from  '../pages/car-search/car-search';
import { CarSearchListPage } from  '../pages/car-search-list/car-search-list';
import { CarSearchBookingPage } from  '../pages/car-search-booking/car-search-booking';
import { TermsPage } from '../pages/terms/terms';
import {Events} from 'ionic-angular';
import firebase from 'firebase';
import { Auth, User } from '@ionic/cloud-angular';
import { Network } from '@ionic-native/network';
import { Observable } from 'rxjs/Observable';
import { FirstslidePage } from '../pages/firstslide/firstslide';
import { CuffertermPage } from '../pages/cufferterm/cufferterm';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any =  FirstPage    ;
  isLogin:boolean;
  userDetails:any;
  public network : Network;

   pages: Array<{isLogin:boolean,title: string, icon: string, md: string, component: any}>;



  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public serviceVar : ServiceProvider,modalCtrl: ModalController,public events: Events,public auth: Auth, public user: User,private _network : Network) {





    // used for an example of ngFor and navigation
    this.pages = [
      {isLogin:true ,title : 'Home' , icon : 'ios-home' ,md : 'md-home' , component : FirstPage },
      {isLogin:true ,title : 'Hire Private Jet' , icon : 'ios-jet' ,md : 'md-jet' , component : RideDetailsPage },
      {isLogin:true ,title : 'First Side' , icon : 'ios-jet' ,md : 'md-jet' , component : FirstslidePage },
      {isLogin:true ,title : 'Chauffeur Service' , icon : 'ios-car-outline' ,md : 'md-car' , component : CarSearchPage },
      {isLogin:this.serviceVar.isLogin , title : 'My Account' , icon : 'ios-contact' ,md : 'md-contact' , component : ProfilePage },
    {isLogin:true ,title : 'Home' , icon : 'ios-home' ,md : 'md-home' , component : FirstPage },
    {isLogin:true ,title : 'Hire Private Jet' , icon : 'ios-jet' ,md : 'md-jet' , component : RideDetailsPage },
    {isLogin:true ,title : 'Chauffeur Service' , icon : 'ios-car-outline' ,md : 'md-car' , component : CarSearchPage },
      {isLogin:this.serviceVar.isLogin , title : 'My Account' , icon : 'ios-contact' ,md : 'md-contact' , component : ProfilePage },

      {isLogin:true , title : 'Book Yacht' ,icon : 'ios-boat' ,md : 'md-boat' , component : BooknowyachtPage },
      {isLogin:true ,title : 'Book Car' ,icon : 'ios-car' ,md : 'md-car' , component : BooknowcarPage },
      {isLogin:true  ,title : 'Book Villa' ,icon : 'ios-home' ,md : 'md-home' , component : BooknowvillaPage },
      {isLogin:true ,title : 'Terms Of Use' ,icon : 'ios-book' ,md : 'md-book' , component : TermsPage },
      {isLogin:true  ,title : 'Assistance' ,icon : 'ios-text' ,md : 'md-text' , component : FaqPage },
      {isLogin:true  ,title : 'Contact Us' ,icon : 'ios-call' ,md : 'md-call' , component : ContactPage },
      {isLogin:this.serviceVar.isLogin  ,title : 'Logout' ,icon : 'ios-exit' ,md : 'md-exit' , component : FirstPage },
      {isLogin:this.serviceVar.isLogin  ,title : 'Logout' ,icon : 'ios-exit' ,md : 'md-exit' , component : BooknowPage }
    ];

      this.initializeApp();
      this.callAllSubscribe(events);
      console.log("ApP con"+this.serviceVar.isLogin);
      this.network = _network;
      if(this.serviceVar.isLogin){
        this.isLogin = this.serviceVar.isLogin;
        this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));

            if(this.userDetails.image == " " || this.userDetails.image == null){
              this.userDetails.image = 'img/dummy-profile-pic.png';
            }
      }


  }


  loadAllFunction(){ // load api service on run time

    this.serviceVar.getUserCountry();
    this.serviceVar.getYachtCountry();
    this.serviceVar.getCarCountry();
    this.serviceVar.getVillaCountry();
    this.serviceVar.getCarState();
    this.serviceVar.getVillaState();
    this.serviceVar.getCarHours();
    this.serviceVar.getCarClassification();
    this.serviceVar.getCarCity();
    this.serviceVar.getVillaCity();
    this.serviceVar.getAllTime();

  }

    callAllSubscribe(events){

      //FOR MENU EVENT UPDATE

      events.subscribe('updateMenuEvent',() => {
        this.serviceVar.isLogin = true;
        this.isLogin = this.serviceVar.isLogin;

        this.pages = [
          {isLogin:true ,title : 'Home' , icon : 'ios-home' ,md : 'md-home' , component : FirstPage },
          {isLogin:true ,title : 'Hire Private Jet' , icon : 'ios-jet' ,md : 'md-jet' , component : RideDetailsPage },
          {isLogin:true ,title : 'First Side' , icon : 'ios-jet' ,md : 'md-jet' , component : FirstslidePage },
          {isLogin:true ,title : 'Chauffeur Service' , icon : 'ios-car-outline' ,md : 'md-car' , component : CarSearchPage },
        {isLogin:true ,title : 'Home' , icon : 'ios-home' ,md : 'md-home' , component : BooknowPage },
          {isLogin:this.serviceVar.isLogin , title : 'My Account' , icon : 'ios-contact' ,md : 'md-contact' , component : ProfilePage },
          {isLogin:true , title : 'Book Yacht' ,icon : 'ios-boat' ,md : 'md-boat' , component : BooknowyachtPage },
          {isLogin:true ,title : 'Book Car' ,icon : 'ios-car' ,md : 'md-car' , component : BooknowcarPage },
          {isLogin:true  ,title : 'Book Villa' ,icon : 'ios-home' ,md : 'md-home' , component : BooknowvillaPage },
          {isLogin:true ,title : 'Terms Of Use' ,icon : 'ios-book' ,md : 'md-book' , component : TermsPage },
          {isLogin:true  ,title : 'Assistance' ,icon : 'ios-text' ,md : 'md-text' , component : FaqPage },
          {isLogin:true  ,title : 'Contact Us' ,icon : 'ios-call' ,md : 'md-call' , component : ContactPage },
          {isLogin:this.serviceVar.isLogin  ,title : 'Logout' ,icon : 'ios-exit' ,md : 'md-exit' , component : FirstPage },
          {isLogin:this.serviceVar.isLogin  ,title : 'Logout' ,icon : 'ios-exit' ,md : 'md-exit' , component : BooknowPage }
      ];




             setTimeout(()=>{
               this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
                if(this.userDetails.image == " " || this.userDetails.image == null){
                   this.userDetails.image = 'img/dummy-profile-pic.png';
                 }
              this.events.unsubscribe('updateMenuEvent');
             });
      });


      /********************FOR LOGOUT EVENT FIRE***********************/
      events.subscribe('logoutEvent',() => {


         this.serviceVar.isLogin = false;

         this.isLogin = this.serviceVar.isLogin;

        this.pages = [
          {isLogin:true ,title : 'Home' , icon : 'ios-home' ,md : 'md-home' , component : FirstPage },
          {isLogin:true ,title : 'Hire Private Jet' , icon : 'ios-jet' ,md : 'md-jet' , component : RideDetailsPage },
          {isLogin:true ,title : 'First Side' , icon : 'ios-jet' ,md : 'md-jet' , component : FirstslidePage },
          {isLogin:true ,title : 'Chauffeur Service' , icon : 'ios-car-outline' ,md : 'md-car' , component : CarSearchPage },
        {isLogin:true ,title : 'Home' , icon : 'ios-home' ,md : 'md-home' , component : BooknowPage },
          {isLogin:this.serviceVar.isLogin , title : 'My Account' , icon : 'ios-contact' ,md : 'md-contact' , component : ProfilePage },
          {isLogin:true , title : 'Book Yacht' ,icon : 'ios-boat' ,md : 'md-boat' , component : BooknowyachtPage },
          {isLogin:true ,title : 'Book Car' ,icon : 'ios-car' ,md : 'md-car' , component : BooknowcarPage },
          {isLogin:true  ,title : 'Book Villa' ,icon : 'ios-home' ,md : 'md-home' , component : BooknowvillaPage },
          {isLogin:true ,title : 'Terms Of Use' ,icon : 'ios-book' ,md : 'md-book' , component : TermsPage },
          {isLogin:true  ,title : 'Assistance' ,icon : 'ios-text' ,md : 'md-text' , component : FaqPage },
          {isLogin:true  ,title : 'Contact Us' ,icon : 'ios-call' ,md : 'md-call' , component : ContactPage },
          {isLogin:this.serviceVar.isLogin  ,title : 'Logout' ,icon : 'ios-exit' ,md : 'md-exit' , component : FirstPage },
          {isLogin:this.serviceVar.isLogin  ,title : 'Logout' ,icon : 'ios-exit' ,md : 'md-exit' , component : BooknowPage }
      ];



             setTimeout(()=>{

               this.events.unsubscribe('logoutEvent');
             });
      });
      /****************************************************************/




    }


  logOut(page){

     var result = confirm("Do You want to Logout ?");
     if(result){
       this.serviceVar.showLoader("Please Wait...");
       window.localStorage.removeItem('userDetails');
       window.localStorage.removeItem('isLogin');
       this.auth.logout();
       setTimeout(()=>{
         this.serviceVar.hideLoader();
       },1000);
       this.serviceVar.isLogin = false;
       this.events.publish('logoutEvent');
       this.nav.setRoot(page);
     }else{
       return false;
     }

  }


  initializeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

        setTimeout(() =>{
        this.splashScreen.hide();
        });

     //  console.log("Connection type: ", this.network);


      this.network.onConnect().subscribe(data => {

          console.log(data)
        }, error => console.error(error));

      this.network.onDisconnect().subscribe(data => {

          this.serviceVar.openAlert('Network Issue','Device in Offline Mode...');
          return false;
      }, error => console.error(error));


         setTimeout(() =>{
         this.loadAllFunction();
        },100);






    });



  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario


    if(page.title == "Logout" && page.isLogin == true){
      this.logOut(page.component);
    }else{
       this.nav.setRoot(page.component);
    }

  }
}