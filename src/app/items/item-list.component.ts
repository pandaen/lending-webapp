import {Component, OnInit} from '@angular/core';
import {UserService} from '../admin/adminShared/user.service';

@Component({
    moduleId: module.id, // can now use realtive path (omit app/pages..)
    templateUrl: 'item-list.component.html',
    styleUrls: ['item-list.component.css']
})
export class ItemListComponent implements OnInit {
    pageTitle: string = 'Borrowing Admin panel';
    imageWidth: number = 50;
    imageMargin: number = 2;
    listFilter: string;          // Set deafult search here
  items: any;
theUser: string;
userImage: string;
    constructor( private uService: UserService ) {

    }

    ngOnInit(): void {
      this.theUser = this.uService.loggedInUser;
      this.userImage = this.uService.userImage;
      this.uService.getItems().subscribe(items => {
        this.items = items;
      });
    }


  logout() {
    this.uService.logout();
  }

} // class
