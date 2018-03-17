import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FirstPage } from '../first/first';
import { SignupPage } from '../signup/signup';
/**
 * Generated class for the FirstslidePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-firstslide',
  templateUrl: 'firstslide.html',
})
export class FirstslidePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstslidePage');
  }

  setPageSingup(){
    this.navCtrl.setRoot(SignupPage);
  }
  setPageLogin(){
    this.navCtrl.push(LoginPage);
  }
  setPageFirst(){
    this.navCtrl.setRoot(FirstPage);
  }
}
