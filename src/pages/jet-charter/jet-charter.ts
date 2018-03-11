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

  chartDetails :any;
  imageUrl:String;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public serviceVar : ServiceProvider) {
        this.chartDetails = navParams.get('jetObject');
        this.imageUrl = serviceVar.IMAGE_PATH;
        console.log(this.chartDetails);
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
jetdetailPage(evenet,data){
  this.navCtrl.push(JetDetailPage,{"jetDetails":data});
}
}
