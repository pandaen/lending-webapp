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
  currentRow: Number;
  imageUrl: any;





  constructor(private _uService: UserService,  private _router: Router) {
  }

  ngOnChanges() {
    if (this.items) {
      this.filterItems(this.filterBy);
    }
  }


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
          // console.log('notify items is: ' + this.items[2].loan.ti);


          console.log(items.loan);


          // if (items.loan['timeInMillis']) {}
          if (items.loan) {
            console.log('item loan yes');
          }

/*
          let notify: string;
          let currentDate = new Date();
          currentDate.setHours(0o0, 0o0);
          let oneDay = 24 * 60 * 60 * 1000;
          let diffDays = Math.round((ms - currentDate.getTime()) / (oneDay));
          console.log('diffDays is: ' + diffDays);
          let returnText = 'none';

          if (diffDays < 0) {
            notify = 'yes';
            resolve(notify);
          } else {
            notify = '';
            resolve(notify);
          }
        });
*/



      //  console.log('notify items is: ' + this.items[1].loan[0].timeInMillis);
      /*
       return items.status.toLocaleLowerCase() === 'notify';
       */
    }
  );

  break;

}
}

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

/*
 userNotify(itemDate) {
 // itemDate
 // let itemDate: any = 1494972000000;
 var currentDate = new Date();
 currentDate.setHours(0o0, 0o0);
 var oneDay = 24 * 60 * 60 * 1000;
 var diffDays = Math.round((itemDate - currentDate.getTime()) / (oneDay));
 console.log('diffDays is: ' + diffDays);
 let returnText = 'none';

 if (diffDays < 0) {
 // returnText = " in " + diffDays + " days";
 this.notify = true;
 } else {
 this.notify = false;
 }
 } // notify
 */







  setClickedRow(index, id) {
    this.currentRow = index;
    this._router.navigate(['/item/' + id]);
    console.log('clicked: ' + id);
    /*
    this.popup.options = {
      header: "Your custom header",
      color: "#5cb85c", // red, blue....
      widthProsentage: 40, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: "OK", // The text on your confirm button
      cancleBtnContent: "Cancel", // the text on your cancel button
      confirmBtnClass: "btn btn-default", // your class for styling the confirm button
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button
      animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };

    console.log(index);
    console.log(id);
    this.popup.show(this.popup.options);
    */



  }



} // class


