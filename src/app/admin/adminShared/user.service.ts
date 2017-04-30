import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFire, AuthMethods, AuthProviders, FirebaseAuthState} from "angularfire2";

@Injectable()
export class UserService implements CanActivate {
  loggedInUser: string;
  authUser: any;
  userLoggedIn: boolean = false;
  error: any;
  private authState: FirebaseAuthState;

  constructor(private _router: Router, public af: AngularFire) {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
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

    this._router.navigate(['/items/login']);
    console.log('Redirected by: verifyLogin()');
    return false;
  }

  verifyUser() {
    if (this.authState) {
    //  alert(`Welcome ${this.authState.auth.email}`);
      this.loggedInUser = this.authState.auth.email;
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

} // class
