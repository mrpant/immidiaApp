import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CuffertermPage } from './cufferterm';

@NgModule({
  declarations: [
    CuffertermPage,
  ],
  imports: [
    IonicPageModule.forChild(CuffertermPage),
  ],
  exports: [
    CuffertermPage
  ]
})
export class CuffertermPageModule {}
