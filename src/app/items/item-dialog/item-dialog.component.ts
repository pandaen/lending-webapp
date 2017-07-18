import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {UserService} from '../../admin/adminShared/user.service';


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
  // userDetail: [any];
  imageUrl: any;
  userDetail: any[];

  errorMessage: string;


  constructor(private _uService: UserService) { }

  ngOnInit() { } // ngOnInit

  ngOnChanges() {
    this.id  = this.receiveID; // setts clcked iteID

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
  }


} // class
