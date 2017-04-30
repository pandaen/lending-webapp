
/*
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from '../items/admin.component';
import {UserService} from './adminShared/user.service';
import {LoginComponent} from '../home/login.component';
import {ItemListComponent} from '../items/item-list.component';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';

const AdminRoutes: Routes = [
  {
   path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: '', component: ItemListComponent, canActivate: [UserService]}
    ]
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(AdminRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AdminComponent,
    LoginComponent
  ],
  providers: [
    UserService,
  ]
})
export class AdminModule { }
*/
