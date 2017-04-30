import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class UserService implements CanActivate {
   //  loggedInUser: string;
   // authUser: any;
    userLoggedIn: boolean = false;

    constructor(private _router: Router) {    // , public af: AngularFire

    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }


    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) {
            return true;
        }
        // this._router.navigate(['../home/login']);
        this._router.navigate(['/items/items']);
        return false;
    }

    verifyUser() {
  /*
        this.authUser = firebase.auth().currentUser;

        if (this.authUser) {
            alert('Welcome ${this.authUser.email}');
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this._router.navigate(['/items']);
        }
*/

    }

    login() {
        /*
        this.af.auth.login({
            provider: AuthProviders.Facebook
        });
        */
    }


    logout() {
        /*
         this.userLoggedIn = false;
         firebase.auth().signOut().then(function() {
         alert(`Logged Out!`);

         }, function(error) {
         alert(`${error.message} Unable to logout. Try again!`);
         });
         */
    }

} // class
