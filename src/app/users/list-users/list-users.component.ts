import {Component, OnInit} from '@angular/core';
import {UserService} from '../../admin/adminShared/user.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users;
  id: any;
  filterBy: string = 'all';
  listFilter: string;
  theUser: string;
  userImage: string;
  tabs: boolean;
  nrOfUsers;
  selectedItem;
  currentUser: any;
  currentuseEntity;
  entities: any;
  entitiesName;
  // promotedEntities: any = [];
  joinedEntities: any = [];
  userEntityName;

  // subscrubes
  sub1;
  sub2;
  sub3;


  constructor(private _uService: UserService, public flashMessage: FlashMessagesService, private router: Router) {


    // set users
    this.sub1 = this._uService.users.subscribe(users => {
      this.users = users;
    });


  } // constructor

  ngOnInit() {
// Get initial info
    this.theUser = this._uService.loggedInUserDisplayName;
    this.userImage = this._uService.userImage;
    this.tabs = this._uService.userLoggedIn;


    // Get EntitiesName for dropdown
    this.sub2 = this._uService.getAdminEntities().subscribe(entities => {
      this.entities = entities;
    });





    /*
     // Get JoinedEntitiesNames for dropdown
     this._uService.getJoinedEntities().subscribe(joinedEntities => {
     let joinedEntitiess = joinedEntities;
     for (let i = 0; i < joinedEntities.length; i++) {
     if (joinedEntities[i].adminAccess === true) {
     this.promotedEntities = joinedEntities[i];
     }
     }
     });
     */


    // Get currentUser Entity (ID) for set default selectOption return a promise
    this._uService.getCurrentUserEntity().then(user => {
      this.currentUser = user;
      this.userEntityName = this.currentUser.entityName;
      this._uService.userSubject.next(this.currentUser.entity);
    });  // get User EntityID


    /*
     // Get all users
     this._uService.getUsers().subscribe(users => {
     this.users = users;
     });

     // Get all Entitys for dropdown option
     this._uService.getEntities().subscribe(entities => {
     this.entities = entities;
     this.entitiesName = this.entities.entityName;
     });

     // Receive a promise
     this._uService.nrOfUsers().then(nr => {
     this.nrOfUsers = nr;
     });
     */
  } // ngOnInit


  // Dropdown Click
  onclickedValue(entityId) {
    if (entityId.$key) {
      //  console.log('clicke value in if is: ' + entityId.$key);
      this._uService.userSubject.next(entityId.$key);
    } else {
      //  console.log('clicke value is: ' + entityId.entity);
      this._uService.userSubject.next(entityId.entity);
    }
  }

  redirect(param) {
    this.unSubscribeAll();
    if (param === '') {
      this.router.navigate([param]);  // item
    } else if (param === 'entities') {
      this.router.navigate([param]); // 'entities'
    } else {
      return; // on currentPage do noting
    }
  }

  unSubscribeAll() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  logout() {
    this.unSubscribeAll();
    this._uService.logout();
    this.flashMessage.show('Signed out', {cssClass: 'alert-success', timeout: 3000});
  }


}
