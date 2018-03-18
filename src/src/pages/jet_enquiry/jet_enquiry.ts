import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import {Events} from 'ionic-angular';
import * as $ from 'jquery';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ServiceProvider } from '../../providers/service/service';
import { ModalController , ViewController  } from 'ionic-angular';
import { BooknowPage } from '../booknow/booknow';
import { DatePipe } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Http , URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'page-jet_enquiry',
  templateUrl: 'jet_enquiry.html'
})
export class Jet_enquiryPage {

  public guest:number;
  public firstname:string;
  public email:string;
  public phone:number;
  public jetDepDate:any;
  public jetArrDate:any;
  public jetCityFrom:string;
  public jetCityTo:string;
  public jetdepartuetime:any;
  public arrivaljettime:any;
  public jetRoundType:any;
  public request:string;
  public jet_advertising:any;
  public pageCounter:number;
  public nextform = false;
  public roundTrip = true;
  public no_of_passanger : any ;
  public SpecialRequest : String;
  public jetType : any;
  jetForm : FormGroup;
  jetUserForm:FormGroup;
  formData:any;

    constructor(private http: Http,public builder : FormBuilder ,public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events, public modalCtrl: ModalController, public datepipe: DatePipe) {
      this.guest = 1;
      this.jetType = "Small Jet";
      this.jetRoundType= "One Way";
      this.jetdepartuetime = "09:00";
      this.arrivaljettime = "09:00";
      this.jet_advertising = "Source"
      this.formData = {};
      this.jetDepDate = new Date().toISOString();
      this.no_of_passanger = 1 ;
      this.jetForm =  builder.group({
        jetCityFrom : ['', Validators.compose([Validators.required])],
        jetCityTo : ['', Validators.compose([Validators.required])],
        jetType : [''],
        jetRoundType : [''],
        jetDepDate : ['', Validators.compose([Validators.required])],
        jetArrDate : ['', Validators.compose([Validators.required])],
        jetdepartuetime : [''],
        arrivaljettime : [''],
        no_of_passanger : ['', Validators.compose([Validators.required])],
      });
      this.jetUserForm = builder.group({
        firstname : ['', Validators.compose([Validators.required])],
        lastname : ['', Validators.compose([Validators.required])],
        email : ['', Validators.compose([Validators.required])],
        phone : ['', Validators.compose([Validators.required])],
        SpecialRequest : ['', Validators.compose([Validators.required])],
      });
    
    }

      ngOnInit() {
    this.callAllSubscribe(this.events);
      this.jetDepDate = this.datepipe.transform(this.jetDepDate, 'yyyy-MM-dd');
   }

     callAllSubscribe(events){
       events.subscribe('jetQueryEvent', object => { 
       
           if(this.pageCounter <= 1){
               this.navCtrl.setRoot(BooknowPage);
           }
            this.pageCounter++;
       });
       
      }


  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = Jet_enquiryPage;
    }
    
  }

   queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }
  submitQueryNext(){
    this.nextform = true;
  }
  submitQueryPrev(){
    this.nextform = false;
  }
  
  submitQuery(){


     if(this.email == null ){
        this.serviceVar.openAlert("Alert!!","Email Id Could not be Blank");
        return false;
      }
      if(this.phone==null ){
        this.serviceVar.openAlert("Alert!!","Phone Number Could not be Blank");
        return false;
      }
      if(this.jetCityFrom==null ){
        this.serviceVar.openAlert("Alert!!","Departure City Could not be Blank");
        return false;
      }
      if(this.jetCityTo == null){
        
          this.serviceVar.openAlert("Alert!!","Arrival City Could not be Blank");
          return false;
        
      }
    

    let queryData = {
     'firstname': this.firstname,
     'email' : this.email,
     'phone' : this.phone,
     'jetDepDate' : this.jetDepDate,
     'jetArrDate' : this.jetArrDate,
     'jetCityFrom' : this.jetCityFrom,
     'jetCityTo' : this.jetCityTo,
     'jetRoundType' : this.jetRoundType,
     'jetdepartuetime' : this.jetdepartuetime,
     'arrivaljettime' : this.arrivaljettime,
     'no_of_passanger': this.no_of_passanger,
     'SpecialRequest' : this.SpecialRequest,
     'jet_advertising' : this.jet_advertising,
     'jetType' : this.jetType,
     'sourceUrl' : 'immidia.co'
    }

   
   
    this.pageCounter = 1;

          let params = new URLSearchParams();
          for(let key in queryData){
              params.set(key, queryData[key]) 
          }

          return new Promise(resolve => {
            this.http.post(this.serviceVar.API_URL+'access=true&action=mail_to_jet&'+params.toString(),{})
               .timeout(3000)
              .map(res => res.json())
              .subscribe(data => {
                console.log("data",data);
              if(data.status == true){
                 this.serviceVar.openAlert("Message","Thank you for Contacting to us");

                 setTimeout(()=>{
                  this.navCtrl.push(BooknowPage);
                 },1000)
              console.log(data);
              }else{
                
                this.serviceVar.openAlert("Message","Sorry!! PLease Try Again..");
              }
                ////console.log(JSON.stringify(this.yachtCountry));
                resolve(data.data);
              },
              error =>{
                
                  console.log(error);
              });
          });

  }


  public event = {
    month: '1990-02-19',
    timeStarts: '07:00',
  }

incrementGuestCounter(){
       this.no_of_passanger++;
  }

  decrementGuestCounter(){
    if(this.no_of_passanger > 1){
      this.no_of_passanger--;
    }
  }
  selectTrip(event,trip){
    console.log(trip);
    if(trip==0){
      this.roundTrip = false;
    } else {
      this.roundTrip = true;
    }
  }


  onSubmit(formData){
    this.formData = {
      jetCityFrom : formData.value.jetCityFrom,
        jetCityTo : formData.value.jetCityTo,
        jetType : formData.value.jetType,
        jetRoundType : formData.value.jetRoundType,
        jetDepDate : formData.value.jetDepDate,
        jetArrDate : formData.value.jetArrDate,
        jetdepartuetime : formData.value.jetdepartuetime,
        arrivaljettime : formData.value.arrivaljettime,
        no_of_passanger : formData.value.no_of_passanger,
    }
    this.nextform = true;
  }



}
