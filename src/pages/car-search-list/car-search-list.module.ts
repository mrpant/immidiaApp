import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarSearchListPage } from './car-search-list';

@NgModule({
  declarations: [
    CarSearchListPage,
  ],
  imports: [
    IonicPageModule.forChild(CarSearchListPage),
  ],
  exports: [
    CarSearchListPage
  ]
})
export class CarSearchListPageModule {}
