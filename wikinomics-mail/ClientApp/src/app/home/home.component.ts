import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailAddress } from './MailAddress';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent {

  showHeaderContent: Boolean = false;
  showRegister: Boolean = false;


  ShowHeaderContent() {
    this.showHeaderContent = this.showHeaderContent ? false : true;
  }

  ShowRegisterField() {
    this.showRegister = this.showRegister ? false : true;
  }

  BackToMain() {
    this.showHeaderContent = false;
    this.showRegister = false;
  }

  /*showRegistration() {
    let info = document.getElementById("info");
    let registration = document.getElementById("registration");
    const btnShowReg = document.getElementById("btnShowReg");

    if (info.className = "d-block") {
      info.className = "d-none";
      registration.className = "d-block";
      btnShowReg.className = "d-none";
    }

  }
}*/
  public email: String;

  constructor(private http: HttpClient) { }

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
