// dans getitem
// import Rx from 'rxjs/Rx';
import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
// ------


import {Injectable} from '@angular/core';

import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {
  AngularFire, AuthMethods, AuthProviders, FirebaseAuthState, FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2';
import {IItem} from '../../items/item';
import * as firebase from 'firebase';
import {Subject} from "rxjs";
import {EditItemComponent} from "../../items/edit-item/edit-item.component";


@Injectable()
export class UserService implements CanActivate {
  loggedInUser: string;
  userImage: string;// auth image
  currentUser: any;
  authUser: any;
  userLoggedIn: boolean = false;
  tabs: boolean;
  error: any;
  folder: any;
  private authState: FirebaseAuthState;
  items: FirebaseListObservable<any[]>;
  reservations: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any>;
  users: FirebaseListObservable<any[]>;
  user: FirebaseObjectObservable<any>;
  loanExistt;
  itemdetailRetDate: string;
  itemdetailUpDate: any;
  usersRef: any;
  _isAdmin: boolean;
  resDate: FirebaseListObservable<any[]>;
  nChangeuserLoggedIn: Subject<boolean> = new Subject<boolean>();

  // daniels getitem
  itemsYouCanAdministrate;
// items = af.database.list('/items');
  entities: FirebaseListObservable<any>;
  usersEntityMap: FirebaseListObservable<any>;


  constructor(private _router: Router, private af: AngularFire) {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
    this.folder = 'images';   // firebase location
    this.usersRef = firebase.database().ref('/users');


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
    this._router.navigate(['login']);
    console.log('Redirected by: verifyLogin()');
    return false;
  }

  verifyUser(isAdmin) {
    if (this.authState && isAdmin) {
      //  alert(`Welcome ${this.authState.auth.email}`);
      this.loggedInUser = this.authState.auth.displayName;
      this.userImage = this.authState.auth.photoURL;
      this.userLoggedIn = true;
      this.tabs = this.userLoggedIn;
      console.log('tabs is: ' + this.tabs);
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
      console.log('login ok..');
      this.existInDb();
      this.isAdmin();
      //  this.verifyUser();
    }).catch(
      (err) => {
        console.log('Error: login failed..');
        this.error = err;
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
      console.log("User added in db");
      let user = this.authState.auth;
      this.usersRef.child(user.uid).set({
        uid: user.uid,
        entity: "No entity, join an entity to get started",
        entityName: "No entity, join an entity to get started",
        email: user.email || "",
        isAdmin: "false",
        photoURL: user.photoURL || "",
        fullname: user.displayName || "",
      });
    } else {
      console.log("User exist in db");
    }
  }


  isAdmin() {
    let userUid = this.authState.auth.uid;
    let fullUserRef = firebase.database().ref('/users/' + userUid);
    fullUserRef.once('value', (snapshot) => {
      let isAdmin = snapshot.child("isAdmin").val();
      let isAdminB = (isAdmin === 'true')
      console.log('in method isAdmin User isAdminB ' + isAdminB);
      this.verifyUser(isAdminB);
    }, function (error) {
      console.error(error);
    });
  }


  logout() {
    this.userLoggedIn = false;
    this.af.auth.logout().then((success) => {
      this._router.navigate(['items/login']);
      console.log('Logged out...');
    }).catch(
      (err) => {
        this.error = err;
        alert(`${err.message} Unable to logout. Try again!`);
      });
  }


  getItems() {
    this.items = this.af.database.list('/items') as FirebaseListObservable<IItem[]>;
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
    let storageRef = firebase.storage().ref();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        item.image = selectedFile.name;
        item.path = path;
        return this.items.push(item);
      });
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

  updateItem(id, item) {
    return this.items.update(id, item);
  }


  dueDate(itemDate) {
    var currentDate = new Date();
    currentDate.setHours(0o0, 0o0);
    var oneDay = 24 * 60 * 60 * 1000;
    var diffDays = Math.round(Math.abs((itemDate - currentDate.getTime()) / (oneDay)));
    var returnText;
    if (diffDays == 0) {
      returnText = "Today";
    }
    else if (diffDays == 1) {
      returnText = " in " + diffDays + " day";
    }
    else if (diffDays > 1) {
      returnText = " in " + diffDays + " days";
    }

    else if (diffDays < 0) {
      returnText = "Notify";
    }

    return returnText;
  }

  loanExist(id) {
    let userUid = this.authState.auth.uid;
    let fullItemRef = firebase.database().ref('/items/' + id + '/loan');
    fullItemRef.once('value', (snapshot) => {
      let exist = snapshot.exists();
      console.log('loan exist: ' + exist);
      if (exist) {
        this.loanExistt = true;
      } else {
        this.loanExistt = false;
      }

      // this.writeDbUser(exist);
    }, function (error) {
      console.error(error);
    });
  }

} // class
