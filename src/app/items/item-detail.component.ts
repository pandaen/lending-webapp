import {Component, OnInit} from '@angular/core';
import {IItem} from './item';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserService} from '../admin/adminShared/user.service';
import * as firebase from 'firebase';
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  moduleId: module.id, // can now use realtive path (omit app/pages..)
  templateUrl: 'item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {
  pageTitle: string = 'Item';
  //  item: IItem;
  id: any;
  item: any;
  reserved: any[];
  name;
  eMail = '';
  borrower;
  // userDetail: [any];
  imageUrl: any;
  userDetail: any[];

  errorMessage: string;
  private sub: Subscription;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _uService: UserService, public flashMessage: FlashMessagesService) {
  }

  // Sets items
  ngOnInit(): void {

    this.id = this._route.snapshot.params['id'];
    this._uService.getItemDetails(this.id).subscribe(item => {
      this.item = item;
      this.name = item.name;
      /*
       let storageRef = firebase.storage().ref();
       let spaceRef = storageRef.child(this.item.path);
       storageRef.child(this.item.path).getDownloadURL().then((url) => {
       // Set image url
       this.imageUrl = url;
       }).catch((error) => {
       console.log(error);
       });
       */
    });

    this._uService.getItemDetailsResInfo(this.id).subscribe(res => {
      this.reserved = res;
    });
  }

  sendEmail(eMail, borrower) {
    let body_message = 'Hello ' + borrower + '\n You have forgot to return the item: ' + this.name + '.\n\nPlease return it  as soon as possible' + '\n\n\n\nRegards The Borrowing Team';
    let email = eMail;
    let subject = 'Reminder of overdue item';

    let mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + encodeURIComponent(body_message);

     window.open(mailto_link, 'emailWindow');
  }


  onBack(): void {
    this._router.navigate(['/items']);
  }

  onDeleteClick() {
    console.log('Deleted item!');
    this._uService.deleteItem(this.id);
    this._router.navigate(['/items']);
    this.flashMessage.show('Item deleted', {cssClass: 'alert-success', timeout: 3000});
  }

} // class
