import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { Food_drinksPage } from '../food_drinks/food_drinks';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ModalController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { Your_choicePage } from '../your_choice/your_choice';
 

@Component({
  selector: 'page-limosine_detail',
  templateUrl: 'limosine_detail.html'
})
export class Limosine_detailPage {
    public yachtFilterParams:any;
    public arrPerson:number;
    public depPerson:number;
    public limoDepChecked:boolean;
    public limoArrChecked:boolean;
    public limodepName:string;
    public limodepAddress:string;
    public limodepReq:string;
    public limodepHour:number;
    public limoarrName:string;
    public limoarrAddress:string;
    public limoarrReq:string;
    public yachtDetails:any;
    public lm_dep = false;
    public lm_ar = false; 


  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,public modalCtrl: ModalController) {
      this.yachtFilterParams = JSON.parse(window.localStorage.getItem('yachtFilterParams'));
      this.yachtDetails = JSON.parse(window.localStorage.getItem('yachtMoreDetailsObject'));
      this.arrPerson = 1;
      this.depPerson = 1;
      this.toggleGroup(0);
      this.limoDepChecked = true;
  }

 presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = Limosine_detailPage;
    }
    
  }

    queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }  


  getCurrency(currencyId){
    return this.serviceVar.getCurrencyInSymbol(currencyId)
  }

  depChecked(selectedValue:any){
    this.limoDepChecked = selectedValue;
    console.log(this.limoDepChecked);
    if(this.limoDepChecked){
      this.toggleGroup(0);
    } else {
      this.toggleGroup(1);
    }
    
  }

  arrChecked(selectedValue:any){
    this.limoArrChecked = selectedValue;
    if(this.limoArrChecked){
      this.toggleGroupDrop(1);
    } else {
      this.toggleGroupDrop(0);
    }
  }

  


  submitFormLimo(){

    

      if(this.limoDepChecked == true || this.limoArrChecked == true){
              let  yachtLimoObject = {
                  depPerson : this.depPerson,
                  limodepName : this.limodepName,
                  limodepAddress : this.limodepAddress,
                  limodepReq : this.limodepReq,
                  limodepHour : this.limodepHour,
                  arrPerson : this.arrPerson,
                  limoarrName : this.limoarrName,
                  limoarrAddress : this.limoarrAddress,
                  limoarrReq : this.limoarrReq
                }
            window.localStorage.setItem('yachtLimoObject',JSON.stringify(yachtLimoObject));
         }

    
      if(this.yachtFilterParams.daysId > 4 ){   
         this.navCtrl.push(Your_choicePage);
      }else{
        this.navCtrl.push(Food_drinksPage);
      }
      
      
  }


  goBack(){
    this.navCtrl.pop();
  }

  incrementDepGuestCounter(){
       this.depPerson++;
  }

  decrementDepGuestCounter(){
    if(this.depPerson > 1){
      this.depPerson--;
    }
  }

  incrementArrGuestCounter(){
       this.arrPerson++;
  }

  decrementArrGuestCounter(){
    if(this.arrPerson > 1){
      this.arrPerson--;
    }
  }

  shownGroup = null;

  toggleGroup(group) {
    console.log("ISGROUP="+group);
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };

  shownGroupDrop = null;

  toggleGroupDrop(group) {
    console.log("ISGROUP="+group);
    if (this.isGroupShownDrop(group)) {
        this.shownGroupDrop = null;
    } else {
        this.shownGroupDrop = group;
    }
  };
  isGroupShownDrop(group) {
      return this.shownGroupDrop === group;
  };
}



