import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailAddress } from '../Models/MailAddress';
import { Statistic } from '../Models/Statistic';
import { fade } from '../animations';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

// Component for English page
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

  // Scrolls to first section
  scrollToSection1() {
    document.getElementById("section1").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to second section
  scrollToSection2() {
    document.getElementById("section2").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to third section
  scrollToSection3() {
    document.getElementById("section3").scrollIntoView({behavior: "smooth"});
  }
}


// Component for Norwegian page
@Component({
  selector: 'app-home',
  templateUrl: './aboutusNorwegian.component.html',
  styleUrls: [ './aboutus.component.css' ],
  animations: [
    fade
  ]
})
export class AboutUsNorwegianComponent {
  constructor() {}
  
  // Scrolls to first section
  scrollToSection1() {
    document.getElementById("section1").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to second section
  scrollToSection2() {
    document.getElementById("section2").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to third section
  scrollToSection3() {
    document.getElementById("section3").scrollIntoView({behavior: "smooth"});
  }
}
