import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {IUser} from '../user';
import {Router} from '@angular/router';
import {UserService} from '../../admin/adminShared/user.service';

@Component({
  selector: 'app-user-list-nest',
  templateUrl: './user-list-nest.component.html',
  styleUrls: ['./user-list-nest.component.css']
})
export class UserListNestComponent implements OnChanges, OnDestroy {
  @Input() users: IUser[];
  @Input() filterBy: string;
  @Input() listFilter: string;
  visibleUsers: IUser[] = [];
  currentRow: Number;
  nrOfUsers;
  selectedUser;
  showDialog: boolean;
  lendingItems;
  userUID;

items;
  sub1;
  // imageWidth: number = 50;
  // imageMargin: number = 20;


  constructor(private _uService: UserService, private _router: Router) {

    // set current item for user
    this._uService.getCurrentUserEntity().then(user => {
      this._uService.entitySubject.next(user['entity']);
    });


    // get item for later filterBy
    this.sub1 = this._uService.items.subscribe(items => {
      this.lendingItems = items;
    });


  } // constructor

  ngOnChanges() {
    if (this.users) {
      this.filterUsers(this.filterBy);
      this.nrOfUsers = this.visibleUsers.length;
    }
  }


  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  filterUsers(filter) {

    switch (filter) {
      case 'all':
        this.visibleUsers = this.users.slice(0);
        break;
      case 'users':
        this.visibleUsers = this.users.filter(users => {
          return users.adminAccess == null;
        });
        break;
      case 'admin':
        this.visibleUsers = this.users.filter(users => {
          return users.adminAccess != null;
        });
        break;
    }
  }

  setClickedRow(index, user) {
    this.currentRow = index;
    this.selectedUser = user;
   // this._uService.lendingSubject.next(this.selectedUser['userUid']);
   this.userUID = this.selectedUser['userUid'];
    /* email spliter at @
     const res = userName.split("@");
     const str = res[0];
     */
    this.showDialog = !this.showDialog;
  }


} // class
