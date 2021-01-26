import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Admin } from '../Models/Admin';
import { fade } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  animations: [
    fade
  ]
})

export class LoginComponent {
  public loginForm: FormGroup;
  loggedIn: boolean;

  constructor(private _http: HttpClient, private fb: FormBuilder, private router: Router) {
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
    this._http.get("api/Admin/CheckLogIn")
      .subscribe(response => {
        if (!response) {
          this.router.navigate(['/login']);
        }
        else {
          this.router.navigate(['/admin']);
        }
      })
  }

  //Calls login
  onLogIn() {
    var admin = new Admin();
    admin.username = this.loginForm.value.username;
    admin.password = this.loginForm.value.password;

    this._http.post("api/Admin/LogIn", admin)
      .subscribe(response => {
        if (response) {
          console.log(response);
          this.loggedIn = true;
          this.router.navigate(['/admin']);
        }
      },
        error => console.log(error),
      );
  }

}
