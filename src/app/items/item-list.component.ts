import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../admin/adminShared/user.service';
import {AngularFire} from 'angularfire2';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Popup} from 'ng2-opd-popup';

@Component({
  moduleId: module.id, // can now use realtive path (omit app/pages..)
  templateUrl: 'item-list.component.html',
  styleUrls: ['item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @ViewChild('popup1') popup1: Popup;
  pageTitle: string = 'Borrowing Admin panel';
  items: any;
  theUser: string;
  tabs: boolean;
  userImage: string;
  id: any;
  filterBy: string = 'all';
  listFilter: string;          // Set deafult search here
  nrOfItem;
  // add
  name;
  description;
  entity;
  entityName;
  reservationDays;

  constructor(public af: AngularFire, private uService: UserService, public flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
    this.theUser = this.uService.loggedInUser;
    this.tabs = this.uService.userLoggedIn;
    this.userImage = this.uService.userImage;

    this.uService.getItems().subscribe(items => {
      this.items = items;
    });

    // Receive a promise
    this.uService.nrOfItems().then(nr => {
      this.nrOfItem = nr;
    });


} // ngInit

  addDialog() {
    this.popup1.options = {
      header: "Add a item",
      color: 'green', // red, blue....
      widthProsentage: 40, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: "Save", // The text on your confirm button
      cancleBtnContent: "Cancel", // the text on your cancel button
      confirmBtnClass: "btn btn-success glyphicon glyphicon-plus", // your class for styling the confirm button
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button
      animation: "bounceInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };

    this.popup1.show(this.popup1.options);
  }

  onAddSubmit() {
    console.log('Item added successful!');

    let item = {
      description: this.description,
      entity: '',
      entityName: '',
      name: this.name,
      reservationDays: '',
      status: 'Available',
      photoURL: ''
    }

    this.uService.addItem(item);

  }



  logout() {
    this.uService.logout();
    this.flashMessage.show('Signed out', {cssClass: 'alert-success', timeout: 3000});
  }

} // class
