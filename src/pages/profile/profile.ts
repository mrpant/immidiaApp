import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { YachtPage } from '../yacht/yacht';
import { TravellerPage } from '../traveller/traveller';
import { DocumentsPage } from '../documents/documents';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';
import { ServiceProvider } from '../../providers/service/service';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

	tab1Root = TravellerPage;
	tab2Root = DocumentsPage;
	tab3Root = SettingsPage;

  constructor(public navCtrl: NavController,public serviceVar : ServiceProvider ,public modalCtrl: ModalController) {
  	
  }


presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
       this.serviceVar.loginCurrentPages = ProfilePage;
    }
    
  }

 queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }


}
