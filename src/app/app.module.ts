import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { ServiceProvider } from '../providers/service/service';
import { Network } from '@ionic-native/network';
import { VillaFood_drinksPage } from '../pages/villa-food-drinks/villa-food-drinks';
import { MyApp } from './app.component';
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
import { BooknowairplanePage } from '../pages/booknowairplane/booknowairplane';
import { BooknowyachtPage } from '../pages/booknowyacht/booknowyacht';
import { BooknowcarPage } from '../pages/booknowcar/booknowcar';
import { BooknowvillaPage } from '../pages/booknowvilla/booknowvilla';
import { Yacht_listPage } from '../pages/yacht_list/yacht_list';
import { Car_listPage } from '../pages/car_list/car_list';
import { Villa_listPage } from '../pages/villa_list/villa_list';
import { Yacht_detailPage } from '../pages/yacht_detail/yacht_detail';
import { Car_detailPage } from '../pages/car_detail/car_detail';
import { Villa_detailPage } from '../pages/villa_detail/villa_detail';
import { Limosine_detailPage } from '../pages/limosine_detail/limosine_detail';
import { Villalimosine_detailPage } from '../pages/villalimosine_detail/villalimosine_detail';
import { FaqPage } from '../pages/faq/faq';
import { ContactPage } from '../pages/contact/contact';
import { Food_drinksPage } from '../pages/food_drinks/food_drinks';
import { Your_choicePage } from '../pages/your_choice/your_choice';
import { Villa_choicePage } from '../pages/villa_choice/villa_choice';
import { Car_choicePage } from '../pages/car_choice/car_choice';
import { Insurance_detailPage } from '../pages/insurance_detail/insurance_detail';

import { Booking_summaryPage } from '../pages/booking_summary/booking_summary';
import { Booking_confirmationPage } from '../pages/booking_confirmation/booking_confirmation';
import { ProfilePage } from '../pages/profile/profile';
import { TravellerPage } from '../pages/traveller/traveller';
import { DocumentsPage } from '../pages/documents/documents';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Edit_ProfilePage } from '../pages/edit_profile/edit_profile';
import { TermsPage } from '../pages/terms/terms';
import { CarContractPage } from '../pages/carcontract/carcontract';
import { YachtContractPage } from '../pages/yachtcontract/yachtcontract';
import { VillaContractPage } from '../pages/villacontract/villacontract';
import { FilterPage } from '../pages/filter/filter';
import { Modal1Page } from '../pages/modal/modal1';
import { Jet_enquiryPage } from '../pages/jet_enquiry/jet_enquiry';
import { DatePipe } from '@angular/common';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { SMS } from '@ionic-native/sms';
import { super_yachtPage } from '../pages/super_yacht/super_yacht';
import { removePage } from '../pages/remove/remove';
import { villa_removePage } from '../pages/villa_remove/villa_remove';
import { ChauffeurPage } from '../pages/chauffeur/chauffeur';
import { Chauffeur_listPage } from '../pages/chauffeur_list/chauffeur_list';
import { Villa_salePage } from '../pages/villa_sale/villa_sale';
import { Villa_sale_listPage } from '../pages/villa_sale_list/villa_sale_list';
import { Villa_sale_queryPage } from '../pages/villa_sale_query/villa_sale_query';
import { Villa_sale_detailsPage } from '../pages/villa_sale_details/villa_sale_details';
import { JetDetailPage } from '../pages/jet-detail/jet-detail';
import { CarSearchListPage } from  '../pages/car-search-list/car-search-list';
/******************Maneesh Tiwari's Code || Start**********************/
import { RideDetailsPage } from '../pages/ride-details/ride-details';
import { JetCharterPage } from '../pages/jet-charter/jet-charter';
import { CarSearchPage } from  '../pages/car-search/car-search';
import { CarSearchBookingPage } from  '../pages/car-search-booking/car-search-booking';
import { FirstslidePage } from '../pages/firstslide/firstslide';
import { CuffertermPage } from '../pages/cufferterm/cufferterm';
/******************Maneesh Tiwari's Code || End**********************/
/******************camera plugin**********************/
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
/******************************************************/

import { AgmCoreModule } from 'angular2-google-maps/core';
import { DirectionsMapDirective } from '../directive/google-map.directive';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '755d8629'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    FirstPage,
    YachtPage,
    AirplanePage,
    CarPage,
    VillaPage,
    LoginPage,
    ForgotPage,
    SignupPage,
    BooknowPage,
    BooknowcarPage,
    BooknowvillaPage,
    BooknowyachtPage,
    BooknowairplanePage,
    Yacht_detailPage,
    Villa_detailPage,
    Car_detailPage,
    Yacht_listPage,
    Car_listPage,
    Villa_listPage,
    Limosine_detailPage,
    Villalimosine_detailPage,
    Food_drinksPage,
    FaqPage,
    ContactPage,
    Your_choicePage,
    Villa_choicePage,
    Car_choicePage,
    Insurance_detailPage,
    Booking_summaryPage,
    Booking_confirmationPage,
    ProfilePage,
    TravellerPage,
    DocumentsPage,
    SettingsPage,
    VillaFood_drinksPage,
    Edit_ProfilePage,
    TermsPage,
    CarContractPage,
    VillaContractPage,
    YachtContractPage,
    FilterPage,
    Modal1Page,
    Jet_enquiryPage,
    super_yachtPage,
    removePage,
    villa_removePage,
    ChauffeurPage,
    Chauffeur_listPage,
    Villa_salePage,
    Villa_sale_listPage,
    Villa_sale_queryPage,
    DirectionsMapDirective,
    Villa_sale_detailsPage,
    RideDetailsPage,
    JetCharterPage,
    JetDetailPage,
    CarSearchPage,
    CarSearchListPage,
    CarSearchBookingPage,
    FirstslidePage,
    CuffertermPage,
    CarSearchBookingPage
  ],

  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
        backButtonText:'',
        backButtonIcon:'ios-arrow-back'
    }),
     IonicStorageModule.forRoot(),
    CloudModule.forRoot(cloudSettings),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyC6DrQr0v1ORUF8iMm7_6StXHBoeYPM5UI',
    libraries: ['places']})


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    FirstPage,
    YachtPage,
    AirplanePage,
    CarPage,
    VillaPage,
    LoginPage,
    ForgotPage,
    SignupPage,
    BooknowPage,
    BooknowcarPage,
    BooknowvillaPage,
    BooknowyachtPage,
    BooknowairplanePage,
    Yacht_detailPage,
    Villa_detailPage,
    Car_detailPage,
    Yacht_listPage,
    Car_listPage,
    Villa_listPage,
    Limosine_detailPage,
    Villalimosine_detailPage,
    FaqPage,
    ContactPage,
    Food_drinksPage,
    Your_choicePage,
    Villa_choicePage,
    Car_choicePage,
    Insurance_detailPage,
    Booking_summaryPage,
    Booking_confirmationPage,
    ProfilePage,
    TravellerPage,
    DocumentsPage,
    SettingsPage,
    VillaFood_drinksPage,
    Edit_ProfilePage,
    TermsPage,
    CarContractPage,
    VillaContractPage,
    YachtContractPage,
    FilterPage,
    Modal1Page,
    Jet_enquiryPage,
    super_yachtPage,
    removePage,
    villa_removePage,
    ChauffeurPage,
    Chauffeur_listPage,
    Villa_salePage,
    Villa_sale_listPage,
    Villa_sale_queryPage,
    Villa_sale_detailsPage,
    RideDetailsPage,
    JetCharterPage,
    JetDetailPage,
    CarSearchPage,
    CarSearchListPage,
    CarSearchBookingPage,
    FirstslidePage,
    CuffertermPage,
    CarSearchBookingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
     Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
   
    ServiceProvider,
    Facebook,
    InAppBrowser,
    DatePipe,
    SMS,
    File,
    Transfer,
    Camera,
    FilePath
    

  ]
})
export class AppModule {}
