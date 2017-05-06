import { Component } from '@angular/core';

@Component({

    template: `
      <h1 class="errorMessage">404</h1>
      <h3 class="sub"> page not found</h3>
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
export class ErrorComponent { }
