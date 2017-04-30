import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {ItemModule} from './items/item.module';
import {AppRoutingModule} from "./shared/app.routing";
import {ErrorComponent} from "./error/error.component";
//  Firebase Settings
export const firebaseConfig = {
  apiKey: 'AIzaSyAHfCQArz_9VdSVJ0rGhaEMYeZuv8JJCIY',
  authDomain: 'borrowing-app.firebaseapp.com',
  databaseURL: 'https://borrowing-app.firebaseio.com',
  storageBucket: 'borrowing-app.appspot.com',
  messagingSenderId: '226399216748'
};


@NgModule({
  imports: [
    BrowserModule,
    ItemModule, // must be before approtuing
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)],
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
