import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {UserService} from '../../admin/adminShared/user.service';
import {BSModalContext, Modal} from 'angular2-modal/plugins/bootstrap';
import {overlayConfigFactory} from 'angular2-modal';


@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({transform: 'scale3d(.3, .3, .3)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'scale3d(.0, .0, .0)'}))
      ])
    ])
  ]
})
export class ItemDialogComponent implements OnInit, OnChanges {
  @Input() closable = true;
  @Input() visible: boolean;
  @Input() receiveID: string;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  id: any;
  item: any;
  reserved: any[];
  name;
  eMail = '';
  loanExistt;
  timeInMs;
  dueDate;
  borrower;
  // toggle editMod
  editMode = false;
  userDetail: any[];

  errorMessage: string;


  constructor(private _uService: UserService, public modal: Modal) {
  }

  ngOnInit() {
  } // ngOnInit

  ngOnChanges() {
    this.id = this.receiveID; // setts clcked iteID

    // Receive a promise from exist
    this._uService.loanExist(this.id).then(exist => {
      this.loanExistt = exist;
    });

    this._uService.getItemDetails(this.id).subscribe(item => {
      this.item = item;
      this.name = item.name;

      // Get nested itemDetails if node loan exist
      if (this.loanExistt) {
        this.dueDate = item.loan.formattedShortDate;
        //   this.borrowerName = item.loan.loanerName;
        this.timeInMs = item.loan.timeInMillis;
      }

    });

    this._uService.getItemDetailsResInfo(this.id).subscribe(res => {
      this.reserved = res;
    });

  } // ngOnChanges


  deleteDialog() {


    this.modal.confirm()
      .size('sm')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Delete item: aNewItem?')
      .titleHtml('Alert')
      .body('Delete item: ' +this.item.name +'?')
      .okBtn('Yes')
      .okBtnClass('btn btn-danger')
      .cancelBtn('No')
      .open().catch((err: any) => console.log('ERROR: ' + err))
      .then((dialog: any) => { return dialog.result; })
      .then((result: any) => { this.onDeleteClick(); })
      .catch((err: any) => console.log('Canceled!'));

  }

  onDeleteClick() {
    this._uService.deleteItem(this.id);
    this.close();
    this.modal
      .open('Delete successfull! ', overlayConfigFactory({ isBlocking: false }, BSModalContext));
  }


  sendEmail(eMail, borrower, date) {
    let body_message = 'Hello ' + borrower + '.\n\nYou have forgot to return the item: ' + this.name + '.' + '\nThe due date was: ' + date + '!' + '\nPlease return it  as soon as possible' + '\n\n\nBest Regards\nThe Borrowing Team';
    let email = eMail;
    let subject = 'Reminder of overdue item';
    let mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + encodeURIComponent(body_message);
    window.open(mailto_link, 'emailWindow');
  }


  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.editMode = false;
  }


} // class
