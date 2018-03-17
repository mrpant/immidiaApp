import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Events} from 'ionic-angular';
import * as $ from 'jquery';
import { ServiceProvider } from '../../providers/service/service';
import { BooknowPage } from '../booknow/booknow';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ModalController , LoadingController ,Loading  } from 'ionic-angular';
import { Modal1Page} from '../modal/modal1';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
declare var cordova:any;

  

@Component({
  selector: 'page-edit_profile',
  templateUrl: 'edit_profile.html'
})
export class Edit_ProfilePage {	

  public userDetails : any;
  public firstName:any;
  public lastName:any;
  public email:any;
  public address:any;
  public contactNumber:any;
  public lastImage: string = null;
  public loading:Loading;
  public pageCounter:number;

  constructor(public navCtrl: NavController, public serviceVar : ServiceProvider, public events: Events, private _storage: Storage,public modalCtrl: ModalController,public camera: Camera, public transfer: Transfer, public file: File, public filePath: FilePath,public loadingCtrl: LoadingController) {
  

	this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));
  if(this.userDetails != null){
    this.firstName = this.userDetails.firstName;
    this.lastName = this.userDetails.lastName;
    this.contactNumber = this.userDetails.contactNumber;
    this.email = this.userDetails.mailId;
    this.address = this.userDetails.address;
        

                if(this.userDetails.image == " " || this.userDetails.image == null){
                   this.userDetails.image = 'img/dummy-profile-pic.png';
                 }

  }



	this.callAllSubscribe(events);
  }


  presentModal(){

    if(this.serviceVar.isLogin){
      this.navCtrl.push(ProfilePage);
    }else{
      this.navCtrl.push(LoginPage);
      this.serviceVar.loginCurrentPages = Edit_ProfilePage;
    }
    
  }
    
   queryForm(){
 
          let modal = this.modalCtrl.create(Modal1Page);
          modal.present();
      
  }  

  callAllSubscribe(events){

  events.subscribe('profileEvent', object => { // get yacht state by custom events
        
         if(object != null){
               
                 if(this.pageCounter <= 1){
                  this.navCtrl.push(BooknowPage);
                  }
                // this.serviceVar.hideLoader();
                 
              
         }else{
         //  this.serviceVar.hideLoader();
           this.serviceVar.openAlert("Alert!!","No Results Found!!");
             
           return false;
         }
           this.pageCounter++;
             
    });
  }

    submitForm(){

	  this.userDetails = JSON.parse(window.localStorage.getItem('userDetails'));

    
      if(this.contactNumber == null || this.contactNumber < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter Contact Number");
        return false;
      }

      if(this.firstName == null || this.firstName < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter First Name");
        return false;
      }

      if(this.lastName == null || this.lastName < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter Last Name");
        return false;
      }
      if(this.email == null || this.email < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter Your Email");
        return false;
      }

      if(this.address == null || this.address < 0){
        this.serviceVar.openAlert("Alert!!","Please Enter Your Address");
        return false;
      }

    	this.pageCounter = 1;
    	this.serviceVar.editProfile(this.userDetails.id,this.firstName,this.lastName,this.email,this.address,this.contactNumber);

     

     
  }


  public takePicture(sourceType) {
        // Create options for the Camera Dialog
        var options = {
          quality: 100,
          sourceType: sourceType,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };
       
    // Get the data of an image
      this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
          if (sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
              });
          } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          }
        }, (err) => {
          this.serviceVar.showLoader('Error while selecting image.');
        });

    }



  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

    public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }


  private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.serviceVar.showLoader('Error while storing file.');
  });
 }


 public uploadImage() {
  // alert(this.lastImage);
   if(this.lastImage == null){
     this.serviceVar.openAlert("Alert!!","Please Upload Image First");
     return false;
   }


  // Destination URL
  var url = this.serviceVar.API_URL+'access=true&action=upload_profile_image&editId='+this.userDetails.id;
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
     
  // update image path 
    this.userDetails.image = targetPath;

  //  alert(targetPath);
  // File name only
  var filename = this.lastImage;
 
   var options = {
     fileKey: "file",
     fileName: filename,
     chunkedMode: false,
     mimeType: "multipart/form-data",
     params : {'fileName': filename}
  };
 
  const fileTransfer: TransferObject = this.transfer.create();
 
      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
      });
      this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
   // alert(JSON.stringify(data));
   this.loading.dismissAll()
    this.serviceVar.showLoader('Image succesful uploaded.');
  }, err => {
    this.loading.dismissAll()
    this.serviceVar.showLoader('Error while uploading file.');
  });
}

}
