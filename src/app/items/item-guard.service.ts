import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';


@Injectable()
export class ItemDetailGuard implements CanActivate {

    constructor(private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('404 page not found - invalid item Id');
            this._router.navigate(['/items']);
            return false;
        };
        return true;
    }

} // class
