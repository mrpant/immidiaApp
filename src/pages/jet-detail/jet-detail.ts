import { Component,ViewChild,ViewChildren,QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
/**
 * Generated class for the JetDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-jet-detail',
  templateUrl: 'jet-detail.html',
})
export class JetDetailPage {
  @ViewChildren(Slides) slides: QueryList<Slides>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JetDetailPage');
  }
  goToSlide(index,arg) {
   console.log("INEDX="+index+"arg="+arg);
   this.slides.toArray()[index].slideTo(arg,500);
  }
}
