import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import {Events} from 'ionic-angular';
import * as $ from 'jquery';


@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class FilterPage {
  public filterPrice:number;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController,public events: Events) {

    this.filterPrice = 100;


  }


    ngOnInit() {
      $('.popover-content').attr('style','width: 318px !important;left:22px !important');
    }
  getFilterPrice(selectedValue:any){
  this.events.publish('priceFilterEvent',selectedValue);
  
  }



  onClose(){
  	this.viewCtrl.dismiss();
  };
  

}
