import { Injectable } from '@angular/core';
import {IItem} from './item';


@Injectable()
export class ItemService {

    getItems(): IItem[] {
        return [
            {
                'itemId': 2,
                'itemName': 'Hammer',
                'borrowerName': 'Fredrik S',
                'dueDate': '14.12.2016',
                'status': 'Out',
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png'
            },
            {
                'itemId': 5,
                'itemName': 'Xbox Controller',
                'borrowerName': 'John Smith',
                'dueDate': '22.03.2017',
                'status': 'Notify',
                'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png'
            }
        ];

    }



// Retrieve FIREBASE DATA HERE
  getUserItems() {
    //  this.userArray = [];
    console.log('List all users alphabetical...............');
    let userQuery = firebase.database().ref('/demoitems').orderByKey();
    userQuery.once('value')
      .then(function (snapshot) {
        let total = snapshot.numChildren();
        snapshot.forEach(function (childSnapshot) {
          let itenName = childSnapshot.key;
          let borrower = childSnapshot.child('Borrower').val();
          let dueDate = childSnapshot.child('Due Date').val();
          let status = childSnapshot.child('Status').val();

          //     let userItem = new Items(itenName , borrower , dueDate, status);
          console.log('Output is: ' + itenName + borrower + dueDate + status);
          //       this.userArray.push(userItem);
        });
        console.log('Total: ' + total);
      });
    //   return this.userPendingArray;
  }



} // class

class Items {
  itemName: string;
  borrowerName: string;
  dueDate: string;
  status: string;

  constructor(itemName: string, borrowerName: string, dueDate: string, status: string) {
    this.itemName = itemName;
    this.borrowerName = borrowerName;
    this.dueDate = dueDate;
    this.status = status;
  }
}
