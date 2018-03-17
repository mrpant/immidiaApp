import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular';
import { Your_choicePage } from '../your_choice/your_choice';
import { ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { Modal1Page} from '../modal/modal1';
import { removePage} from '../remove/remove';
 

@Component({
  selector: 'page-food_drinks',
  templateUrl: 'food_drinks.html'
})
export class Food_drinksPage {

  public yachtFilterParams:any;
  public yachtFood:any;
  public yachtPrice:any;
  public modalCtrl:ModalController;
  public yachtDetails:any;
  public yachtCartlength:number;

  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events,public navParams:NavParams, modalCtrl: ModalController) {
       this.yachtFilterParams = JSON.parse(window.localStorage.getItem('yachtFilterParams'));
       this.yachtDetails = JSON.parse(window.localStorage.getItem('yachtMoreDetailsObject'));
       serviceVar.getYachtFood(this.yachtFilterParams.stateId,this.yachtFilterParams.departureCity);
       this.yachtPrice = this.yachtFilterParams.price;
       this.modalCtrl = modalCtrl;
      
  }

   ngOnInit() {
    this.callAllSubscribe(this.events);
   }

 presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
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

    events.subscribe('yachtFoodListEvent', object => { // get yacht state by custom events
         if(object != null){
         this.yachtFood = object;
         console.log("yachtFood"+JSON.stringify(this.yachtFood));
         this.serviceVar.hideLoader();
         }else{
             this.serviceVar.showLoader('No Food Option is Available for Selected City');
             
             this.serviceVar.hideLoader();

         }
              
    });



     events.subscribe('addCartEvent', object => { // get yacht state by custom events
         
         if(object != null){
                var uniqueData = this.uniques(object);
                this.yachtCartlength = object.length;
                  console.log(JSON.stringify(uniqueData));
            var total =  0;
                for( let data of uniqueData){
                   total += data.qty * data.amount
                }
                
              this.yachtPrice = parseInt(this.yachtFilterParams.price) + total; 
              this.serviceVar.yachtCartAmount = total; 
           console.log(total+"TOTAL_AMOUNT");
         }
    });


  }


  addToCart(item:any,qty:number){
    this.serviceVar.yachtAddToCart.push(item);
    this.events.publish('addCartEvent',this.serviceVar.yachtAddToCart);
  }

  
   
  submitFormCart(){
    console.log("IsLOGIN"+this.serviceVar.isLogin);

    if(this.serviceVar.isLogin == true){
      this.navCtrl.push(Your_choicePage);
    }else{
            this.navCtrl.push(LoginPage);   
           this.serviceVar.loginCurrentPages = Food_drinksPage;
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
          let modal = this.modalCtrl.create(removePage);
          modal.present();
   }  


}



