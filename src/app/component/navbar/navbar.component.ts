import {Component, OnInit} from '@angular/core';
 import {AngularFire} from 'angularfire2';
import {FlashMessagesService} from 'angular2-flash-messages';
import {UserService} from '../../admin/adminShared/user.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  theUser: string;
  userLoggedIn: boolean;
  tabs: boolean;
  _subscription: any;

  constructor(public flashMessage: FlashMessagesService, private  _userService: UserService, public af: AngularFireAuth) { }

  ngOnInit(): void {

    this.theUser = this._userService.loggedInUserDisplayName;

    this._subscription = this._userService.nChangeuserLoggedIn.subscribe((value) => {
      this.tabs = value;
      console.log('value is: ' + this.tabs);
    });

    // this.tabs = this._userService.userLoggedIn;
    //  console.log('userLoggedIn is' + this.userLoggedIn + 'and tabs is: ' + this.tabs);
    // demmmm
  }
/*
  login() {
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    this.userLoggedIn = this._userService.userLoggedIn;
    console.log('userLoggedIn is: ' + this.userLoggedIn);
  }


  logout() {
// this.af.auth.logout();
   // this._userService.logout();
    this.af.auth.signOut();
    this.flashMessage.show('Signed out', {cssClass: 'alert-success', timeout: 3000});
  }
*/
}
