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


//  Firebase Settings
export const firebaseConfig = {
  apiKey: 'AIzaSyAHfCQArz_9VdSVJ0rGhaEMYeZuv8JJCIY',
  authDomain: 'borrowing-app.firebaseapp.com',
  databaseURL: 'https://borrowing-app.firebaseio.com',
  storageBucket: 'borrowing-app.appspot.com',
  messagingSenderId: '226399216748'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Popup
};

@NgModule({
  imports: [
    BrowserModule,
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
