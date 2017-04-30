import {Component} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {ItemService} from './items/item.service';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html',
    providers: [ItemService]
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  title = 'app works!';

  constructor(af: AngularFire) {
    this.items = af.database.list('settings/0');
  }

}
