import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Car_choicePage } from '../car_choice/car_choice';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { Modal1Page} from '../modal/modal1';

   
@Component({
  selector: 'page-insurance_detail',
  templateUrl: 'insurance_detail.html'
})
export class Insurance_detailPage {

  public carFilterParams :any;
  public driverOneName :string ; 
  public driverOneDOB :any;
  public driverOneLicenseIssue :any;
  public driverTwoName :string;
  public driverTwoDOB :any;
  public driverTwoLicenseIssue :any;
  public driOneChecked:boolean;
  public driTwoChecked:boolean;
  public modalCtrl:ModalController;
  public carDetails:any;




 constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,modalCtrl: ModalController) {
      this.carFilterParams = JSON.parse(window.localStorage.getItem('carFilterParams'));
      this.carDetails = JSON.parse(window.localStorage.getItem('carMoreDetailsObject'));
      this.modalCtrl = modalCtrl;

  }
  
 getCurrency(currencyId){
      return this.serviceVar.getCurrencyInSymbol(currencyId)
    }
  

  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
       this.serviceVar.loginCurrentPages = Insurance_detailPage;
    }
    
  }

   goBack(){
      this.navCtrl.pop();
  }

   queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }  

  driONEChecked(selectedValue:any){
    this.driOneChecked = selectedValue;
  }

  driTWOChecked(selectedValue:any){
    this.driTwoChecked = selectedValue;
  }

  submitFormInsurance(){

      if(this.serviceVar.isLogin == true){

       if(this.driOneChecked == true || this.driTwoChecked == true){
              let  carDriverObject = {
                  isDeriverOne : this.driOneChecked,
                  driverOneName : this.driverOneName,
                  driverOneDOB : this.driverOneDOB,
                  driverOneLicenseIssue : this.driverOneLicenseIssue,
                  isDeriverTwo : this.driTwoChecked,
                  driverTwoName : this.driverTwoName,
                  driverTwoDOB : this.driverTwoDOB,
                  driverTwoLicenseIssue : this.driverTwoLicenseIssue
              
                }

            window.localStorage.setItem('carDriverObject',JSON.stringify(carDriverObject)); 
         }else{

             let  carDriverObject = {
                  isDeriverOne : 0,
                  driverOneName : '',
                  driverOneDOB : '',
                  driverOneLicenseIssue : '',
                  isDeriverTwo : 0,
                  driverTwoName : '',
                  driverTwoDOB : '',
                  driverTwoLicenseIssue : ''
              
                }

              window.localStorage.setItem('carDriverObject',JSON.stringify(carDriverObject)); 
         }

        
        this.navCtrl.push(Car_choicePage);

    }else{ 

           let loginPage = this.modalCtrl.create(LoginPage); // login validate 
            loginPage.present();
           this.serviceVar.loginCurrentPages = Insurance_detailPage;
    }




  }

  shownGroup = null;

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };


}



