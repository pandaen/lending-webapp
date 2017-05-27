import {Component, OnInit, ViewChild} from '@angular/core';
import {IItem} from './item';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserService} from '../admin/adminShared/user.service';
import * as firebase from 'firebase';
import {FlashMessagesService} from "angular2-flash-messages";
import {Popup} from 'ng2-opd-popup';

@Component({
  moduleId: module.id, // can now use realtive path (omit app/pages..)
  templateUrl: 'item-detail.component.html',
  styleUrls: ['item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @ViewChild('popup1') popup1: Popup;
  pageTitle: string = 'Item';
  //  item: IItem;
  id: any;
  item: any;
  reserved: any[];
  name;
  eMail = '';
  loanExistt;
  timeInMs;
  dueDate;
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

    // Receive a promise from exist
    this._uService.loanExist(this.id).then(exist => {
      this.loanExistt = exist;
      console.log('itemDetail-loanExsist is: ' +  this.loanExistt);
    });

    this._uService.getItemDetails(this.id).subscribe(item => {
      this.item = item;
      this.name = item.name;

      // Get nested itemDetails if node loan exist
      if (this.loanExistt) {
        this.dueDate = item.loan.formattedShortDate;
     //   this.borrowerName = item.loan.loanerName;
        this.timeInMs = item.loan.timeInMillis;
      }
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

  } // ng init

  sendEmail(eMail, borrower, date) {
    let body_message = 'Hello ' + borrower + '.\n\nYou have forgot to return the item: ' + this.name + '.' + '\nThe due date was: ' + date + '!' + '\nPlease return it  as soon as possible' + '\n\n\nBest Regards\nThe Borrowing Team';
    let email = eMail;
    let subject = 'Reminder of overdue item';
    let mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + encodeURIComponent(body_message);
     window.open(mailto_link, 'emailWindow');
  }


  onBack(): void {
    this._router.navigate(['']);
  }

  deleteDialog() {

    this.popup1.options = {
      header: "Delete Item",
      color: "#F8FF4A", // red, blue....
      widthProsentage: 40, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: "Yes", // The text on your confirm button
      cancleBtnContent: "No", // the text on your cancel button
      confirmBtnClass: "btn btn-danger", // your class for styling the confirm button
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button
      animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };

this.popup1.show(this.popup1.options);
  }

  onDeleteClick() {
    console.log('Deleted item!');
    this._uService.deleteItem(this.id);
    this._router.navigate(['']);
    this.flashMessage.show('Item deleted', {cssClass: 'alert-success', timeout: 3000});
  }

} // class
