import {RouterModule} from '@angular/router';
 import { LoginComponent} from '../home/login.component';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [ RouterModule.forRoot([
            {path: 'login', component: LoginComponent },
            {path: '', redirectTo: 'login', pathMatch: 'full'}, // default
            {path: '**', redirectTo: 'login', pathMatch: 'full'}
        // {path: '**', component: ErrorComponent}  // no match (404 page not found)
    ])
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class AppRoutingModule {}
