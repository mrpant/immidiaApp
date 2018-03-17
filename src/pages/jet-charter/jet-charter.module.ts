import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JetCharterPage } from './jet-charter';

@NgModule({
  declarations: [
    JetCharterPage,
  ],
  imports: [
    IonicPageModule.forChild(JetCharterPage),
  ],
  exports: [
    JetCharterPage
  ]
})
export class JetCharterPageModule {}
