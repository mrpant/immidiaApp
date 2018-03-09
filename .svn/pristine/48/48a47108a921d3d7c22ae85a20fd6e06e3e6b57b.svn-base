import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Modal1Page } from '../modal/modal1';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the CarSearchBookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-search-booking',
  templateUrl: 'car-search-booking.html',
})
export class CarSearchBookingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public serviceVar : ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarSearchBookingPage');
  }
  presentModal() {

    if (this.serviceVar.isLogin) {
      this.navCtrl.push(ProfilePage);
    } else {
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = CarSearchBookingPage;
    }

  }

  queryForm() {

    let modal = this.modalCtrl.create(Modal1Page);
    modal.present();

  }
}
