import {Component, Input, OnChanges} from '@angular/core';
import {IUser} from '../user';
import {Router} from '@angular/router';
import {UserService} from '../../admin/adminShared/user.service';

@Component({
  selector: 'app-user-list-nest',
  templateUrl: './user-list-nest.component.html',
  styleUrls: ['./user-list-nest.component.css']
})
export class UserListNestComponent implements OnChanges {
  @Input() users: IUser[];
  @Input() filterBy: string;
  @Input() listFilter: string;
  visibleUsers: IUser[] = [];
  currentRow: Number;
  nrOfUsers;
  sendID;
  sendName;
  showDialog: boolean;
  lendingItems;
  // imageWidth: number = 50;
  // imageMargin: number = 20;


  constructor(private _uService: UserService,private _router: Router) {

    // set lending items by a user
     this._uService.lendingItems.subscribe(lending => {
      this.lendingItems = lending;
    });
  } // constructor

  ngOnChanges() {
    if (this.users) {
      this.filterUsers(this.filterBy);
      this.nrOfUsers = this.visibleUsers.length;
    }
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

  setClickedRow(index, id,userName) {
    this.currentRow = index;
    this.sendID = id;
    this._uService.lendingSubject.next(this.sendID);

    const res = userName.split("@");
    const str = res[0]
    this.sendName = str;
    this.showDialog = !this.showDialog;
  }

}
