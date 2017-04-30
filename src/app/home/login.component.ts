import {Component} from '@angular/core';
import {UserService} from '../items/user.service';

@Component({
  moduleId: module.id, // can now use realtive path (omit app/pages..)
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    public pageTitle: string = 'Borrowing';


    constructor(private  userService: UserService) {
    }
    login() {
        this.userService.login();
    }
}
