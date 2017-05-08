import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({

    template: `
      <h1 class="errorMessage">404</h1>
      <h3 class="sub"> page not found</h3>
      
      <div class='panel-footer'>
        <a class='btn btn-default' (click)='onBack()' style='width:80px'>
          <i class='glyphicon glyphicon-chevron-left'></i> Return
        </a>
      </div>
      
    `,
    styles: [`
      .errorMessage {
        margin-top:150px;
        font-size: 170px;
        text-align: center;
      }
      .sub {
        margin-top:20px;
        font-size: 50px;
        color: red;
        text-align: center;
      }
    
    `]

  /*
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
  */
 })
export class ErrorComponent {
  constructor (private _router: Router) {}
  onBack(): void {
    this._router.navigate(['/items']);
  }
}
