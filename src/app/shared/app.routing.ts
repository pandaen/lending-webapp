import {RouterModule} from '@angular/router';
import {LoginComponent} from '../home/login.component';
import {NgModule} from '@angular/core';
import {ItemListComponent} from '../items/item-list.component';
import {ErrorComponent} from '../error/error.component';
import {NoAdminComponent} from "../error/no-admin/no-admin.component";
import {ListUsersComponent} from "../users/list-users/list-users.component";

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'items', component: ItemListComponent},
    {path: 'noAdmin', component: NoAdminComponent},
    {path: 'listUsers', component: ListUsersComponent},
    {path: '', redirectTo: 'items', pathMatch: 'full'},  // default
     {path: '**', component: ErrorComponent}  // no match
  ])
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
