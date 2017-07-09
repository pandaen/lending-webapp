import {Component, OnInit, ViewChild} from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {UserService} from "../../admin/adminShared/user.service";
import {ActivatedRoute, Router} from "@angular/router";
 import {Popup} from "ng2-opd-popup";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @ViewChild('popup1') popup1: Popup;
  pageTitle: string = 'User';
  id: any;
  user: any;


  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _uService: UserService, public flashMessage: FlashMessagesService) {
  }


  ngOnInit() {
    this.id = this._route.snapshot.params['id'];

    this._uService.getUserDetails(this.id).subscribe(user => {
      this.user = user;
    });
  }


  deleteDialog() {

    this.popup1.options = {
      header: "Delete user",
      color: "#000000", // red, blue....
      widthProsentage: 40, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: "Delete", // The text on your confirm button
      cancleBtnContent: "Cancel", // the text on your cancel button
      confirmBtnClass: "btn btn-danger", // your class for styling the confirm button
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button
      animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };

    this.popup1.show(this.popup1.options);

  }


  onBack(): void {
    this._router.navigate(['/users']);
  }

  onDeleteClick() {
    this._uService.deleteUser(this.id);
    this._router.navigate(['/users']);
    this.flashMessage.show('User deleted', {cssClass: 'alert-success', timeout: 3000});
  }

}
