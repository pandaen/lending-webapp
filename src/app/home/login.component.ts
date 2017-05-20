import {Component} from '@angular/core';
import {UserService} from '../admin/adminShared/user.service';
import {FlashMessage} from 'angular2-flash-messages/module/flash-message';
import {NavbarComponent} from "../component/navbar/navbar.component";

@Component({
  moduleId: module.id, // can now use realtive path (omit app/pages..)
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    public pageTitle: string = 'Borrowing';

    constructor(private  _userService: UserService) {}

    login() {
        this._userService.login();
    }
}
