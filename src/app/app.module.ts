import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFireModule, AuthMethods, AuthProviders} from 'angularfire2';
import {ItemModule} from './items/item.module';
import {AppRoutingModule} from './shared/app.routing';
import {ErrorComponent} from './error/error.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {NoAdminComponent} from './error/no-admin/no-admin.component';

// Modal dialog
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlashMessagesModule,
    ItemModule, // must be before approtuing
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)],
  declarations: [
    AppComponent,
    ErrorComponent,
    NavbarComponent,
    NoAdminComponent,
  ],
  bootstrap: [AppComponent],

  // Modal window is declared here, because its not explicitly used (in a template)
 // entryComponents: [ AddLibraryModal ]
})
export class AppModule { }
