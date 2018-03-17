import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstslidePage } from './firstslide';

@NgModule({
  declarations: [
    FirstslidePage,
  ],
  imports: [
    IonicPageModule.forChild(FirstslidePage),
  ],
  exports: [
    FirstslidePage
  ]
})
export class FirstslidePageModule {}
