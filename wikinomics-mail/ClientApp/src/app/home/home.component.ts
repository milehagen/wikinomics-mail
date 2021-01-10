import { Component,OnInit } from '@angular/core';
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
  public allMailAdresses: Array<MailAddress>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEmailAddress();
  }

  

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
         console.log("vellykket");
       },
         error => console.log(error)
       );
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
 }
