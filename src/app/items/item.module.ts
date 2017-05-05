import {NgModule} from '@angular/core';
import {ItemListComponent} from './item-list.component';
import {ItemDetailComponent} from './item-detail.component';
import {ItemFilterPipe} from './item-filter.pipe';
import {RouterModule, Routes} from '@angular/router';
import {ItemDetailGuard} from './item-guard.service';
import {UserService} from '../admin/adminShared/user.service';
import {AdminComponent} from './admin.component';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from '../home/login.component';
import { AddItemComponent } from './add-item/add-item.component';


const AdminRoutes: Routes = [
  {
    path: 'items',
    component: AdminComponent,
    children: [
      {path: '', component: ItemListComponent, canActivate: [UserService]},
      {path: 'item', component: ItemListComponent},
      {path: 'item/:id', component: ItemDetailComponent},
      {path: 'add', component: AddItemComponent},
      {path: 'login', component: LoginComponent},
    ]
  },
];

@NgModule({
  declarations: [
    ItemListComponent,
    ItemDetailComponent,
    ItemFilterPipe,
    AdminComponent,
    LoginComponent,
    AddItemComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(AdminRoutes)
  ],
  providers: [
    ItemDetailGuard,
    UserService
  ]
})
export class ItemModule {
}
