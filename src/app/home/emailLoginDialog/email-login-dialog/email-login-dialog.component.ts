import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {UserService} from '../../../admin/adminShared/user.service';

@Component({
  selector: 'app-email-login-dialog',
  templateUrl: './email-login-dialog.component.html',
  styleUrls: ['./email-login-dialog.component.css'],
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

export class EmailLoginDialogComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  emailShowDialog = false;

  public emailField: any;
  public passField: any;


  constructor(private  _userService: UserService) { }

  ngOnInit() {
  }

login() {
  this._userService.loginWithEmail(this.emailField, this.passField);
}


  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

} // class
