import {Component} from '@angular/core';
import {UserService} from '../admin/adminShared/user.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id, // can now use realtive path (omit app/pages..)
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    public pageTitle: string = 'Borrowing';

    constructor(private  _userService: UserService) {}

    // login with fb
    login() {
        this._userService.login();
    }
}
