import {Component} from '@angular/core';
import {UserService} from '../admin/adminShared/user.service';
import {FlashMessage} from 'angular2-flash-messages/module/flash-message';

@Component({
  moduleId: module.id, // can now use realtive path (omit app/pages..)
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    public pageTitle: string = 'Borrowing';


    constructor(private  userService: UserService) { // , public flashMessage: FlashMessage
    }
    login() {
        this.userService.login();
    }
}
