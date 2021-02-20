import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './C39F20A7E332BFDD46062A886230CE1E4FAAE8DFB2149F6176948539AB6F02BB.html',
})

export class testComponent {


  constructor(private _http: HttpClient, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
  }

}
