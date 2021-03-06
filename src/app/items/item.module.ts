import {NgModule} from '@angular/core';
import {ItemListComponent} from './item-list.component';
import {ItemFilterPipe} from './item-filter.pipe';
import {RouterModule, Routes} from '@angular/router';
import {ItemDetailGuard} from './item-guard.service';
import {UserService} from '../admin/adminShared/user.service';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from '../home/login.component';
import {AddItemComponent} from './add-item/add-item.component';
// import {EditItemComponent} from './edit-item/edit-item.component';
import {ItemListNestComponent} from './item-list-nest';
import {ListUsersComponent} from '../users/list-users/list-users.component';
import {UserDetailComponent} from '../users/user-detail/user-detail.component';
import {EditUserComponent} from '../users/edit-user/edit-user.component';
import {UserListNestComponent} from '../users/user-list-nest/user-list-nest.component';
import {UserFilterPipe} from '../users/user-filter.pipe';
import {PopupModule} from 'ng2-opd-popup';
import {EntityListComponent} from '../entities/entity-list/entity-list.component';
import {EntityListNestComponent} from '../entities/entity-list-nest/entity-list-nest.component';
import {EntityFilterPipe} from '../entities/entity-filter.pipe';
import {AddEntityDialogComponent} from '../entities/addEntityDialog/add-entity-modal';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';

import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import {EmailLoginDialogComponent} from '../home/emailLoginDialog/email-login-dialog/email-login-dialog.component';
import {ImageCropperComponent} from 'ng2-img-cropper';
import {LibraryDialogComponent} from '../entities/library-dialog/library-dialog.component';
import {UserDialogComponent} from '../users/user-dialog/user-dialog.component';

/*
 const AdminRoutes: Routes = [
 {
 path: 'items',
 children: [
 {path: '', component: ItemListComponent, canActivate: [UserService]},
 {path: 'item', component: ItemListComponent},
 {path: 'item/:id', component: ItemDetailComponent},
 {path: 'add', component: AddItemComponent},
 {path: 'login', component: LoginComponent},
 {path: 'edit-item/:id', component: EditItemComponent}
 ]
 },
 ];
 */


const routes: Routes = [
  {
    path: '',
    canActivate: [UserService],
    children: [
      {path: '', component: ItemListComponent},
      {path: 'item', component: ItemListComponent},
      {path: 'add', component: AddItemComponent},

      {path: 'users', component: ListUsersComponent},
      {path: 'user/:id', component: UserDetailComponent},
      {path: 'edit-user/:id', component: EditUserComponent},

      {path: 'entities', component: EntityListComponent}

    ]
  },
  {path: 'login', component: LoginComponent}
];


@NgModule({
  declarations: [
    AddEntityDialogComponent,
    ImageCropperComponent,
    ItemListComponent,
    LoginComponent,
    AddItemComponent,
    ItemListNestComponent,
    ListUsersComponent,
    UserFilterPipe,
    ItemFilterPipe,
    EntityFilterPipe,
    EditUserComponent,
    UserDetailComponent,
    UserListNestComponent,
    EntityListComponent,
    EntityListNestComponent,
    ItemDialogComponent,
    EmailLoginDialogComponent,
    LibraryDialogComponent,
    UserDialogComponent,
  ],
  imports: [
    SharedModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    MultiselectDropdownModule,
    PopupModule.forRoot(),

    /*  RouterModule.forChild([
     {path: '', component: ItemListComponent, canActivate: [UserService]},
     {path: 'items', component: ItemListComponent},
     {path: 'item/:id', component: ItemDetailComponent},
     {path: 'add', component: AddItemComponent},
     {path: 'login', component: LoginComponent},
     {path: 'edit-item/:id', component: EditItemComponent}
     ])*/
    RouterModule.forChild(routes)
  ],
  providers: [
    ItemDetailGuard,
    UserService,
  ]
})
export class ItemModule {
}
