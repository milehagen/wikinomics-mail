import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
})

export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private _http: HttpClient, private fb: FormBuilder, @Inject(DOCUMENT) private document: Document) {
    this.loginForm = fb.group(this.formValidation);
  }

  formValidation = {
    username: [
      null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])
    ],
    password: [
      null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(128)])
    ]
  }


  ngOnInit() {
    this.checkLogIn();
  }

  //Checks if you logged in, if you are you are sent to admin page
  checkLogIn() {
    this._http.get("api/Admin", { responseType: 'text' })
      .subscribe(response => {
        if (response == "Logged in") {
          this.document.location.href = '/admin';
        }
      })
  }

}
