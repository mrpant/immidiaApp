import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import { ModalController } from 'ionic-angular';
import { Modal1Page } from '../modal/modal1';
import { DatePipe } from '@angular/common';
import { DirectionsMapDirective } from '../../directive/google-map.directive';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { FormControl } from '@angular/forms';
import { } from '@types/googlemaps';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { CarSearchListPage } from '../car-search-list/car-search-list';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

/**
 * Generated class for the CarSearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google: any;
declare var jQuery: any;
@IonicPage()
@Component({
  selector: 'page-car-search',
  templateUrl: 'car-search.html',
  styles: [`
  .sebm-google-map-container {
      height: 100%;
      width: 100%;
      z-index: -1 !important;
      position: absolute;
   }`],
  providers: [GoogleMapsAPIWrapper]
})
export class CarSearchPage {
  pageCounter: number;
  distance: any;
  public checkVal = false;
  duration: any;
  carCountry: any;
  public latitude: number;
  public longitude: number;
  public destinationInput: FormControl;
  public destinationOutput: FormControl;
  public zoom: number;
  public iconurl: string;
  public mapCustomStyles: any;
  public estimatedTime: any;
  public estimatedDistance: any;
  countryCode: any;
  public countryStartName: string;
  countryEndName: string;
  departureDate: any;
  public checked = false;
  @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;
  destiDetails : any;
  arrDetails :any;
  passenger :any;
  luggage:any;
  pickup_data_time:any;
  pickup_comments_one:any;
  hours:any;



  constructor(private http: Http,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef: ElementRef, private zone: NgZone, public navCtrl: NavController, public serviceVar: ServiceProvider, public events: Events, public modalCtrl: ModalController, public datepipe: DatePipe) {
    this.distance = 0.0;
    this.duration = 0.0;
    this.carCountry = this.serviceVar.carCountry;
    this.callAllSubscribe(events);
    this.pickup_data_time = new Date().toISOString();
    this.luggage ="1";
    this.passenger = "1";

  }

 /*  ionViewDidLoad() {
    console.log('ionViewDidLoad CarSearchPage');
  } */



  callAllSubscribe(events) {

    events.subscribe('carChauffureEvent', object => { // get yacht state by custom events
      console.log("asdasd===3");
      if (object != null) {
        console.log("data" + JSON.stringify(object));
        console.log("country" + this.countryStartName);

      } else {
        //  this.serviceVar.hideLoader();
        this.serviceVar.openAlert("Alert!!", "No Cars Available in this location!!");

        return false;
      }

      this.pageCounter++;
    });
  }


  ionViewDidLoad() {



    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    //this.iconurl = '../image/map-icon.png';
    this.iconurl = 'img/sub-location-icon.png';

    // this.mapCustomStyles = this.getMapCusotmStyles();
    //create search FormControl
    this.destinationInput = new FormControl();
    this.destinationOutput = new FormControl();
    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      let autocompleteInput = new google.maps.places.Autocomplete(document.getElementById('pickupInput'));

      let autocompleteOutput = new google.maps.places.Autocomplete(document.getElementById('pickupOutput'));

      this.setupPlaceChangedListener(autocompleteInput, 'ORG', 1);
      this.setupPlaceChangedListener(autocompleteOutput, 'DES', 2);
    });
  }

  updateMap() {

  }

  private setupPlaceChangedListener(autocomplete: any, mode: any, fields: number) {
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();



        console.log(place); // take a look at this result object
        console.log(place.address_components); // a result has multiple address components

        for (var i = 0; i < place.address_components.length; i += 1) {
          var addressObj = place.address_components[i];
          for (var j = 0; j < addressObj.types.length; j += 1) {
            if (addressObj.types[j] === 'country') {

              if (fields == 1) {
                console.log(addressObj.types[j]); // confirm that this is 'country'
                console.log(addressObj.long_name); // confirm that this is the country name
                console.log(addressObj.short_name);
                this.countryCode = addressObj.short_name;
                this.countryStartName = addressObj.long_name;


              } else {
                this.countryEndName = addressObj.long_name;
                this.serviceVar.showLoader('Updating Map Direction...');
              }




            }
          }
        }

        //verify result

        if (place.geometry === undefined) {
          return;
        }
        if (mode === 'ORG') {
          this.vc.origin = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() };
          console.log("Please" + JSON.stringify(this.vc.origin));
          this.vc.originPlaceId = place.place_id;
          this.destiDetails = this.vc.origin;
        } else {
          this.vc.destination = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() }; // its a example aleatory position
          this.vc.destinationPlaceId = place.place_id;
          this.arrDetails = this.vc.origin;
        }

        if (this.vc.directionsDisplay === undefined) {
          this.mapsAPILoader.load().then(() => {
            this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
          });
        }

        //Update the directions
        this.vc.updateDirections();
        this.zoom = 12;
      });

    });

  }

  getDistanceAndDuration() {
    this.estimatedTime = this.vc.estimatedTime;
    this.estimatedDistance = this.vc.estimatedDistance;
  }

  getTime() {
    return this.vc.estimatedTime ? this.vc.estimatedTime : "Not Found";
  }



  getDistance() {
    return this.vc.estimatedDistance ? this.vc.estimatedDistance : "Not Found";
  }

  scrollToBottom(): void {
    $('html, body').animate({ scrollTop: $(document).height() }, 3000);
  }
  private setPickUpLocation(place: any) {
    //verify result
    if (place.geometry === undefined || place.geometry === null) {
      return;
    }
    //set latitude, longitude and zoom
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();
    this.zoom = 12;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  private getMapCusotmStyles() {
    // Write your Google Map Custom Style Code Here.
  }


   splitString (string, size) {
    var re = new RegExp('.{1,' + size + '}', 'g');
    return string.match(re);
  }

   hours_am_pm(time) {
    var hours = time[0] + time[1];
    var min = time[2] + time[3];
    if (hours < 12) {
        return hours + ':' + min + ' AM';
    } else {
        hours=hours - 12;
        hours=(hours.length < 10) ? '0'+hours:hours;
        return hours+ ':' + min + ' PM';
    }
}

  submitService() {


    if(this.pickup_comments_one == null ){
      this.serviceVar.openAlert("Alert!!","Comments Could not be Blank");
      return false;
    }
    if(this.pickup_data_time==null ){
      this.serviceVar.openAlert("Alert!!","Date & Time Could not be Blank");
      return false;
    }
   

   let dataObject = {};
   var time = Math.floor(parseFloat(this.vc.estimatedTimeInSecond) / 60);
   dataObject['orig_latitude'] =  this.destiDetails.latitude; 
   dataObject['orig_longitude'] = this.destiDetails.longitude; 
   dataObject['dest_latitude'] = this.arrDetails.latitude; 
   dataObject['dest_longitude'] = this.arrDetails.longitude; 
   dataObject['estimatedTime'] = time;
   dataObject['estimatedDistance'] = this.vc.estimatedDistance;
   dataObject['short_name'] = this.countryCode;
   dataObject['passenger'] = this.passenger;
   dataObject['luggage'] = this.luggage;
   dataObject['pickup_comments_one'] = this.pickup_comments_one;
   dataObject['hours'] = this.hours;
   dataObject['isChecked'] = this.checkVal;
   dataObject['from'] = this.countryStartName;
   dataObject['to'] = this.countryEndName;
   
   
   


    if (!isNaN(time) && this.countryCode != "") {
      this.pageCounter = 1;
      console.log(dataObject);
      let timeTemp  = this.splitString(this.pickup_data_time,10)[1];
      let realTime = timeTemp.replace('T','').replace('Z','').split(':');
      let  defaultTime = Math.floor(this.vc.estimatedTimeInSecond/60);
      
      console.log("splict",this.splitString(this.pickup_data_time,10));
     console.log(this.hours_am_pm(realTime[0]+realTime[1]+realTime[2]));
     dataObject['pickup_time'] = this.hours_am_pm(realTime[0]+realTime[1]+realTime[2]);
     dataObject['pickup_date'] = this.splitString(this.pickup_data_time,10)[0];
     if(this.checkVal){
     
     
      return new Promise(resolve => {
        this.http.post(this.serviceVar.API_URL+'access=true&action=web_get_chauffeur_list_by_country_by_hours&hours='+this.hours+'&country_code='+this.countryCode+'&pickup_time='+dataObject['pickup_time'],JSON.stringify(dataObject))
           .timeout(3000)
          .map(res => res.json())
          .subscribe(data => {
          if(data.status == true){
                 
            this.navCtrl.push(CarSearchListPage,{"chauffeurDetails":dataObject,"response":data});
           
          console.log(data);
          }else{
            
            this.serviceVar.openAlert("Message","Sorry!! PLease Try Again..");
          }
            ////console.log(JSON.stringify(this.yachtCountry));
            resolve(data.data);
          },
          error =>{
            
              
          });
      }); 

    }else{

      return new Promise(resolve => {
        this.http.post(this.serviceVar.API_URL+'access=true&action=web_get_chauffeur_list_by_country_by_hours&time='+defaultTime+'&country_code='+this.countryCode,JSON.stringify(dataObject))
           .timeout(3000)
          .map(res => res.json())
          .subscribe(data => {
          if(data.status == true){
                 
              this.navCtrl.push(CarSearchListPage,{"chauffeurDetails":dataObject,"response":data});
           
          console.log(data);
          }else{
            
            this.serviceVar.openAlert("Message","Sorry!! PLease Try Again..");
          }
            ////console.log(JSON.stringify(this.yachtCountry));
            resolve(data.data);
          },
          error =>{
            
              
          });
      }); 


    } //end of else

      /* this.serviceVar.getCarChauffureData(time, this.countryCode); */
    } else {
      alert("Please provide valid information");
    }

  }


  calculateAndDisplayRoute() {

    /*   console.log("Start"+this.start);
       console.log("END"+this.end);
 
     this.directionsService.route({
       origin: this.start,
       destination: this.end,
       travelMode: 'DRIVING'
     }, (response, status) => {
       if (status === 'OK') {
         this.distance = response.routes[0].legs[0].distance.value;
         this.duration = Math.floor(response.routes[0].legs[0].duration.value / 60);
         this.directionsDisplay.setDirections(response);
       } else {
         window.alert('Directions request failed due to ' + status);
       }
     });*/
  }

  presentModal() {

    if (this.serviceVar.isLogin) {
      this.navCtrl.push(ProfilePage);
    } else {
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = CarSearchPage;
    }

  }

  queryForm() {

    let modal = this.modalCtrl.create(Modal1Page);
    modal.present();

  }
  nextStep(){
    this.navCtrl.push(CarSearchListPage);
  }
checkvalue(e){
  console.log(this.checkVal);
  if(this.checkVal){
    this.checked = true;
  } else {
    this.checked = false;
  }
}
}

