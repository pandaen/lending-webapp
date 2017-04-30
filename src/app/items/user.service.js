"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// import * as firebase from 'firebase';
// import {AngularFire, AuthProviders} from 'angularfire2';
var UserService = (function () {
    function UserService(_router) {
        this._router = _router;
        //  loggedInUser: string;
        // authUser: any;
        this.userLoggedIn = false;
        /*
                firebase.initializeApp({
                    apiKey: 'AIzaSyAHfCQArz_9VdSVJ0rGhaEMYeZuv8JJCIY',
                    authDomain: 'borrowing-app.firebaseapp.com',
                    databaseURL: 'https://borrowing-app.firebaseio.com',
                    storageBucket: 'borrowing-app.appspot.com',
                    messagingSenderId: '226399216748'
                });
                */
    }
    UserService.prototype.canActivate = function (route, state) {
        var url = state.url;
        return this.verifyLogin(url);
    };
    UserService.prototype.verifyLogin = function (url) {
        if (this.userLoggedIn) {
            return true;
        }
        // this._router.navigate(['../home/login']);
        this._router.navigate(['/items/items']);
        return false;
    };
    UserService.prototype.verifyUser = function () {
        /*
              this.authUser = firebase.auth().currentUser;
      
              if (this.authUser) {
                  alert('Welcome ${this.authUser.email}');
                  this.loggedInUser = this.authUser.email;
                  this.userLoggedIn = true;
                  this._router.navigate(['/items']);
              }
      */
    };
    UserService.prototype.login = function () {
        /*
        this.af.auth.login({
            provider: AuthProviders.Facebook
        });
        */
    };
    UserService.prototype.logout = function () {
        /*
         this.userLoggedIn = false;
         firebase.auth().signOut().then(function() {
         alert(`Logged Out!`);

         }, function(error) {
         alert(`${error.message} Unable to logout. Try again!`);
         });
         */
    };
    return UserService;
}()); // class
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map