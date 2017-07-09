import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../admin/adminShared/user.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  pageTitle: string = 'Item';
  id;
  name;
  borrowerName;
 // dueDate;
 description;
//  status;
  loanExistt;


  constructor(private _uService: UserService, private _router: Router, private _route: ActivatedRoute, private _location: Location) {
  }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this._uService.loanExist(this.id);

    // Receive a promise from exist
    this._uService.loanExist(this.id).then(exist => {
      this.loanExistt = exist;
    });

    this._uService.getItemDetails(this.id).subscribe(item => {
      this.name = item.name;
       this.description = item.description;
     // this.status = item.status;

      // Get nested itemDetails if node loan exist
      if (this.loanExistt) {
      //  this.dueDate = item.loan.formattedShortDate;
        this.borrowerName = item.loan.loanerName;
      }
    });

  } // ngInit


  /*
  getItemNestDetail() {
    this._uService.getItemDetails(this.id).subscribe(item => {
   this.dueDate = item.loan.formattedShortDate;
   this.borrowerName = item.loan.loanerName;
    });
  }
  */

  onEditSubmit() {

    let item = {
      name: this.name,
     description: this.description,
    }
  /*
    let somDuedate = {formattedShortDate: this.dueDate}
    console.log('this.id is: ' + this.id);

    if (this.loanExistt) {
      this._uService.updateItem(this.id, item, this.dueDate);
    } else {
      this._uService.updateItem(this.id, item, null);
    }
*/

    this._router.navigate(['']);
  }

  onBack(): void {
    this._location.back();
  }

}

