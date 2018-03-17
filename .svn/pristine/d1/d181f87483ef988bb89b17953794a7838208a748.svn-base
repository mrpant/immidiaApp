import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { Villa_choicePage } from '../villa_choice/villa_choice';
import { ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { Modal1Page} from '../modal/modal1';
import { villa_removePage} from '../villa_remove/villa_remove';

@Component({
  selector: 'page-villa-food-drinks',
  templateUrl: 'villa-food-drinks.html'
})
export class VillaFood_drinksPage {

  public villaFilterParams:any;
  public villaFood:any;
  public villaPrice:any;
   public modalCtrl:ModalController;
   public villaDetails:any;
   public villaCartlength:number;

  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams,modalCtrl: ModalController) {
      this.villaFilterParams = JSON.parse(window.localStorage.getItem('villaFilterParams'));
       serviceVar.getVillaFood(this.villaFilterParams.stateId,this.villaFilterParams.destinationCity);
       this.villaPrice = this.villaFilterParams.price;
       this.modalCtrl = modalCtrl;
       this.villaDetails = JSON.parse(window.localStorage.getItem('villaMoreDetailsObject'));
   }


   ngOnInit() {
    this.callAllSubscribe(this.events);
   }


  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = VillaFood_drinksPage;
    }
    
  }

  queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }

   getCurrency(currencyId){
    return this.serviceVar.getCurrencyInSymbol(currencyId)
   }

   uniques(arr) {
    var a = [];
    for (var i=0, l=arr.length; i<l; i++)
            if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
                a.push(arr[i]);
        return a;
    }

   callAllSubscribe(events){

    events.subscribe('villaFoodListEvent', object => { // get villa state by custom events
         if(object != null){
         this.villaFood = object;
         console.log("villaFood"+JSON.stringify(this.villaFood));
         this.serviceVar.hideLoader();
         }else{
    
             this.serviceVar.showLoader('No Food Option is Available for Selected City');
             this.serviceVar.hideLoader();

         }

            
    });



     events.subscribe('addCartEvent', object => { // get villa state by custom events
         
         if(object != null){
                var uniqueData = this.uniques(object);
                this.villaCartlength = object.length;
                  console.log(JSON.stringify(uniqueData));
            var total =  0;
                for( let data of uniqueData){
                   total += data.qty * data.amount;
                }
                
              this.villaPrice = this.villaFilterParams.price + total;  
              this.serviceVar.villaCartAmount = total;
           console.log(total+"TOTAL_AMOUNT");
         }
    });


  }


  addToCart(item:any,qty:number){
    this.serviceVar.villaAddToCart.push(item);
    this.events.publish('addCartEvent',this.serviceVar.villaAddToCart);
  }

  
   
  submitFormCart(){
  
    if(this.serviceVar.isLogin == true){
      this.navCtrl.push(Villa_choicePage);
    }else{
          let loginPage = this.modalCtrl.create(LoginPage); // login validate
           loginPage.present();
           this.serviceVar.loginCurrentPages = VillaFood_drinksPage;
    }
  }


  goBack(){
    this.navCtrl.pop();
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


    removeCart(){
          let modal = this.modalCtrl.create(villa_removePage);
          modal.present();
   }  

}