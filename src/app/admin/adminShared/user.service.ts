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
  item:  FirebaseObjectObservable<any>;
  usersRef: any;
  _isAdmin: boolean;


  constructor(private _router: Router, private af: AngularFire) {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
    this.folder = 'images';   // firebase location
    this.usersRef = firebase.database().ref('/users');
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.verifyLogin(url);
  }


  verifyLogin(url: string): boolean {
    if (this.userLoggedIn ) {
      return true;
    }

    this.logout();
    this._router.navigate(['/items/login']);
    console.log('Redirected by: verifyLogin()');
    return false;
  }

  verifyUser(isAdmin) {
      console.log('verifyUSer isAdminB ' + isAdmin);
    if (this.authState && isAdmin) {
    //  alert(`Welcome ${this.authState.auth.email}`);
      this.loggedInUser = this.authState.auth.displayName;
      this.userImage = this.authState.auth.photoURL;
      this.userLoggedIn = true;
      this._router.navigate(['/items']);
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
        console.log('Error, something went wrong..');
        this.error = err;
      });
  }


  existInDb() {
    let userUid = this.authState.auth.uid;
    let fullUserRef = firebase.database().ref('/users/'+userUid);
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
      // splits fullname into an array
      let narr = this.authState.auth.displayName.split(" ");
      this.usersRef.child(user.uid).set({
        uid: user.uid,
        isAdmin: "false",
        isPending: "true",
        entity: "null",
        email: user.email || "",
        photoURL: user.photoURL || "",
        fullname: user.displayName || "",
        name: {
          first: narr[0] || "",
          last: narr[1] || "",
        },
      });
    } else {
      console.log("User exist in db");
    }
  }


  isAdmin() {
    let userUid = this.authState.auth.uid;
    let fullUserRef = firebase.database().ref('/users/'+userUid);
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
      this._router.navigate(['/items/login']);
      console.log('Logged out...');
    }).catch(
      (err) => {
        this.error = err;
        alert(`${err.message} Unable to logout. Try again!`);
      });
  }


  getItems() {
this.items = this.af.database.list('/myDemoItems') as FirebaseListObservable<IItem[]>
    return this.items;
  }


  getItemDetails(id) {
this.item = this.af.database.object('/myDemoItems/' + id) as FirebaseObjectObservable<IItem>
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

  deleteItem(id) {
    return this.items.remove(id);
  }

  updateItem(id, item) {
    return this.items.update(id, item);
  }

} // class
