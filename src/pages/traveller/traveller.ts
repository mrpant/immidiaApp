import { Component } from '@angular/core';
import {App , NavController } from 'ionic-angular';
import { Edit_ProfilePage } from '../edit_profile/edit_profile';


@Component({
  selector: 'page-traveller',
  templateUrl: 'traveller.html'
})
export class TravellerPage {

	public userDetails : any;

	constructor(public navCtrl: NavController, public appCtrl: App) {
		this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));

                if(this.userDetails.image == " " || this.userDetails.image == null){
                   this.userDetails.image = 'img/dummy-profile-pic.png';
                 }
	}

	buttonClicked : boolean;

	public onButtonClick() {
        this.buttonClicked = !this.buttonClicked;
    }

    editProfile(){
    	  this.appCtrl.getRootNav().setRoot(Edit_ProfilePage);
    	//this.navCtrl.popToRoot(Edit_ProfilePage);
  	}


}
