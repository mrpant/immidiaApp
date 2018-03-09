import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import {Events} from 'ionic-angular';

@Component({
  selector: 'page-remove',
  templateUrl: 'remove.html'
})
export class removePage {

	public cartItems:any;
  public yachtDetails:any;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController,public serviceVar : ServiceProvider,public events: Events) {
  	    this.cartItems = this.uniques(serviceVar.yachtAddToCart);
        this.yachtDetails = JSON.parse(window.localStorage.getItem('yachtMoreDetailsObject'));
  }

  getCurrency(currencyId){
    return this.serviceVar.getCurrencyInSymbol(currencyId)
  }


    removeItem(index) {
        this.serviceVar.yachtAddToCart.splice(index, 1);
        this.cartItems = this.uniques(this.serviceVar.yachtAddToCart);
        this.events.publish('addCartEvent',this.serviceVar.yachtAddToCart);
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
