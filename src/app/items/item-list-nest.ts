import {Component, Input, OnChanges} from '@angular/core';
import {IItem} from './item';
import {UserService} from '../admin/adminShared/user.service';
@Component({
  moduleId: module.id, // can now use realtive path (omit app/pages..)
  selector: 'app-item-list-nest',
  templateUrl: 'item-list-nest.html',
  styleUrls: ['item-list-nest.css']
})
export class ItemListNestComponent implements OnChanges {
  @Input() items: IItem[];
  @Input() filterBy: string;
  @Input() listFilter: string;
  visibleItems: IItem[] = [];
  imageWidth: number = 50;
  imageMargin: number = 2;
  item: any;
  imageUrl: any;

  constructor( private _uService: UserService) { }

  ngOnChanges() {
    if (this.items) {
      this.filterItems(this.filterBy);
    }
  }


  filterItems(filter) {
      if (filter === 'all') {
      this.visibleItems = this.items.slice(0);
    } else {
      this.visibleItems = this.items.filter(items => {
        return items.status.toLocaleLowerCase() === filter;
      });
    } // else
  }

  getItemPhoto(id) {
    this._uService.getItemDetails(id).subscribe(item => {
      this.item = item;
      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(this.item.path);
      storageRef.child(item.path).getDownloadURL().then((url) => {
        // Set image url
        console.log('imgUrl is: ' + url);
        return   this.imageUrl = url;
      }).catch((error) => {
        console.log(error);
      });
    });
  }

}

