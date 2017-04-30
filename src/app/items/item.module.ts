import {NgModule} from '@angular/core';
import {ItemListComponent} from './item-list.component';
import {ItemDetailComponent} from './item-detail.component';
import {ItemFilterPipe} from './item-filter.pipe';
import {RouterModule, Routes} from '@angular/router';
import {ItemDetailGuard} from './item-guard.service';
import {ItemService} from './item.service';
import {UserService} from './user.service';
import {AdminComponent} from './admin.component';
import {SharedModule} from '../shared/shared.module';



const AdminRoutes: Routes = [
    {
        path: 'items',
        component: AdminComponent,
        children: [
          {path: 'items', component: ItemListComponent},
          {path: 'item/:id', canActivate: [ ItemDetailGuard ], component: ItemDetailComponent},
            { path: '', component: ItemListComponent, canActivate: [UserService] },
        ]
    },
];

@NgModule({
    declarations: [
        ItemListComponent,
        ItemDetailComponent,
        ItemFilterPipe,
        AdminComponent
    ],
    imports: [
      SharedModule,
          RouterModule.forChild(AdminRoutes)
        ],
    providers: [
        ItemService,
        ItemDetailGuard,
        UserService
    ]
})
export class ItemModule {}
