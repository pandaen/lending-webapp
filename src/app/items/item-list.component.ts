import {Component, OnInit} from '@angular/core';
import {IItem} from './item';
import {ItemService} from './item.service';
import {UserService} from '../admin/adminShared/user.service';
import {Router} from '@angular/router';

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
  items: IItem[] = [];
theUser: string;
    constructor(private _itemService: ItemService, private uService: UserService ) {

    }

    ngOnInit(): void {
       this.items = this._itemService.getItems();  // links itemsService to this item
      this.theUser = this.uService.loggedInUser;
    }


  logout() {
    this.uService.logout();
  }


} // class
