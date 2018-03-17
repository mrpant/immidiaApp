import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-booknowairplane',
  templateUrl: 'booknowairplane.html'
})
export class BooknowairplanePage {

  constructor(public navCtrl: NavController) {

  }

  public event = {
    month: '1990-02-19',
    timeStarts: '07:00',
  }

}
