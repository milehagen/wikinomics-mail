import { Component,HostListener,OnInit, Directive, Host } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailAddress } from '../Models/MailAddress';
import { Statistic } from '../Models/Statistic';
import { fade } from '../animations';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ],
  animations: [
    fade
  ]
})
export class HomeComponent {
  
  constructor() {}

  ngOnInit() {}

  // Scroll to home section
  toHome() {
    document.getElementById("page").scrollIntoView({behavior:"smooth"});
  }

  // Scroll to info section 1
  toSection1() {
    document.getElementById("section1").scrollIntoView({behavior:"smooth"});
  }

  // Scroll to info section 2
  toSection2() {
    document.getElementById("section2").scrollIntoView({behavior: "smooth"});
  }

  // Scroll to info section 3
  toSection3() {
    document.getElementById("section3").scrollIntoView({behavior: "smooth"});
  }

  // Scroll to info section 4
  toSection4() {
    document.getElementById("section4").scrollIntoView({behavior: "smooth"});
  }

 }
