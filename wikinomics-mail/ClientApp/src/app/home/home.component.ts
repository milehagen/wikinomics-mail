import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailAddress } from './MailAddress';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({transform: 'translateY(-100%)', opacity: 0}),
        animate(500)
      ])
    ])
  ]
})
export class HomeComponent {

  showInfo: Boolean = false;
  showRegister: Boolean = false;
  public email: String;

  constructor(private http: HttpClient) { }

  ShowInfo() {
    this.showInfo = this.showInfo ? false : true;
  }

  ShowRegisterField() {
    this.showRegister = this.showRegister ? false : true;
  }

  BackToMain() {
    this.showInfo = false;
    this.showRegister = false;
  }

  //Adds email to database
  addEmailToDb(email) {

    const mailAddress = new MailAddress();

    mailAddress.address = email;
    

    this.http.post("api/MailAddress", mailAddress)
      .subscribe(retur => {
        window.alert("vellykket");
      },
        error => console.log(error)
      );

  }
 }
