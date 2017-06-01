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
  reservationDays;

  // join interface
  adminAccess;

  constructor(public af: AngularFire, private _uService: UserService, public flashMessage: FlashMessagesService) {

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


    // Get EntitiesName for dropdown
    this._uService.getAdminEntities().subscribe(entities => {
      this.entities = entities;
    });

    // Get JoinedEntitiesName for dorpdown
    this._uService.getJoinedentities().then(joinedEntities => {
      this.joinedEntities = joinedEntities;
      console.log('joined has AdminAccess: ' + this.joinedEntities[0]['entityName']);
    });



      // Get currentUser Entity (ID) for set default selectOption return a promise
         this._uService.getCurrentUserEntity().then(user => {
         this.currentUser = user;
         this.userEntityName = this.currentUser.entityName;
         console.log('currentUser entityName is: ' + this.userEntityName);



         // Get  items that is in your entity for tabel
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
      console.log('clicke value in if is: ' + entityId.$key);
      this._uService.entitySubject.next(entityId.$key);
    } else {
      console.log('clicke value is: ' + entityId.entity);
      this._uService.entitySubject.next(entityId.entity);
    }
  }


  addDialog() {
    this.popup1.options = {
      header: 'Add item',
      color: 'green', // red, blue....
      widthProsentage: 40, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: 'Save', // The text on your confirm button
      cancleBtnContent: 'Cancel', // the text on your cancel button
      confirmBtnClass: 'btn btn-success glyphicon glyphicon-plus', // your class for styling the confirm button
      cancleBtnClass: 'btn btn-default', // you class for styling the cancel button
      animation: 'bounceInDown' // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };

    this.popup1.show(this.popup1.options);
  }

  onAddSubmit() {
    console.log('Item added successful!');
    console.log('this.description' + this.description);


    /*
     let item = {
     description: 'Picture test',
     entity: this.selectedItem.$key,
     entityName: this.selectedItem.entity,
     name: 'Usb',
     reservationDays: '3',
     status: 'Available',
     photoURL: this.data
     };

     this._uService.addItem(item);
     */
// this._uService.uploadPhoto('null',this.data.image.split(/,(.+)/)[1]);
  }

  getEntityName() {
    return this.currentUser.entityName;
  }

// Change cropped image
  onChangingImageClick() {
    this.changingImage = !this.changingImage;
  }


  logout() {
    this._uService.logout();
    this.flashMessage.show('Signed out', {cssClass: 'alert-success', timeout: 3000});
  }

} // class
