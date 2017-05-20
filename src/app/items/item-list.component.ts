import {Component, OnInit} from '@angular/core';
import {UserService} from '../admin/adminShared/user.service';
import {AngularFire} from "angularfire2";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  moduleId: module.id, // can now use realtive path (omit app/pages..)
  templateUrl: 'item-list.component.html',
  styleUrls: ['item-list.component.css']
})
export class ItemListComponent implements OnInit {
  pageTitle: string = 'Borrowing Admin panel';
  items: any;
  theUser: string;
  tabs: boolean;
  userImage: string;
  id: any;
  filterBy: string = 'all';
  listFilter: string;          // Set deafult search here

  constructor(public af: AngularFire, private uService: UserService, public flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
    this.theUser = this.uService.loggedInUser;
     this.tabs = this.uService.userLoggedIn;
    this.userImage = this.uService.userImage;

    this.uService.getItems().subscribe(items => {
      this.items = items;
    });

  }

  logout() {
    this.uService.logout();
    this.flashMessage.show('Signed out', {cssClass: 'alert-success', timeout: 3000});
  }

} // class
