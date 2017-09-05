import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {UserService} from '../../admin/adminShared/user.service';

@Component({
  selector: 'app-entity-list',
templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {
  users;
  id: any;
  filterBy: string = 'all';
  listFilter: string;
  theUser: string;
  userImage: string;
  tabs: boolean;

  nrOfEntities;
  selectedItem;
  currentUser: any;
  currentuseEntity;
  entities: any = [];
  entitiesName;

  joinedEntities: any = [];
  userEntityName: any;

  // subscrubes
  sub1;
  sub2;
  sub3;

  constructor(private _uService: UserService, public flashMessage: FlashMessagesService, private router: Router) {
  }

  ngOnInit() {
    // Get initial info
    this.theUser = this._uService.loggedInUserDisplayName;
    this.userImage = this._uService.userImage;
    this.tabs = this._uService.userLoggedIn;


    // Get EntitiesName for table & dropdown
    this.sub2 = this._uService.getAdminEntities().subscribe(entities => {
      this.entities = entities;
    });


  /*  // Get JoinedEntitiesNames for table & dropdown (NOT IN USE )
    this._uService.getJoinedEntities().subscribe(jEntities => {
      this.joinedEntities = jEntities;

    });
*/
    // get Current user library
    this._uService.getCurrentUserLibrary().subscribe(snapshots => {
      this.userEntityName = snapshots.val();
    });


  } // ngOnINit


  redirect(param) {
      this.unSubscribeAll();
    if (param === '') {
      this.router.navigate(['']);  // goto item
    } else if (param === 'users') {
      this.router.navigate([param]); // goto users
    } else {
      return; // on currentPage do noting
    }
  }


  unSubscribeAll() {
    this.sub2.unsubscribe();
  }


  logout() {
    this.unSubscribeAll();
    this._uService.logout();
    this.flashMessage.show('Signed out', {cssClass: 'alert-success', timeout: 3000});
  }

  createEntity() {

  }

} // class
