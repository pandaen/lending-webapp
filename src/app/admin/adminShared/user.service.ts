// dans getitem
// import Rx from 'rxjs/Rx';
import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, FirebaseApp} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
// ------


import {Injectable} from '@angular/core';

import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {
  AngularFire, AuthMethods, AuthProviders, FirebaseAuthState, FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2';
import {IItem} from '../../items/item';
import * as firebase from 'firebase';
import {Subject} from 'rxjs';
import {EditItemComponent} from '../../items/edit-item/edit-item.component';


@Injectable()
export class UserService implements CanActivate {
  loggedInUserDisplayName: string;
  userImage: string;// auth image
  currentUser: any;
  authUser: any;
  userLoggedIn: boolean = false;
  tabs: boolean;
  folder: any;
  private authState: FirebaseAuthState;
  items: FirebaseListObservable<any[]>;
  entities: FirebaseListObservable<any[]>;
  itemSubject: Subject<any>;
  reservations: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any>;
  users: FirebaseListObservable<any[]>;
  user: FirebaseObjectObservable<any>;
  usersRef: any;
  itemsRef: any;
  resDate: FirebaseListObservable<any[]>;
  nChangeuserLoggedIn: Subject<boolean> = new Subject<boolean>();
  loan: any;
  nrOfItem;

  // daniels getitem
  itemsYouCanAdministrate;
// items = af.database.list('/items');
  usersEntityMap: FirebaseListObservable<any>;


  constructor(private _router: Router, private af: AngularFire, private db: AngularFireDatabase) {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
    this.folder = 'images';   // firebase location
    this.usersRef = firebase.database().ref('/users');
    this.itemsRef = firebase.database().ref('/items');


    this.entities = af.database.list('/entities');
    this.usersEntityMap = af.database.list('/usersEntityMap');

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.verifyLogin(url);
  }


  verifyLogin(url: string): boolean {
    if (this.userLoggedIn) {
      return true;
    }

    this.logout();
    this._router.navigate(['/login']);
    //  console.log('Redirected by: verifyLogin()');
    return false;
  }

  verifyUser(isAdmin) {
    // if (this.authState && isAdmin) {
    if (this.authState && isAdmin) {
      //  alert(`Welcome ${this.authState.auth.email}`);
      this.loggedInUserDisplayName = this.authState.auth.displayName;
      this.userImage = this.authState.auth.photoURL;
      this.userLoggedIn = true;
      this.tabs = this.userLoggedIn;
      //    console.log('tabs is: ' + this.tabs);
      this._router.navigate(['']);
    } else {
      this._router.navigate(['/noAdmin']);
    }
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then((success) => {
      //    console.log('login ok..');
      this.existInDb();
      this.isAdmin();
      //  this.verifyUser();
    }).catch(
      (err) => {
        console.log('Error: ' + err);
      });
  }


  existInDb() {
    let userUid = this.authState.auth.uid;
    let fullUserRef = firebase.database().ref('/users/' + userUid);
    fullUserRef.once('value', (snapshot) => {
      let exist = snapshot.exists();
      this.writeDbUser(exist);
    }, function (error) {
      console.error(error);
    });
  }

  writeDbUser(exist) {
    if (!exist) {
      console.log('User added in db');
      let user = this.authState.auth;
      this.usersRef.child(user.uid).set({
        uid: user.uid,
        entity: 'No entity, join an entity to get started',
        entityName: 'No entity, join an entity to get started',
        email: user.email || '',
        isAdmin: 'false',
        photoURL: user.photoURL || '',
        fullname: user.displayName || '',
      });
    } else {
      //    console.log("User exist in db");
    }
  }


  isAdmin() {
    let userUid = this.authState.auth.uid;
    let fullUserRef = firebase.database().ref('/users/' + userUid);
    fullUserRef.once('value', (snapshot) => {
      let isAdmin = snapshot.child('isAdmin').val();
      let isAdminB = (isAdmin === 'true');
      //    console.log('in method isAdmin User isAdminB ' + isAdminB);
      this.verifyUser(isAdminB);
    }, function (error) {
      console.error(error);
    });
  }


  /*
   isGranted() {
   let userUid = this.authState.auth.uid;
   let fullUserRef = firebase.database().ref('/myDemoUsers/' + userUid);
   fullUserRef.once('value', (snapshot) => {
   let privilage = snapshot.child("privilege").val();
   let granted = (privilage === accessCode)
   }, function (error) {
   console.error(error);
   });

   */

  logout() {
    this.userLoggedIn = false;
    this.af.auth.logout().then((success) => {
      this._router.navigate(['/login']);
      //     console.log('Logged out...');
    }).catch(
      (err) => {
        alert(`${err.message} Unable to logout. Try again!`);
      });
  }

  getCurrentUserEntity() {
    return new Promise((resolve, reject) => {
      let userUid = this.authState.auth.uid;
      let fullUserRef = firebase.database().ref('/users/' + userUid);
      fullUserRef.once('value', (snapshot) => {
        resolve(snapshot.val());
      }, function (error) {
        console.error(error);
      });
    });
  }

  /*
   getCurrentUserEntityCallback() {
   this.getCurrentUserEntity().then(user => {
   this.currentUser = user;
   console.log('currentUser is in uService: ' + user);
   });
   }
   */

  // Get your items that lies in your created entityes
  getAdminItems(entityid) {
//  this.itemSubject = new Subject();
    this.items = this.db.list('/items', {
      query: {
        orderByChild: 'entity',
        equalTo: entityid
      }
    });
    return this.items;
  }


  getAdminEntities() {
//  this.itemSubject = new Subject();
    this.entities = this.db.list('/entities', {
      query: {
        orderByChild: 'owner',
        equalTo: this.authState.auth.uid
      }
    });
    return this.entities;
  }

  getJoinedentities() {
    console.log('runned getJoinedEntitys');
    let joinedEntities: IItem[] = [];
   return new Promise((resolve, reject) => {

    let pendingQuery = firebase.database().ref('/usersEntityMap').orderByChild("xoQNWrirTPOWtFaBZBQUJqek4Og1");
    pendingQuery.once("value").then(function (snapshot) {
        let total = snapshot.numChildren();
        snapshot.forEach(function (childSnapshot) {
          let usersUid = childSnapshot.key;
          let isEntityAdmin = childSnapshot.child("adminAccess").exists();
          let entityName = childSnapshot.child("entityName").val();
          let admin = isEntityAdmin === true? 'Yes':'No';
          if (isEntityAdmin) {
          console.log('user is entity admin on: ' + entityName + ' and is admin: ' + admin);
         // console.log('entity details: ' + JSON.stringify(childSnapshot));
           joinedEntities.push(childSnapshot.val());
          resolve(joinedEntities);
          }
        });
        console.log('Total: '+total);
      });
    });
  }


  getItems() {
    this.items = this.af.database.list('/items') as FirebaseListObservable<IItem[]>;
    return this.items;
  }

  // Get all entities
  getEntities() {
    this.entities = this.af.database.list('/entities') as FirebaseListObservable<IItem[]>;
    return this.entities;
  }

  itemFilterBy(item: string) {
    this.itemSubject.next(item);
    return this.items;
  }


  getItemDetails(id) {
    this.item = this.af.database.object('/items/' + id) as FirebaseObjectObservable<IItem>;
    return this.item;
  }

  getItemDetailsResInfo(id) {
    this.reservations = this.af.database.list('/items/' + id + '/reserved') as FirebaseListObservable<IItem[]>;
    return this.reservations;
  }


  getUsers() {
    this.users = this.af.database.list('/users') as FirebaseListObservable<IItem[]>;
    return this.users;
  }


  getUserDetails(id) {
    this.user = this.af.database.object('/users/' + id) as FirebaseObjectObservable<IItem>;
    return this.user;
  }


  addItem(item) {
    this.af.database.list('/items').push(item).then(x => {
      this.uploadImage(item.photoURL, x.key);
    });
  }


  uploadImage(photoURI, key) {
    console.log(JSON.stringify(photoURI).split(',')[3].split('"')[0]);
    if (photoURI != null) {
      firebase.storage().ref('images/' + this.currentUser.entity + '/' + key)
        .putString(JSON.stringify(photoURI).split(',')[3].split('"')[0], 'base64').then(function (snapshot) {
        this.af.database.list('/items').update(key, {
          photoURL: snapshot.downloadURL
        });
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      }.bind(this));
    }
  }


  deleteItem(id) {
    return this.items.remove(id);
  }


  deleteUser(id) {
    return this.users.remove(id);
  }

  updateUser(id, user) {
    return this.users.update(id, user);
  }

  updateItem(id, item, dueDate) {
    // Update Date
    if (dueDate) {
      firebase.database().ref('/items/').child(id).child('loan').update({'formattedShortDate': dueDate});
    }
    return this.items.update(id, item);
  }

  writeNotify(id) {
    firebase.database().ref('/items/').child(id).update({'status': 'Notify'});
  }


  notifyUSer(id) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/items/' + id + '/loan').once('value').then(function (snapshot) {
        let timeInMs = snapshot.val().timeInMillis;
        return Promise.resolve(timeInMs);
      }).then(function (ms) {
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
    });
  }

  dueDateInfo(itemDate) {
    // itemDate
    var currentDate = new Date();
    currentDate.setHours(0o0, 0o0);
    var oneDay = 24 * 60 * 60 * 1000;
    var diffDays = Math.round((itemDate - currentDate.getTime()) / (oneDay));
    console.log('diffDays is: ' + diffDays);
    var returnText;
    if (diffDays < 0) {
      returnText = 'Due expired ' + Math.abs(diffDays) + ' days ago';
    } else if (diffDays === 1) {
      returnText = ' Due ' + diffDays + ' day';
    } else if (diffDays > 1) {
      returnText = ' Due ' + diffDays + ' days';
    } else if (diffDays === 0) {
      returnText = 'today';
    }

    return returnText;
  }

  loanExist(id) {
    return new Promise((resolve, reject) => {
      let userUid = this.authState.auth.uid;
      let fullItemRef = firebase.database().ref('/items/' + id + '/loan');
      fullItemRef.once('value', (snapshot) => {
        let exist = snapshot.exists();
        resolve(exist);
      }, function (error) {
        reject(error);
        console.error(error);
      });
    });
  }


  nrOfItems() {
    return new Promise((resolve, reject) => {
      let userQuery = firebase.database().ref('/items').orderByKey();
      userQuery.once('value').then(function (snapshot) {
        let total = snapshot.numChildren();
        resolve(total);
      }, function (error) {
        reject(error);
        console.error(error);
      });
    });
  }

  nrOfUsers() {
    return new Promise((resolve, reject) => {
      let userQuery = firebase.database().ref('/users').orderByKey();
      userQuery.once('value').then(function (snapshot) {
        let total = snapshot.numChildren();
        resolve(total);
      }, function (error) {
        reject(error);
        console.error(error);
      });
    });
  }
}// class
