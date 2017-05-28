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
  dummyItems: IItem[] = [];
  dummyFilter: string = 'Notify';
  imageWidth: number = 50;
  imageMargin: number = 2;
  item: any;
  currentRow: Number;
  imageUrl: any;


  constructor(private _uService: UserService, private _router: Router) { }

  ngOnChanges() {
    console.log('ngOnChanges runned');
    if (this.items) {
      this.notifyUserCheck();
      this.filterItems(this.filterBy);
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
     console.log('Overskrev item' + items);
     }
     console.log('all notify user is: ' + diffDays);
     }
     console.log('all loans is: ' + diffDays);
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
          return items.status.toLocaleLowerCase() === 'available';
        });
        break;
      case 'out':
        this.visibleItems = this.items.filter(items => {
          return items.status.toLocaleLowerCase() === 'out';
        });
        break;
      case 'notify':
        this.visibleItems = this.items.filter(items => {
          return items.status.toLocaleLowerCase() === 'notify';
        });
        break;

    }  // switch

  } // filterItem


  /*
   getItemPhoto(id)
   {
   this._uService.getItemDetails(id).subscribe(item => {
   this.item = item;
   let storageRef = firebase.storage().ref();
   let spaceRef = storageRef.child(this.item.path);
   storageRef.child(item.path).getDownloadURL().then((url) => {
   // Set image url
   console.log('imgUrl is: ' + url);
   return this.imageUrl = url;
   }).catch((error) => {
   console.log(error);
   });
   });
   }
   */

  setClickedRow(index, id) {
    this.currentRow = index;
    this._router.navigate(['/item/' + id]);
  }


} // class


