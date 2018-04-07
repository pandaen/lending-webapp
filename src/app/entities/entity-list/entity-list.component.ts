import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {UserService} from '../../admin/adminShared/user.service';
import {EntityListNestComponent} from '../entity-list-nest/entity-list-nest.component';

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
  joinedlib: any = [];
  selectedLibrary: any;
  entitiesName;

  joinedEntities: any = [];
  userEntityName: any;

  // subscrubes
  sub1;
  sub2;
  sub3;
  sub4;

  constructor(private _uService: UserService, public flashMessage: FlashMessagesService, private router: Router) {
  }

  ngOnInit() {
    // Get initial info
    this.theUser = this._uService.loggedInUserDisplayName;
    this.userImage = this._uService.userImage;
    this.tabs = this._uService.userLoggedIn;


    // Get owned library for table
    this.sub2 = this._uService.getAdminEntities().subscribe(entities => {
      this.entities = entities;
    });

// Get Joined library for table
    this.sub1 = this._uService.getJoinedLibrarys().subscribe(joinedlib => {
      this.joinedlib = joinedlib;
    });

  /* TESTING GET SELECTED LIBRARY
    this._uService.getSelectedLibrary('-KrGhtbAc_2de81voCzc').then(selectedLibrary => {
      this.selectedLibrary = selectedLibrary;
      console.log('getselectedLibrrunned is: ' + JSON.stringify(selectedLibrary, null, ''));
    });
*/
  /*  // Get JoinedEntitiesNames for table & dropdown (NOT IN USE )
    this._uService.getJoinedEntities().subscribe(jEntities => {
      this.joinedEntities = jEntities;

    });
*/
     // currren library title text & set currentLibrary Text
   this.sub3 = this._uService.getCurrentUserLibrary().subscribe(snapshots => {
      this.userEntityName = snapshots.val();
    });


  } // ngOnINit



  onGrantedClicked(grantLibID: string): void {
   this.sub4 = this._uService.getSelectedLibrary(grantLibID).subscribe(selectedLib => {
      this.selectedLibrary = selectedLib;
    });
  }

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
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    if(typeof this.sub4 !== "undefined") {
    this.sub4.unsubscribe();
    }
  }


  logout() {
    this.unSubscribeAll();
    this._uService.logout();
    this.flashMessage.show('Signed out', {cssClass: 'alert-success', timeout: 3000});
  }

  createEntity() {

  }

} // class
