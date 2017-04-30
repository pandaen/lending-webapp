import {RouterModule} from '@angular/router';
import {LoginComponent} from '../home/login.component';
import {NgModule} from '@angular/core';
import {ItemListComponent} from '../items/item-list.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'items', component: ItemListComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'items', pathMatch: 'full'}, // default
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
    // {path: '**', component: ErrorComponent}  // no match (404 page not found)
  ])
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
