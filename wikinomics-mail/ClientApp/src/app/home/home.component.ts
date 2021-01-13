import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailAddress } from './MailAddress';
import { slide } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ],
  animations: [
    slide
  ]
})
export class HomeComponent {

  showInfo: boolean;
  showRegister: boolean;
  public email: string;
  public allMailAdresses: Array<MailAddress>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEmailAddress();
  }

  // Shows/hide info field
  ShowInfo() {
    this.showInfo = this.showInfo ? false : true;
  }

  // Shows/hide registration field
  ShowRegisterField() {
    this.showRegister = this.showRegister ? false : true;
  }

  // Shows main page, hides other
  BackToMain() {
    this.showInfo = false;
    this.showRegister = false;
  }

  //Adds email to database
  addEmailToDb(email) {

    const mailAddress = new MailAddress();
    mailAddress.address = email;

    if (this.checkIfRegistered(mailAddress.address)) {
      window.alert("E-posten er allerede registrert");
    } else {
      this.http.post("api/MailAddress", mailAddress)
        .subscribe(retur => {
          console.log("vellykket");
        },
          error => console.log(error)
        );
    }
  }
  // Get an array of all emails from the database
  getEmailAddress() {
    this.http.get<MailAddress[]>("api/MailAddress")
      .subscribe(data => {
        this.allMailAdresses = data;
        console.log(this.allMailAdresses);
      },
        error => console.log(error)
      );
  }

  //Check if the email already exists in the array, if it return false then the email is unique, if true then it is already registered.
  checkIfRegistered(email: String) {
    let ok = false;
    for (let value of this.allMailAdresses) {
      if (email === value.address) {
        ok = true;
      } 
    }
    return ok;
  }
 }
