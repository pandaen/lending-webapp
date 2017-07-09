import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../admin/adminShared/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  pageTitle: string = 'Edit user';
  fullname;
  id;
  email;
  entityName;
  isAdmin;



  constructor(private _uService: UserService, private _router: Router, private _route: ActivatedRoute, private _location: Location) { }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];

    this._uService.getUserDetails(this.id).subscribe(user => {
      this.fullname = user.fullname;
      this.email = user.email;
      this.entityName = user.entityName;
      this.isAdmin = user.isAdmin;
    });
  }

  onEditSubmit() {
    console.log('Submited user data');
    let user = {
      fullname: this.fullname,
      email: this.email,
      entityName: this.entityName,
      isAdmin: this.isAdmin
    }
    this._uService.updateUser(this.id, user);
    this._router.navigate(['/users']);
  }

  onBack(): void {
    this._location.back();
  }


}
