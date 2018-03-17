import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RideDetailsPage } from './ride-details';

@NgModule({
  declarations: [
    RideDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RideDetailsPage),
  ],
  exports: [
    RideDetailsPage
  ]
})
export class RideDetailsPageModule {}
