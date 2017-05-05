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
  pageTitle: string = 'Item Detail';
  //  item: IItem;
  id: any;
  item: any;
  imageUrl: any;

  errorMessage: string;
  private sub: Subscription;

  constructor(private _route: ActivatedRoute, private _router: Router, private _uService: UserService, public flashMessage: FlashMessagesService) {
  }

  // Sets items
  ngOnInit(): void {

    this.id = this._route.snapshot.params['id'];

    this._uService.getItemDetails(this.id).subscribe(item => {
      this.item = item;


      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(this.item.path);
      storageRef.child(this.item.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageUrl = url;
      }).catch((error) => {
        console.log(error);
      });
    });

  }

  onBack(): void {
    this._router.navigate(['/items']);
  }

  onDeleteClick() {
    console.log("Deleted item!")
    this._uService.deleteItem(this.id);
    this._router.navigate(['/items']);
    this.flashMessage.show('Item deleted', {cssClass: 'alert-success', timeout: 3000});
  }

} // class
