import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ServiceProvider } from '../../providers/service/service';
import { Modal1Page} from '../modal/modal1';
  
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html'
})
export class TermsPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController,public serviceVar : ServiceProvider ) {

  }

  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
        this.serviceVar.loginCurrentPages = TermsPage;
    }
    
  }


 queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }

   specs = [
    { title: "Location", description: "No detail" },
    { title: "Specification", description: "Multiple sclerosis (MS) is an autoimmune disease in which the body's immune system mistakenly attacks myelin, the fatty substance that surrounds and protects the nerve fibers in the central nervous system." }
    
  ];

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
    /* presentModal() {
    let modal = this.modalCtrl.create(Modal1Page);
    modal.present();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }*/
}
