var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
var Booking_confirmationPage = (function () {
    function Booking_confirmationPage(navCtrl, serviceVar, events, navParams) {
        this.navCtrl = navCtrl;
        this.serviceVar = serviceVar;
        this.events = events;
        this.navParams = navParams;
        this.userDetails = this.serviceVar.userDetails;
        this.yachtDetails = JSON.parse(window.localStorage.getItem('yachtMoreDetailsObject'));
        this.yachtFilterParams = JSON.parse(window.localStorage.getItem('yachtFilterParams'));
        this.serviceVar.getBookingStatus(navParams.get('bookingId'));
        this.callAllSubscribe(events);
    }
    Booking_confirmationPage.prototype.callAllSubscribe = function (events) {
        var _this = this;
        events.subscribe('bookingStatusEvent', function (object) {
            if (object != null) {
                _this.bookingStaus = object.status;
                window.localStorage.removeItem('yachtFilterParams');
                window.localStorage.removeItem('yachtMoreDetailsObject');
                window.localStorage.removeItem('yachtLimoObject');
            }
        });
    };
    return Booking_confirmationPage;
}());
Booking_confirmationPage = __decorate([
    Component({
        selector: 'page-booking_confirmation',
        templateUrl: 'booking_confirmation.html'
    }),
    __metadata("design:paramtypes", [NavController, ServiceProvider, Events, NavParams])
], Booking_confirmationPage);
export { Booking_confirmationPage };
//# sourceMappingURL=booking_confirmation.js.map