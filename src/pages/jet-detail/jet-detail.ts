import { Component,ViewChild,ViewChildren,QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { Jet_enquiryPage } from '../jet_enquiry/jet_enquiry';
import { ServiceProvider } from '../../providers/service/service';
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
  jetDetails : any;
  imageUrl:String;
  constructor(public navCtrl: NavController, public navParams: NavParams,public serviceVar : ServiceProvider) {
      this.jetDetails = navParams.get('jetDetails');
      this.imageUrl = serviceVar.IMAGE_PATH;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JetDetailPage');
  }
  goToSlide(index,arg) {
   console.log("INEDX="+index+"arg="+arg);
   this.slides.toArray()[index].slideTo(arg,500);
  }

  goInfo(){
    this.navCtrl.push(Jet_enquiryPage);
  }

}
