import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailAddress } from '../Models/MailAddress';
import { slide } from '../animations';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ],
  animations: [
    slide
  ]
})
export class HomeComponent {
  public emailInputForm: FormGroup;
  showInfo: boolean;
  showRegister: boolean;
  public email: string;
  public allMailAdresses: Array<MailAddress>;
  emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  formValidation = {
    formEmail: [
      '', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])
    ]
  }

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.emailInputForm = fb.group(this.formValidation);
  }

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
  addEmailToDb() {
    const mailAddress = new MailAddress();
    mailAddress.address = this.emailInputForm.controls.formEmail.value;
    

    if (this.checkIfRegistered(mailAddress.address)) {
      window.alert("E-posten er allerede registrert");
    } else {
      this.http.post("api/MailAddress", mailAddress)
        .subscribe(retur => {
          window.alert("Registreringen var vellykket");
          this.emailInputForm.reset();
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
      },
        error => console.log(error)
      );
  }

  //Check if the email already exists in the array, if it return false then the email is unique, if true then it is already registered.
  checkIfRegistered(email: String) {
    let ok;
    for (let value of this.allMailAdresses) {
      if (email === value.address) {
        ok = true;
      } 
    }
    return ok;
  }
 }
