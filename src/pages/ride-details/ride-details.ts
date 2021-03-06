import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { ServiceProvider } from '../../providers/service/service';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { JetCharterPage } from '../jet-charter/jet-charter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
/**
 * Generated class for the RideDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ride-details',
  templateUrl: 'ride-details.html',
})
export class RideDetailsPage {

  constructor(private http: Http,public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public serviceVar : ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RideDetailsPage');
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
    this.serviceVar.loginCurrentPages = RideDetailsPage;
  }
  
}
jetcharterPage(evenet,type){

  return new Promise(resolve => {
    this.http.get(this.serviceVar.API_URL+'access=true&action=get_jet_fleet_data&jetType='+type)
       .timeout(3000)
      .map(res => res.json())
      .subscribe(data => {
      if(data.status == true){
         setTimeout(()=>{
          this.navCtrl.push(JetCharterPage,{"jetObject":data.data});
         },1000)
      console.log(data);
      }
        ////console.log(JSON.stringify(this.yachtCountry));
        resolve(data.data);
      },
      error =>{
        
          
      });
  });


}


}
