import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ErrorComponent} from '../error/error.component';
import {NoAdminComponent} from '../error/no-admin/no-admin.component';
import {ItemListComponent} from '../items/item-list.component';
@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'noAdmin', component: NoAdminComponent},
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
