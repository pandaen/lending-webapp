import { Component, OnInit } from '@angular/core';
import {UserService} from "../../admin/adminShared/user.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-no-admin',
  templateUrl: './no-admin.component.html',
  styleUrls: ['./no-admin.component.css']
})
export class NoAdminComponent implements OnInit {
  tabs: boolean = true;
  constructor(private uService: UserService, public flashMessage: FlashMessagesService) { }

  ngOnInit() {

  }


  logout() {
    this.uService.logout();
    this.flashMessage.show('Signed out', {cssClass: 'alert-success', timeout: 3000});
  }


}
