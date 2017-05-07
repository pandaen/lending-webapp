import {Component, OnInit} from '@angular/core';
import {UserService} from '../admin/adminShared/user.service';

@Component({
  moduleId: module.id, // can now use realtive path (omit app/pages..)
  templateUrl: 'item-list.component.html',
  styleUrls: ['item-list.component.css']
})
export class ItemListComponent implements OnInit {
  pageTitle: string = 'Borrowing Admin panel';
  items: any;
  theUser: string;
  userImage: string;
  id: any;
  filterBy: string = 'all';
  listFilter: string;          // Set deafult search here

  constructor(private uService: UserService) { }

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
