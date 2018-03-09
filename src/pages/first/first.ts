import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { YachtPage } from '../yacht/yacht';
import { CarPage } from '../car/car';
import { VillaPage } from '../villa/villa';
import { BooknowyachtPage } from '../booknowyacht/booknowyacht';
import { BooknowcarPage } from '../booknowcar/booknowcar';
import { BooknowvillaPage } from '../booknowvilla/booknowvilla';
import { BooknowairplanePage } from '../booknowairplane/booknowairplane';
import { BooknowPage } from '../booknow/booknow';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import * as $ from 'jquery';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { Jet_enquiryPage } from '../jet_enquiry/jet_enquiry';
import { ServiceProvider } from '../../providers/service/service';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ChauffeurPage } from '../chauffeur/chauffeur';
import { Villa_salePage } from '../villa_sale/villa_sale';
import { RideDetailsPage } from '../ride-details/ride-details';
@Component({
  selector: 'page-first',
  templateUrl: 'first.html'
})
export class FirstPage {
	@ViewChild('mySlider') slides: Slides;

	browseYatch = YachtPage;
	browseVilla = VillaPage;
	bookVilla = BooknowPage;
	public YachtTabSelected : boolean = false;
	public JetTabSelected : boolean = false;
	public CarTabSelected : boolean = false;
	public VillaTabSelected : boolean = false;

	
	constructor(private navCtrl: NavController,public serviceVar : ServiceProvider,  private navParams: NavParams,public modalCtrl: ModalController) {

	//code for tab visible	
	this.YachtTabSelected = this.navParams.get('tab_yacht');
	this.JetTabSelected = this.navParams.get('tab_jet');
	this.CarTabSelected = this.navParams.get('tab_car');
	this.VillaTabSelected = this.navParams.get('tab_villa');

	}



   presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = FirstPage;
    }
    
  }

    queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }  

   goToAirplane(){
   this.navCtrl.push(Jet_enquiryPage);
  }

	ionViewDidEnter() {
		//code for default sliding, depanding on selection
		if(this.YachtTabSelected){
			this.slides.slideTo(0,50);
		}else if(this.JetTabSelected){
			this.slides.slideTo(1,50);
		}else if(this.CarTabSelected){
			this.slides.slideTo(2,50);
		}else{
			this.slides.slideTo(3,50);
		}

	}


	slideChanged(){

	 let arg = this.slides.getActiveIndex();

     if(arg == 0){
			$('#tab_yacht').attr('style','border-bottom: solid');
			$('#tab_jet').removeAttr('style');
			$('#tab_car').removeAttr('style');
			$('#tab_villa').removeAttr('style');

			this.YachtTabSelected = true;
			this.JetTabSelected = false;
			this.CarTabSelected = false;
			this.VillaTabSelected = false;

		}else if(arg == 1){
			$('#tab_yacht').removeAttr('style');
			$('#tab_jet').attr('style','border-bottom: solid');
			$('#tab_car').removeAttr('style');
			$('#tab_villa').removeAttr('style');

			this.YachtTabSelected = false;
			this.JetTabSelected = true;
			this.CarTabSelected = false;
			this.VillaTabSelected = false;

		}else if(arg == 2){
			$('#tab_yacht').removeAttr('style');
			$('#tab_jet').removeAttr('style');
			$('#tab_car').attr('style','border-bottom: solid');
			$('#tab_villa').removeAttr('style');

			this.YachtTabSelected = false;
			this.JetTabSelected = false;
			this.CarTabSelected = true;
			this.VillaTabSelected = false;

		}else{
			$('#tab_yacht').removeAttr('style');
			$('#tab_jet').removeAttr('style');
			$('#tab_car').removeAttr('style');
			$('#tab_villa').attr('style','border-bottom: solid');

			this.YachtTabSelected = false;
			this.JetTabSelected = false;
			this.CarTabSelected = false;
			this.VillaTabSelected = true;		
		}

    }

	public goToSlide(arg) {
		

		console.log(arg);
		//code for active tab click on same page
		if(arg == 0){
			$('#tab_yacht').attr('style','border-bottom: solid');
			$('#tab_jet').removeAttr('style');
			$('#tab_car').removeAttr('style');
			$('#tab_villa').removeAttr('style');

			this.YachtTabSelected = true;
			this.JetTabSelected = false;
			this.CarTabSelected = false;
			this.VillaTabSelected = false;

		}else if(arg == 1){
			$('#tab_yacht').removeAttr('style');
			$('#tab_jet').attr('style','border-bottom: solid');
			$('#tab_car').removeAttr('style');
			$('#tab_villa').removeAttr('style');

			this.YachtTabSelected = false;
			this.JetTabSelected = true;
			this.CarTabSelected = false;
			this.VillaTabSelected = false;

		}else if(arg == 2){
			$('#tab_yacht').removeAttr('style');
			$('#tab_jet').removeAttr('style');
			$('#tab_car').attr('style','border-bottom: solid');
			$('#tab_villa').removeAttr('style');

			this.YachtTabSelected = false;
			this.JetTabSelected = false;
			this.CarTabSelected = true;
			this.VillaTabSelected = false;

		}else{
			$('#tab_yacht').removeAttr('style');
			$('#tab_jet').removeAttr('style');
			$('#tab_car').removeAttr('style');
			$('#tab_villa').attr('style','border-bottom: solid');

			this.YachtTabSelected = false;
			this.JetTabSelected = false;
			this.CarTabSelected = false;
			this.VillaTabSelected = true;		
		}


		this.slides.slideTo(arg, 500);
		
	}



	goToYacht(){
  		this.navCtrl.push(YachtPage);
	}
	goToCar(){
		this.navCtrl.push(CarPage);
	}
	goToJet(){
		this.navCtrl.push(RideDetailsPage);
	}
	goToVilla(){
		this.navCtrl.push(VillaPage);
	}
	goToYachtDetail(){
		this.navCtrl.push(BooknowyachtPage);
	}
	goToAirplaneDetail(){
		this.navCtrl.push(BooknowairplanePage);
	}
	goToCarDetail(){
		this.navCtrl.push(BooknowcarPage);
	}
	goToVillaDetail(){
		this.navCtrl.push(BooknowvillaPage);
	}

	goToChauffeurDetail(){
		this.navCtrl.push(ChauffeurPage);	
	}

	goToVillaSaleDetail(){
		this.navCtrl.push(Villa_salePage);	
	}

}
