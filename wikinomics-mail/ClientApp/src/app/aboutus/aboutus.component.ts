import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailAddress } from '../Models/MailAddress';
import { Statistic } from '../Models/Statistic';
import { fade } from '../animations';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './aboutus.component.html',
  styleUrls: [ './aboutus.component.css' ],
  animations: [
    fade
  ]
})
export class AboutUsComponent {
  constructor() {}

  ToAboutUs1() {
    document.getElementById("aboutus1").scrollIntoView({behavior: "smooth"});
  }

  ToAboutUs2() {
    document.getElementById("aboutus2").scrollIntoView({behavior: "smooth"});
  }
}