import {Component, OnInit} from '@angular/core';
import {IItem} from './item';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserService} from '../admin/adminShared/user.service';

@Component({
  moduleId: module.id, // can now use realtive path (omit app/pages..)
  templateUrl: 'item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {
  pageTitle: string = 'Item Detail';
  //  item: IItem;
  id: any;
  item: any;
  imageUrl: any;

  errorMessage: string;
  private sub: Subscription;

  constructor(private _route: ActivatedRoute, private _router: Router, private _uService: UserService) {
  }

  // Sets items
  ngOnInit(): void {
    /*
     let id = this._route.snapshot.params['id'];
     this.pageTitle += `: ${id}`;
     */
    this.id = this._route.snapshot.params['id'];

    this._uService.getItemDetails(this.id).subscribe(item => {
      this.item = item;
    });

    // ----------------------------------------
  }

  onBack(): void {
    this._router.navigate(['/items']);
  }

} // class
