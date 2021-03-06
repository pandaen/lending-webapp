// dans getitem
// import Rx from 'rxjs/Rx';
import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, FirebaseApp} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
// ------


import {Injectable, OnInit} from '@angular/core';

import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {
  AngularFire, AuthMethods, AuthProviders, FirebaseAuthState, FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2';
import {IItem} from '../../items/item';
import * as firebase from 'firebase';
import {Subject} from 'rxjs';


@Injectable()
export class UserService implements CanActivate, OnInit {
  loggedInUserDisplayName: string;
  userImage: string;// auth image
  currentUserEntity: any;
  authUser: any;
  userLoggedIn: boolean = false;
  tabs: boolean;
  folder: any;
  private authState: FirebaseAuthState;
  items: FirebaseListObservable<any[]>;
  entities: FirebaseListObservable<any[]>;
  // joinedEntities: FirebaseListObservable<any[]>;
  reservations: FirebaseListObservable<any[]>;
  users: FirebaseListObservable<any[]>;
  usersE: FirebaseListObservable<any[]>;   // user for deleteEntity method
  itemsE: FirebaseListObservable<any>;
  lendingItems: FirebaseListObservable<any[]>;
  selectedLibObject: FirebaseObjectObservable<any>;
  itemSubject: Subject<any>;
  user: FirebaseObjectObservable<any>;
  usersRef: any;
  itemsRef: any;
  resDate: FirebaseListObservable<any[]>;
  nChangeuserLoggedIn: Subject<boolean> = new Subject<boolean>();
  loan: any;
  gmode: boolean;
  nrOfItem;



  // email auth
  public fireAuth: any;


  usersEntityMap: FirebaseListObservable<any>;
  item: FirebaseObjectObservable<any>;
  library: FirebaseObjectObservable<any>;
  office: FirebaseObjectObservable<any>;
  currentLibrary: FirebaseObjectObservable<any>;
  entitySubject: Subject<any>;
  userSubject: Subject<any>;
  lendingSubject: Subject<any>;


  // do not delete errFunc
  errorFunc = error => {
    console.log(error);
  }


  constructor(private _router: Router, private af: AngularFire, private db: AngularFireDatabase) {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
    this.folder = 'images';   // firebase location
    this.usersRef = firebase.database().ref('/users');
    this.itemsRef = firebase.database().ref('/items');
    this.entities = af.database.list('/entities');
    this.usersEntityMap = af.database.list('/usersEntityMap');
    this.usersE = af.database.list('/users');
    this.itemsE = af.database.list('/items');


    // email auth
    this.fireAuth = firebase.auth();





    // getAdmin items with subject
    this.entitySubject = new Subject();
    this.items = db.list('/items', {
      query: {
        orderByChild: 'entity',
        equalTo: this.entitySubject
      }
    });


    /*
     // Get dropdown users
     this.userSubject = new Subject();
     this.users = db.list('/users', {
     query: {
     orderByChild: 'entity',
     equalTo: this.userSubject
     }
     });
     */

    // Get  users that belong to the actually  library (query)
    this.userSubject = new Subject();
    this.users = db.list('/usersEntityMap', {
      query: {
        orderByChild: 'entity',
        equalTo: this.userSubject
      }
    });




    // Get  the user lending item
    this.lendingSubject = new Subject();
    this.lendingItems = db.list('/items', {
      query: {
        orderByChild: 'loan/loaner',
        equalTo: this.lendingSubject
      }
    });



  } // constructor

  ngOnInit() {

    // Set currentUserEntity , used by getAdminItems
    let userUid = this.authState.auth.uid;
    let fullUserRef = firebase.database().ref('/users/' + userUid);
    fullUserRef.once('value', (snapshot) => {
      this.currentUserEntity = snapshot.val().entity;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.verifyLogin(url);
  }


  verifyLogin(url: string): boolean {
    if (this.userLoggedIn) {
      return true;
    }


    this._router.navigate(['/login']);
    //  console.log('Redirected by: verifyLogin()');
    return false;
  }

  verifyUser(exist, usrName) {
    // if (this.authState && isAdmin) {
    if (this.authState && exist) {
      //  alert(`Welcome ${this.authState.auth.email}`);
      this.loggedInUserDisplayName = this.authState.auth.displayName === null ? usrName : this.authState.auth.displayName;// hvis displayname null, vis authUsername eller userName
      this.userImage = this.authState.auth.photoURL === null ? '' : this.authState.auth.photoURL;

      this.userLoggedIn = true;
      this.tabs = this.userLoggedIn;

      this._router.navigate(['']);
    } else {
      window.location.href = 'http://www.pigify.com/onlineadminaccess';
      //  this._router.navigate(['/noAdmin']);
    }
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then((success) => {
      /*
      this.hasALibrary().then(hasLib => {
      });
        this.existInDb(hasLib);
      */
        this.existInDb();
      //   this.isAdmin();
      //  this.verifyUser();
    }).catch(
      (err) => {
        console.log('Error: ' + err);
      });
  }


  existInDb() {
    const userUid = firebase.auth().currentUser.uid;
    const fullUserRef = firebase.database().ref('/users/' + userUid);

    // console.log("hasALibrary is: " + hasAlibrary);
    fullUserRef.once('value', (snapshot) => {
      const userName = snapshot.child('fullname').val();
       const exist = snapshot.exists();
      this.verifyUser(exist, userName);
      // this.writeDbUser(exist);
    }, function (error) {
      console.error(error);
    });
  }


  // User has buy a library
  /*
  hasALibrary() {
    let userUid = firebase.auth().currentUser.uid;
    return new Promise((resolve, reject) => {
      let hasALibrary = false;
      //   console.log('Has a Library...............');
      const libraryQuery = firebase.database().ref('/entities').orderByChild('owner').equalTo(userUid);
      libraryQuery.once('value').then(function (snapshot) {
        const total = snapshot.numChildren();
        if (total >= 1) {
          hasALibrary = true;
        } else {
          hasALibrary = false;
        }
        resolve(hasALibrary);
        //console.log('Total library is: ' + total);
      }, function (error) {
        reject(error);
        console.error(error);
      });
    });
  }
*/

  /*
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
   return;
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
    this.af.auth.logout().then((success) => {
      this._router.navigate(['/login']);
      //       console.log('Logged out...');
    }
    ).catch(
      (err) => {
        alert(`${err.message} Logout. failed!`);
      });

  }



  getCurrentUserEntity() {
    return new Promise((resolve, reject) => {
      let userUid = this.authState.auth.uid;
      let fullUserRef = firebase.database().ref('/users/' + userUid);
      fullUserRef.once('value', (snapshot) => {
        this.currentUserEntity = snapshot.val().entity;
        resolve(snapshot.val());
      }, function (error) {
        console.error(error);
      });
    });
  }

  getCurrentUserLibrary() {
    return this.currentLibrary = this.db.object('/users/' + this.authState.auth.uid + '/entityName', {preserveSnapshot: true});
  }



  getYourUsers() {
    this.userSubject = new Subject();
    this.items = this.db.list('/users', {
      query: {
        orderByChild: 'entity',
        equalTo: this.userSubject
      }
    });
    //  return this.items;
  }


  // GET all entities

  getAllEntities() {
    this.entities = this.db.list('/entities', {
    });
    return this.entities;
  }



// Get owned entities
  getAdminEntities() {
    this.entities = this.db.list('/entities', {
      query: {
        orderByChild: 'owner',
        equalTo: this.authState.auth.uid
      }
    });
    return this.entities;
  }

  // Get JOINED librarys (granted access)
  getJoinedLibrarys() {
    this.entities = this.db.list('/usersEntityMap', {
      query: {
        orderByChild: 'userUid',
        equalTo: this.authState.auth.uid
      }
    });
    return this.entities;
  }






  // get all items
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

  /*  NOT IN USE????
  getLibraryDetails(id) {
    this.library = this.af.database.object('/entities/' + id) as FirebaseObjectObservable<IItem>;
    return this.library;
  }


  getLibraryOffice(id) {
    this.office = this.af.database.object('/entities/' + id + '/office') as FirebaseObjectObservable<IItem>;
    return this.office;
  }
*/

// Get all users
  getUsers() {
    this.users = this.af.database.list('/users') as FirebaseListObservable<IItem[]>;
    return this.users;
  }

  /*
   getLendingItems(id) {
   this.library = this.af.database.object('/entities/' + id) as FirebaseObjectObservable<IItem>;
   return this.library;
   }
   */


  /*
  // UNDER CONSTRUCTION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  getUsersLoanItem(entity,id) {
    let libArr = [];
    console.log("libArr typeOf: " + libArr);
    return new Promise((resolve, reject) => {
      let libraryQuery = firebase.database().ref('/items/').orderByChild('entity').equalTo(entity);
      libraryQuery.once('value').then(function (snapshot) {
        const total = snapshot.numChildren();
        libArr.push(snapshot);
        resolve(libArr);
      });
    });
  }
*/
  getUserDetails(id) {
    this.user = this.af.database.object('/users/' + id) as FirebaseObjectObservable<IItem>;
    return this.user;
  }

  // Get  selected library for library-dialog-popup

  getSelectedLibrary(libID){
  this.selectedLibObject = this.af.database.object('/entities/' + libID) as FirebaseObjectObservable<IItem>;
return this.selectedLibObject;
  }


  addItem(item, photo) {
    this.af.database.list('/items').push(item).then(x => {
      this.uploadImage(photo, x.key);
    });
  }


  uploadImage(photoURI, key) {
    if (photoURI !== undefined) {
      this.getCurrentUserEntity().then(user => {
        this.currentUserEntity = user['entity'];
      });  // ge
      let photo = (JSON.stringify(photoURI).split(',')[1].split('"')[0]);
      firebase.storage().ref('images/' + this.currentUserEntity + '/' + key).putString(photo, 'base64').then(function (snapshot) {
        this.af.database.list('/items').update(key, {
          photoURL: snapshot.downloadURL
        });
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      }.bind(this));

    }

  }


  deleteItem(id) {
    firebase.storage().ref('images/' + this.currentUserEntity + '/' + id).delete().catch(() => {
    });
    return this.items.remove(id);
  }


  deleteUser(id) {
    return this.users.remove(id);
  }

  updateUser(id, user) {
    return this.users.update(id, user);
  }


  updateItem(id, item) {

    /* // Update Date
     if (dueDate) {
     firebase.database().ref('/items/').child(id).child('loan').update({'formattedShortDate': dueDate});
     }
     */
    return this.items.update(id, item);
  }

  updateLibrary(id, library, officeData, thisMapNameid) {
    this.af.database.list('/entities').update(id, library).then(x => {
      if (officeData) {
        firebase.database().ref('/entities/').child(id).child('office').update({'location': officeData.location});
        firebase.database().ref('/entities/').child(id).child('office').update({'room': officeData.room});
      }

    }).then(x => {  // also update userLibMap-name
      firebase.database().ref('/usersEntityMap/').child(thisMapNameid).update({'entityName': library.name});
    }).then(x => {  // also update auth-user library-name
      firebase.database().ref('/users/').child(this.authState.auth.uid).update({'entityName': library.name});
    });

  }

  updateOfficeLibraryData(office, key) {

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

  officeExist(id) {
    return new Promise((resolve, reject) => {
      let userUid = this.authState.auth.uid;
      let fullRef = firebase.database().ref('/entities/' + id + '/office');
      fullRef.once('value', (snapshot) => {
        let exist = snapshot.exists();
        resolve(exist);
      }, function (error) {
        reject(error);
        console.error(error);
      });
    });
  }

/* OBSOLETE
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
*/

  // OBSOLETE???
  /*
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
*/

  setLibrary(id, name) {
    let userUid = this.authState.auth.uid;
    firebase.database().ref('/users/').child(userUid).update({'entity': id, 'entityName': name});
  }

  addEntity(name, office, reservationDays, termsAndConditions) {

    let entityPromise = this.entities.push({
      name: name,
      owner: this.authState.auth.uid,
      ownerName: this.authState.auth.displayName || 'emailName',
      office: office,
      reservationDays: reservationDays,
      termsAndConditions: termsAndConditions
    });

    entityPromise.then((resolve) => {
      this.usersEntityMap.push({
        userUid: this.authState.auth.uid,
        fullname: this.authState.auth.displayName,
        email: this.authState.auth.email,
        photoURL: this.authState.auth.photoURL,
        entity: resolve.key,
        entityName: name,
        adminAccess: true,
        newUser: false
      });
    })
    return entityPromise;
  }

  loginWithEmail(email, pass) {
    return this.fireAuth.signInWithEmailAndPassword(email, pass);
  }


  forgotPasswordUser(email: any) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }


// Is superuser or not (load list)
  isSu() {
    let userUid = firebase.auth().currentUser.uid;
    return new Promise((resolve, reject) => {
      let fullRef = firebase.database().ref('/users/' + userUid + '/gmac');
      fullRef.once('value', (snapshot) => {
        let usrgmac = snapshot.val();
         this.isSUCheck(usrgmac).then(status => {
      resolve(status);
        });
      })
    });
  }

isSUCheck(usergmac){
 let ggmode: boolean;
  return new Promise((resolve, reject) => {
  let gmacRef = firebase.database().ref('/misc/gmac');
  gmacRef.once('value', (snapshot) => {
    let gmac = snapshot.val();
    // console.log("usrgmac is: " +JSON.stringify(usrgmac,null,""));
    ggmode  = usergmac === gmac ? true : false;
  resolve(ggmode);
  })
  });
}





// Used for Library-dialog popup WITH PROMISE
  /*
  getSelectedLibrary(libID) {
    console.log("getSelectedLibrary runned");
    let userUid = firebase.auth().currentUser.uid;
    return new Promise((resolve, reject) => {
      let fullRef = firebase.database().ref('/entities/' + libID);
      fullRef.once('value', (snapshot) => {
        resolve(snapshot);
      });
    });
  }
*/


  deleteUserLibraryMapping(entity) {
    const authUid = this.authState.auth.uid;
    const libArr: IItem[] = [];
    return new Promise((resolve, reject) => {
      const libraryQuery = firebase.database().ref('/usersEntityMap/').orderByChild('entity').equalTo(entity);
      libraryQuery.once('value').then(function (snapshot) {
        const total = snapshot.numChildren();
        snapshot.forEach(function (childSnapshot) {
          libArr.push(childSnapshot.val());
        //  console.log('libarr is: ' + JSON.stringify(libArr[0], null, '') + '& total is: ' + total);
          resolve(libArr);
        });
      });
    });
  }


  // Code for deleting Entity (from mobilApp)
  deleteEntity(entity) {
    console.log('Library was deleted!!!');
    this.usersEntityMap.subscribe(map => {
      const elementsToDelete = map.filter(el => {
        return (el.entity === entity.$key);
      });
      elementsToDelete.forEach(el => {
        this.usersEntityMap.remove(el);
      });
    }, this.errorFunc).unsubscribe();

    this.usersE.subscribe(users => {
      users.forEach(user => {
        if (user.entity === entity.$key) {
          this.usersE.update(user, {
            entity: 'No library, join a library to get started',
            entityName: 'No library, join a library to get started'
          });
        }
        if (user.otherRoleEntity === entity.$key) {
          this.usersE.update(user, {
            otherRoleEntity: 'No library, join a library to get started',
            otherRoleEntityName: 'No library, join a library to get started'
          });
        }
      });
    }, this.errorFunc).unsubscribe();

    this.itemsE.subscribe(items => {
      const itemsToDelete = items.filter(item => {
        return (item.entity === entity.$key)
      });
      itemsToDelete.forEach(item => {
        this.itemsE.remove(item);
      });
    }, this.errorFunc).unsubscribe();

    this.entities.remove(entity);
  }

}// class
