import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {UserService} from '../../../admin/adminShared/user.service';
import {Router} from '@angular/router';

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
  forgotMode = false;

  public emailField: any;
  public passField: any;
  public forgotField: any;

  public errorMessage: any;

  constructor(private  _userService: UserService) {
  }

  ngOnInit() {
  }

  login() {
    if(this.emailField && this.passField) {
      this._userService.loginWithEmail(this.emailField, this.passField).then(authData => {
   /*
    this._userService.hasALibrary().then(hasLib => {
    });  */
    this._userService.existInDb();
      }, error => {
          this.errorMessage = error.code;
      });
    } else {
      this.errorMessage = "All fields required";
    }
  }

  showForgotPassword() {
            this._userService.forgotPasswordUser(this.forgotField).then(() => {
           alert('Check your email');
           this.forgotMode = false;
            }, error => {
             alert(error.message);
            });
  }



  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

} // class
