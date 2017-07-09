import {Component, Input, OnChanges} from '@angular/core';
import {IUser} from '../user';
import {Router} from '@angular/router';

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
  // imageWidth: number = 50;
  // imageMargin: number = 20;


  constructor(private _router: Router) {
  }

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

  setClickedRow(index, id) {
    this.currentRow = index;
  //  this._router.navigate(['/user/' + id]);
    console.log('clicked row with id ' +id);
  }

}
