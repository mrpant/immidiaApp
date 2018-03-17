import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarSearchBookingPage } from './car-search-booking';

@NgModule({
  declarations: [
    CarSearchBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(CarSearchBookingPage),
  ],
  exports: [
    CarSearchBookingPage
  ]
})
export class CarSearchBookingPageModule {}
