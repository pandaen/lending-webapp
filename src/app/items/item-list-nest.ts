import {Component, Input, OnChanges} from '@angular/core';
import {IItem} from './item';
@Component({
  moduleId: module.id, // can now use realtive path (omit app/pages..)
  selector: 'app-item-list-nest',
  templateUrl: 'item-list-nest.html'
})
export class ItemListNestComponent implements OnChanges {
  @Input() items: IItem[];
  @Input() filterBy: string;
  @Input() listFilter: string;
  visibleItems: IItem[] = [];
  imageWidth: number = 50;
  imageMargin: number = 2;



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

}

