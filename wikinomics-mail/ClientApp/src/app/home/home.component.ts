import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailAddress } from './MailAddress';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public email: String;

  constructor(private http: HttpClient) { }

  addEmailToDb(email) {
    //TODO Push the data to the db
    window.alert("Du skrev " + email);
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
