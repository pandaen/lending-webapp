import {RouterModule} from '@angular/router';
import {LoginComponent} from '../home/login.component';
import {NgModule} from '@angular/core';
import {ItemListComponent} from '../items/item-list.component';
import {ErrorComponent} from '../error/error.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'items', component: ItemListComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'items', pathMatch: 'full'}, // default
    {path: '**', component: ErrorComponent}
  ])
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
