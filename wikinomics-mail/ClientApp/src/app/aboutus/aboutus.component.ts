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

  toAboutUs1() {
    document.getElementById("aboutus1").scrollIntoView({behavior: "smooth"});
  }

  toAboutUs2() {
    document.getElementById("aboutus2").scrollIntoView({behavior: "smooth"});
  }

  toAboutUs3() {
    document.getElementById("aboutus3").scrollIntoView({behavior: "smooth"});
  }

  toAboutUs4() {
    document.getElementById("aboutus4").scrollIntoView({behavior: "smooth"});
  }

  toAboutUs5() {
    document.getElementById("aboutus5").scrollIntoView({behavior: "smooth"});
  }

  toHome () {
    document.getElementById("home").scrollIntoView({behavior: "smooth"});
  }
}