import {Component} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {ItemService} from './items/item.service';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  template: `
    <div>
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <a class="navbar-brand">{{title}}</a>
          <ul class="nav navbar-nav">
            <li><a [routerLink]="['/login']">Login</a></li>
            <li><a [routerLink]="['/items']">Item List</a></li>
          </ul>
        </div>
      </nav>
      <ul>
        <li class="text" *ngFor="let item of items | async">
          {{item.$value}}
        </li>
      </ul>
      <div class='container'>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
    providers: [ItemService]
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  title = 'app works!';

  constructor(af: AngularFire) {
    this.items = af.database.list('settings/0');
  }

}
