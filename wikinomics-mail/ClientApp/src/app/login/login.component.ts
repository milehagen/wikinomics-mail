import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Admin } from '../admin/Admin';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
})

export class LoginComponent {
  public loginForm: FormGroup;
  public allowedAccess: boolean;

  constructor(private _http: HttpClient, private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = fb.group(this.formValidation);
    this.allowedAccess = this.authService.isRouteAuthenticated();
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
    //this.checkLogIn();
  }

  //Allows access to admin route
  allowRouteAccess(): void {
    this.authService.setIsAuthenticated(true);
    console.log("access allowed");
    this.allowedAccess = this.authService.isRouteAuthenticated();
  }


  //Checks if you logged in, if you are you are sent to admin page
  /*
  checkLogIn() {
    this._http.get("api/Admin")
      .subscribe(response => {
        if (!response) {
          this.router.navigate(['/login']);
        }
        else {
          this.router.navigate(['/admin']);
        }
      })
  }
  */

  //Calls login
  onLogIn() {
    var admin = new Admin();
    admin.username = this.loginForm.value.username;
    admin.password = this.loginForm.value.password;

    this._http.post("api/Admin", admin)
      .subscribe(response => {
        if (response) {
          console.log(response);
          this.allowRouteAccess();
          this.router.navigate(['/admin']);
        }
      },
        error => console.log(error),
      );
  }

}
