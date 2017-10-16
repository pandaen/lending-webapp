import {Component, Input, OnChanges} from '@angular/core';
import {IItem} from './item';
import {UserService} from '../admin/adminShared/user.service';
import {Router} from '@angular/router';


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
  nrOfItem;

  currentRow: Number;
  sendID;
  // toggle itemDialog switch
  showDialog: boolean;

  constructor(private _uService: UserService, private _router: Router) {
  }

  ngOnChanges() {
    if (this.items) {
      this.notifyUserCheck();
      this.filterItems(this.filterBy);
    this.nrOfItem = this.visibleItems.length;
    }
  }


  notifyUserCheck() {
    this.items.filter(items => {
      if (items.loan) {
        let ms = items.loan['timeInMillis'];

        let notify: string;
        let currentDate = new Date();
        currentDate.setHours(0o0, 0o0);
        let oneDay = 24 * 60 * 60 * 1000;
        let diffDays = Math.ceil((ms - currentDate.getTime()) / (oneDay));
        let returnText = 'none';

        if (diffDays < 0) {
          if (!(items.status === 'Notify')) {
            this._uService.writeNotify(items.$key);
          }
        }
      } // if itemLoan
    });
  }  // userNotify


  filterItems(filter) {
    switch (filter) {
      case 'all':
        this.visibleItems = this.items.slice(0);
        break;
      case 'available':
        this.visibleItems = this.items.filter(items => {
        //  console.log('visible item avalible is: ' + this.visibleItems.length);
          return items.status.toLocaleLowerCase() === 'available';
        });
        break;
      case 'out':
        this.visibleItems = this.items.filter(items => {
          return items.status.toLocaleLowerCase() === 'out';
        });
        break;
        case 'reserved':
        this.visibleItems = this.items.filter(items => {
          return items.reserved != null;
        });
        break;
      case 'notify':
        this.visibleItems = this.items.filter(items => {
          return items.status.toLocaleLowerCase() === 'notify';
        });
        break;

    }  // switch

  } // filterItem

  setClickedRow(index, id) {
    this.currentRow = index;
this.sendID = id;
    this.showDialog = !this.showDialog;
  // this._router.navigate(['/item/' + id]);

  }


} // class


