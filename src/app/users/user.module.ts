import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';

import {UserService} from '../admin/adminShared/user.service';
import {SharedModule} from '../shared/shared.module';

import {EditUserComponent} from './edit-user/edit-user.component';
import {ListUsersComponent} from './list-users/list-users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {UserFilterPipe} from './user-filter.pipe';
import {UserListNestComponent} from './user-list-nest/user-list-nest.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'user', component: ListUsersComponent},
      {path: 'user/:id', component: UserDetailComponent},
      {path: 'edit-user/:id', component: EditUserComponent}
    ])
  ],
  declarations: [
    ListUsersComponent,
    UserFilterPipe,
    EditUserComponent,
    UserDetailComponent,
    UserListNestComponent,
  ],
  providers: [
    UserService
  ]
})
export class UserModule {
}
