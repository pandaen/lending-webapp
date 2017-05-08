import {RouterModule} from '@angular/router';
import {LoginComponent} from '../home/login.component';
import {NgModule} from '@angular/core';
import {ItemListComponent} from '../items/item-list.component';
import {ErrorComponent} from '../error/error.component';
import {NoAdminComponent} from "../error/no-admin/no-admin.component";

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'items', component: ItemListComponent},
    {path: '', redirectTo: 'items', pathMatch: 'full'},  // default
    {path: 'noAdmin', component: NoAdminComponent},  // default
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
