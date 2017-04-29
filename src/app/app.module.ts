import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AngularFireModule} from "angularfire2";
//  Firebase Settings
export const firebaseConfig = {
  apiKey: 'AIzaSyAHfCQArz_9VdSVJ0rGhaEMYeZuv8JJCIY',
  authDomain: 'borrowing-app.firebaseapp.com',
  databaseURL: 'https://borrowing-app.firebaseio.com',
  storageBucket: 'borrowing-app.appspot.com',
  messagingSenderId: '226399216748'
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
