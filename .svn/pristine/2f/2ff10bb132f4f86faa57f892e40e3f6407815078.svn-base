import { Component } from '@angular/core';
import { ServiceProvider } from '../../providers/service/service';
import { NavController } from 'ionic-angular';
import { FirstPage } from '../first/first';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { Jet_enquiryPage } from '../jet_enquiry/jet_enquiry';


@Component({
  selector: 'page-booknow',
  templateUrl: 'booknow.html'
})
export class BooknowPage {

  

  constructor(public navCtrl: NavController,public serviceVar : ServiceProvider ,public modalCtrl: ModalController) {

  }


 
  goToYacht(){
    this.serviceVar.defaultLoader();
  	this.navCtrl.push(FirstPage,{tab_yacht:true,tab_jet:false,tab_car:false,tab_villa:false});
  	
  }
  goToCar(){
    this.serviceVar.defaultLoader();
  	this.navCtrl.push(FirstPage,{tab_yacht:false,tab_jet:false,tab_car:true,tab_villa:false});
  }

  goToAirplane(){
  
   this.navCtrl.push(Jet_enquiryPage);
  }

  goToVilla(){
    this.serviceVar.defaultLoader();
  	this.navCtrl.push(FirstPage,{tab_yacht:false,tab_jet:false,tab_car:false,tab_villa:true});
  }


  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = BooknowPage;
    }
    
  }

   queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }

  
}
