import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../admin/adminShared/user.service';
import {AngularFire} from 'angularfire2';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Popup} from 'ng2-opd-popup';
import {CropperSettings} from 'ng2-img-cropper';
import {IUser} from '../users/user';
import {current} from 'codelyzer/util/syntaxKind';
// import {CropperSettings} from 'ng2-img-cropper';
@Component({
  moduleId: module.id, // can now use realtive path (omit app/pages..)
  templateUrl: 'item-list.component.html',
  styleUrls: ['item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @ViewChild('popup1') popup1: Popup;
  pageTitle: string = 'Borrowing Admin panel';
  items;
  entities: any;
  currentEntityName;
  joinedEntities: any = [];
  theUser: string;
  tabs: boolean;
  userImage: string;
  id: any;
  filterBy: string = 'all';
  listFilter: string;          // Set deafult search here
  nrOfItem;
  changingImage: boolean;
  data: any;
  cropperSettings: CropperSettings;
  userEntityName;


  // add
  name;
  description;
  entity;
  entityName;
  entitiesName;
  currentUser: any;
  selectedItem;
  selectedItemAdd;
  reservationDays = 3;
  selectDefault;
  selectTempEntityName;

  // join interface
  adminAccess;

  constructor(public af: AngularFire, private _uService: UserService, public flashMessage: FlashMessagesService) {


    // Subscribe for item changes
    this._uService.items.subscribe(items => {
      this.items = items;
    });


    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 50;
    this.cropperSettings.height = 50;
    this.cropperSettings.croppedWidth = 128;
    this.cropperSettings.croppedHeight = 128;
    this.cropperSettings.canvasWidth = 350;
    this.cropperSettings.canvasHeight = 280;
    this.data = {};
  }  // constructor

  ngOnInit() {



// Get initial info
    this.theUser = this._uService.loggedInUserDisplayName;
    this.tabs = this._uService.userLoggedIn;
    this.userImage = this._uService.userImage;


    // Get EntitiesNames for dropdown
    this._uService.getAdminEntities().subscribe(entities => {
      this.entities = entities;
    });

    // Get JoinedEntitiesNames for dropdown
    this._uService.getJoinedentities().then(joinedEntities => {
      this.joinedEntities = joinedEntities;
    });


    // Get currentUser Entity (ID) for set default selectOption return a promise
    this._uService.getCurrentUserEntity().then(user => {
      this.currentUser = user;
      this.userEntityName = this.currentUser.entityName;
      this._uService.entitySubject.next(this.currentUser.entity);
    });  // get User EntityID


    /*
     // Get all Entitys for dropdown option
     this._uService.getEntities().subscribe(entities => {
     this.entities = entities;
     this.entitiesName = this.entities.entityName;
     });
     */


    /*
     // get all items
     this._uService.getItems().subscribe(items => {
     this.items = items;
     });




     // Receive a promise with nrOfItems
     this._uService.nrOfItems().then(nr => {
     this.nrOfItem = nr;
     });
     */


  } // ngInit


// Dropdown Click
  onclickedValue(entityId) {
    if (entityId.$key) {
      this._uService.entitySubject.next(entityId.$key);
    } else {
      this._uService.entitySubject.next(entityId.entity);
    }
  }

  onClickEntityPopup() {
    this.selectDefault = this.selectedItemAdd.$key;
    this.selectTempEntityName = this.selectedItemAdd.$key;
console.log('selected value is: ' + this.selectDefault);

  }


  addDialog() {
    this.popup1.options = {
      header: 'Add item',
      color: '#green', // red, blue....
      widthProsentage: 40, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: 'Save', // The text on your confirm button
      cancleBtnContent: 'Cancel', // the text on your cancel button
      confirmBtnClass: 'btn btn-success glyphicon glyphicon-plus', // your class for styling the confirm button
      cancleBtnClass: 'btn btn-default', // you class for styling the cancel button
      animation: 'bounceInDown' // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };

    // set default entry for popup form
    this.selectDefault = this.currentUser.entity;
    this.selectTempEntityName = this.userEntityName;
    this.popup1.show(this.popup1.options);
  }

  onAddSubmit() {
     let item = {
     description: this.description,
     entity: this.selectDefault,
     entityName: this.selectTempEntityName,
     name: this.name,
     reservationDays: this.reservationDays,
     status: 'Available',
     photoURL: this.data
     };
     this._uService.addItem(item);
  } // onSubmitt


// Change cropped image
  onChangingImageClick() {
    this.changingImage = !this.changingImage;
  }


  logout() {
    this._uService.logout();
    this.flashMessage.show('Signed out', {cssClass: 'alert-success', timeout: 3000});
  }

} // class
