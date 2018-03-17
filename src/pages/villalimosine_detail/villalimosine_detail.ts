import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { VillaFood_drinksPage } from '../villa-food-drinks/villa-food-drinks';
 import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { Villa_choicePage } from '../villa_choice/villa_choice'

@Component({
  selector: 'page-villalimosine_detail',
  templateUrl: 'villalimosine_detail.html'
})
export class Villalimosine_detailPage {

    public villaFilterParams:any;
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
    public isQuickFilter:boolean;
    public villaDetails:any;
    public shownGroup:number;



  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams) {
      this.isQuickFilter = serviceVar.isQuickVillaFilter;
      this.villaFilterParams = JSON.parse(window.localStorage.getItem('villaFilterParams'));
      this.villaDetails = JSON.parse(window.localStorage.getItem('villaMoreDetailsObject'));
      this.arrPerson = 1;
      this.depPerson = 1;

      if(this.isQuickFilter == true){ // for quick villa filter
        let _villaDetails = JSON.parse(window.localStorage.getItem('villaFilterParams'));
         _villaDetails.price  = this.villaDetails.price;
         window.localStorage.setItem('villaFilterParams',JSON.stringify(_villaDetails));
          setTimeout(()=>{
            this.villaFilterParams.price = this.villaDetails.price;
          },1000);   
      
      }

      this.toggleGroup(0);
      this.limoDepChecked = true;

     
  }

  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = Villalimosine_detailPage;
    }
    
  }

 
  getCurrency(currencyId){
    return this.serviceVar.getCurrencyInSymbol(currencyId)
  }
     

  depChecked(selectedValue:any){
    this.limoDepChecked = selectedValue;
    if(this.limoDepChecked){
      this.toggleGroup(1);
    } else {
      this.toggleGroup(0);
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
              let  villaLimoObject = {
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
      window.localStorage.setItem('villaLimoObject',JSON.stringify(villaLimoObject));
            
         }


      if(this.villaFilterParams.days > 1 ){  
        this.navCtrl.push(Villa_choicePage);
      }else{
          this.navCtrl.push(VillaFood_drinksPage);
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



