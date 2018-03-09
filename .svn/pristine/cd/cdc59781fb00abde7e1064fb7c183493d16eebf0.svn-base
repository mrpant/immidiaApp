import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
 import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ServiceProvider } from '../../providers/service/service';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html'
})
export class FaqPage {

  constructor(public navCtrl: NavController,public serviceVar : ServiceProvider ,public modalCtrl: ModalController) {

  }

   presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = FaqPage;
    }
    
  }


   queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }

  shownGroup = null;
  specs = [
    { title: "How do I book a yacht?", description: "To book a yacht one can simply log on to our application, click on the Yacht icon and select the area, sub-area, yacht type, duration, departure date and arrival date, departure port, the number of guests, and hit search. You can choose from our variety of yachts as per your needs. Then choose your type of journey (one way or return), arrival port, departure, and arrival time. On the next screen confirm the need for limousine services. Then, select your favorite cuisine from our menu, confirm the menu, and proceed to make a payment on a secured page to complete the booking." },
    { title: "How do I book a villa?", description: "To book a villa one can simply log on to our application, click on the Villa icon and select the area, sub-area, destination, check-in and check-out dates, the number of guests, and hit search. You can choose from our variety of villas as per your needs. Then confirm your check-in and check-out date. On the next screen, confirm the need for limousine services. Then, select your favorite cuisine from our menu, confirm the menu, and proceed to make a payment on a secured page to complete the booking." },
    { title: "How do I book a car?", description: "To book a car one can simply log on to our application, click on the Car icon and select the area, sub-area, departure date, duration, number of guests, type of car with driver and without driver, car type, and hit search. You can choose from our variety of cars as per your needs and select your delivery and drop off time along with the delivery and drop off areas. On the next screen, confirm the driver details and proceed to make a payment on a secured page to complete the booking." },
    { title: "How do I book a jet?", description: "To book a jet one can simply log on to our application, click on the JET icon and select the departure airport, arrival airport, departure date and time, and number of guests, and hit request quote. Once you complete your selection, your request will be sent to the service provider and within 2 hours from your request our guest service management will contact you with a quote. Once you confirm that quote your booking will be complete." },
    { title: "How are payments processed?", description: "Payments can be processed on a real-time basis using your credit card through our secured payment gateway." },
    { title: "Is a refund available on cancellation?", description: "Yes, it is possible subject to certain terms and conditions. Refer to the cancellation policy on our terms and conditions page." },
    { title: "How many days in advance can I book a product?", description: "Any product needs to be booked at least 6 hours before the scheduled time which is subject to availability." },
    { title: "What should I do if I lose my booking confirmation email or reference number?", description: "Contact our GSM team or send us a mail at support@instantluxury.net." },
    { title: "Is it mandatory to submit my personal documents?", description: "Personal documents need to be submitted because they serve as a proof of identity. It is mandatory to submit these documents. These personal documents will help sort out insurance claims, in case of an unfortunate event." },
    { title: "What are the mandatory documents?", description: "Documents such as Passport, Driver’s license, and Credit cards are required to complete any booking." },
    { title: "From where can I make a booking?", description: "Online Booking is available at your convenience from all over the world." },
    { title: "Can I browse through the products and fares without booking?", description: "You can check all our products online under “Browse our fleet” and you do not need to pay or even provide your credit card details to check availability and fares. We only require your payment details if you choose to complete a booking." },
    { title: "Can I use my credit card for a friend?", description: "Yes, it is possible, provided you give a written undertaking to indemnify our company." },
    { title: "How do I know my booking is confirmed?", description: "Once you have confirmed all your personal and payment details, a summary of this information will be displayed along with your booking reference which will be sent to you by email." },
    
  
   
  ];

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



