import {Component, OnInit} from '@angular/core';
import { IItem } from './item';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ItemService} from './item.service';

@Component({
  moduleId: module.id, // can now use realtive path (omit app/pages..)
    templateUrl: 'item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {
    pageTitle: string = 'Item Detail';
    item: IItem;
    errorMessage: string;
    private sub: Subscription;

    constructor(private _route: ActivatedRoute, private _router: Router, private _itemService: ItemService) {}

    // Sets items
    ngOnInit(): void {
        /*
        let id = +this._route.snapshot.params['id'];
        this.pageTitle += `: ${id}`;
        */

        this.sub = this._route.params.subscribe(
            params => {
               // let id = +params['id'];
              //  this.get(id);
            });
    }

    onBack(): void {
        this._router.navigate(['/items']);
    }

} // class
