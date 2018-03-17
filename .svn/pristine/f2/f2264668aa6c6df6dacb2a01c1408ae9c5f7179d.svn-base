import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JetDetailPage } from '../jet-detail/jet-detail';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { ServiceProvider } from '../../providers/service/service';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
/**
 * Generated class for the JetCharterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-jet-charter',
  templateUrl: 'jet-charter.html',
})
export class JetCharterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public serviceVar : ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JetCharterPage');
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
    this.serviceVar.loginCurrentPages = JetCharterPage;
  }
  
}
jetdetailPage(evenet){
  this.navCtrl.push(JetDetailPage);
}
}
