import { Component,HostListener,OnInit, Directive, Host } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailAddress } from '../Models/MailAddress';
import { Statistic } from '../Models/Statistic';
import { fade } from '../animations';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

// Component for English home page
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ],
  animations: [
    fade
  ]
})

export class HomeComponent {

  constructor(private http: HttpClient, private fb: FormBuilder, private titleService: Title, private router: Router) {
    this.setTitle("KnowOne - English");
  }

  ngOnInit() {
    this.http.get("https://api.linkpreview.net/?key=34f6aff3e2176d95d40996ff3ec938e3&q=https://knowone.no/home").subscribe(response => {
      console.log(response);
    },
      error => console.log(error)
    );
  }
  

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

  // Scrolls to fourht section
  scrollToSection4() {
    document.getElementById("section4").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to fifth section
  scrollToSection5() {
    document.getElementById("section5").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to sixth section
  scrollToSection6() {
    document.getElementById("section6").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to signup section
  scrollToSignUp() {
    document.getElementById("signUp").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to sign up field
  toSignUp() {
    document.getElementById("signUp").scrollIntoView({behavior: "smooth"});
  }

  //Set html Title
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}

// Component for Norwegian home page
@Component({
  selector: 'app-home',
  templateUrl: './homeNorwegian.component.html',
  styleUrls: [ './home.component.css' ],
  animations: [
    fade
  ]
})

export class HomeNorwegianComponent {

  constructor(private http: HttpClient, private fb: FormBuilder, private titleService: Title, private router: Router) {
    this.setTitle("KnowOne - Norsk");
  }

  ngOnInit() {}

  // Scrolls to first section
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

  // Scrolls to fourht section
  scrollToSection4() {
    document.getElementById("section4").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to fifth section
  scrollToSection5() {
    document.getElementById("section5").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to sixth section
  scrollToSection6() {
    document.getElementById("section6").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to signup section
  scrollToSignUp() {
    document.getElementById("signUp").scrollIntoView({behavior: "smooth"});
  }

  //Sets title of HTML document
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
