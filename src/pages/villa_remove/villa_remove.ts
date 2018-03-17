import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import {Events} from 'ionic-angular';

@Component({
  selector: 'page-villa_remove',
  templateUrl: 'villa_remove.html'
})
export class villa_removePage {

	public cartItems:any;
  public villaDetails:any;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController,public serviceVar : ServiceProvider,public events: Events) {
  	    this.cartItems = this.uniques(serviceVar.villaAddToCart);
        this.villaDetails = JSON.parse(window.localStorage.getItem('villaMoreDetailsObject'));
  }

  getCurrency(currencyId){
    return this.serviceVar.getCurrencyInSymbol(currencyId)
  }


    removeItem(index) {
        this.serviceVar.villaAddToCart.splice(index, 1);
        this.cartItems = this.uniques(this.serviceVar.villaAddToCart);
        this.events.publish('addCartEvent',this.serviceVar.villaAddToCart);
    }



  dismiss() {
    this.viewCtrl.dismiss();
  }


  uniques(arr) {
    var a = [];
    for (var i=0, l=arr.length; i<l; i++)
            if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
                a.push(arr[i]);
        return a;
    }



}
