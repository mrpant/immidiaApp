import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,public serviceVar : ServiceProvider ,public modalCtrl: ModalController) {

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
      this.serviceVar.loginCurrentPages = ContactPage;
    }
    
  }

}


