import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { ServiceProvider } from '../../providers/service/service';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { CarSearchBookingPage } from '../car-search-booking/car-search-booking';
import { CarSearchPage } from '../car-search/car-search';
import * as $ from 'jquery';
/**
 * Generated class for the CarSearchListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var $: any;
@IonicPage()
@Component({
  selector: 'page-car-search-list',
  templateUrl: 'car-search-list.html',
})
export class CarSearchListPage {

  public selectedClass = false;
  carDetails:any;
  additionalDetails:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public serviceVar : ServiceProvider) {
    this.carDetails = {
      chauffeurDetails : navParams.get('chauffeurDetails'),
      response : navParams.get('response')
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarSearchListPage');
  }
  presentModal() {

    if (this.serviceVar.isLogin) {
      this.navCtrl.push(ProfilePage);
    } else {
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = CarSearchListPage;
    }

  }

  queryForm() {

    let modal = this.modalCtrl.create(Modal1Page);
    modal.present();

  }
  nextPage(){
    if(this.additionalDetails != null){
    this.navCtrl.push(CarSearchBookingPage,{"carDetails":this.carDetails,'additionalDetails':this.additionalDetails});
    }else{
      this.serviceVar.openAlert("Message","PLease Select Car First");
      return false;
    }
  }
  previosPage(){
    this.navCtrl.push(CarSearchPage);
  }
  selectCar(thisObj,name,currency,price){
    console.log(thisObj);
    $(".row-car").removeClass('selected')
    $("."+thisObj).addClass('selected')
    this.additionalDetails = {
      'image':thisObj,
      'name':name,
      'currency':currency,
      'price':price
    };
    



  }
}
