import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../admin/adminShared/user.service';
import {Location} from '@angular/common';
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  pageTitle: string = 'Add item';
  name: any;
  dueDate: any;
  entity: any;
  updateEntity: any;
  status: any;
  description: any;
  image: any;
  tabs: boolean;

  constructor(private _uService: UserService, private router: Router, private _location: Location, public flashMessage: FlashMessagesService) {
  }


  ngOnInit() {
    this.tabs = this._uService.userLoggedIn;
  }


  onAddSubmit() {

  }

  logout() {
    this._uService.logout();
    this.flashMessage.show('Signed out', {cssClass: 'alert-success', timeout: 3000});
  }


  onBack(): void {
    this._location.back();
  }
}
