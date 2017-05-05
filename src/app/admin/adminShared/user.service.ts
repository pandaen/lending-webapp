import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {
  AngularFire, AuthMethods, AuthProviders, FirebaseAuthState, FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2';
import {IItem} from '../../items/item';
import * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate {
  loggedInUser: string;
  userImage: string;// auth image
  authUser: any;
  userLoggedIn: boolean = false;
  error: any;
  folder: any;
  private authState: FirebaseAuthState;
  items: FirebaseListObservable<any[]>;
  item:  FirebaseObjectObservable<any[]>;

  constructor(private _router: Router, private af: AngularFire) {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
    this.folder = 'images';   // firebase location
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.verifyLogin(url);
  }


  verifyLogin(url: string): boolean {
    if (this.userLoggedIn) {
      return true;
    }

    this._router.navigate(['/items/login']);
    console.log('Redirected by: verifyLogin()');
    return false;
  }

  verifyUser() {
    if (this.authState) {
    //  alert(`Welcome ${this.authState.auth.email}`);
      this.loggedInUser = this.authState.auth.displayName;
      this.userImage = this.authState.auth.photoURL;
      this.userLoggedIn = true;
      this._router.navigate(['/items']);
    }


  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then((success) => {
      console.log('login ok..');
      this.verifyUser();
    }).catch(
      (err) => {
        console.log('Error, something went wrong..');
        this.error = err;
      });
  }


  logout() {
     this.userLoggedIn = false;
    this.af.auth.logout().then((success) => {
      this._router.navigate(['/items/login']);
      console.log('Logged out...');
    }).catch(
      (err) => {
        this.error = err;
        alert(`${err.message} Unable to logout. Try again!`);
      });
  }


  getItems() {
this.items = this.af.database.list('/items') as FirebaseListObservable<IItem[]>
    return this.items;
  }


  getItemDetails(id) {
this.item = this.af.database.object('/items/' + id) as FirebaseObjectObservable<IItem>
    console.log(this.item);
    return this.item;
  }

  addItem(item) {
    let storageRef = firebase.storage().ref();

    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        item.image = selectedFile.name;
        item.path = path;
        return this.items.push(item);
      });
    }

  }

} // class

