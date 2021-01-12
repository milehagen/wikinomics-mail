import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Admin } from '../admin/Admin';
import { slide } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  animations: [
    slide
  ]
})

export class LoginComponent {
  public loginForm: FormGroup;
  loggedIn: boolean;
  public uniqueId: string;

  constructor(private _http: HttpClient, private router: Router) {
  }


  ngOnInit() {
    //this.checkLogIn();
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

  unsubscribe() {

  }

}
