import { Component,HostListener,OnInit, Directive, Host } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MailAddress } from '../Models/MailAddress';
import { Statistic } from '../Models/Statistic';
import { fade } from '../animations';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

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
  termsAccepted: boolean;
  public emailInputForm: FormGroup;
  showInfo: boolean;
  showRegister: boolean;
  public email: string;
  public allMailAdresses: Array<MailAddress>;
  public sendUpdates: boolean;
  emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.emailInputForm = fb.group(this.formValidation);
  }

  formValidation = {
    formFirstname: [
      '', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])
    ],
    formLastname: [
      '', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])
    ],
    formEmail: [
    '', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])
    ]
}

  // Scrolls to top of page/home
  toHome() {
    document.getElementById("page").scrollIntoView({behavior:"smooth"});
  }

  scrollToSection1() {
    document.getElementById("section1").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to sign up field
  toSignUp() {
    document.getElementById("signUp").scrollIntoView({behavior: "smooth"});
  }


  //Event listener to the checkbox for subscribing to mailing list
  wantUpdates(event) {
    this.sendUpdates = event.target.checked;
  }


  //Adds email to database
  addEmailToDb() {
    const mailAddress = new MailAddress();
    mailAddress.firstname = this.emailInputForm.controls.formFirstname.value;
    mailAddress.lastname = this.emailInputForm.controls.formLastname.value;
    mailAddress.address = this.emailInputForm.controls.formEmail.value;
      if (this.sendUpdates) {
          mailAddress.sendUpdates = true;
      }
      else {
          mailAddress.sendUpdates = false;
      }
      
    this.http.post("api/MailAddress", mailAddress)
      .subscribe(retur => {
        window.alert("Registreringen var vellykket");
        this.emailInputForm.reset();
          if (this.sendUpdates) {
              this.updateDBStatistics();
          }
      },
        error => console.log(error)
      );
  }

  updateDBStatistics() {
      var stats = new Statistic();
      stats.lastSignUp = new Date();
      stats.totalSubscribes = 1;
      stats.currentSubscribes = 0;
      stats.totalUnsubscribes = 0;
      this.http.put("api/Statistic", stats)
      .subscribe(response => {
      })
  }

  // Checks if terms and conditions is accepted
  acceptTerms(event) {
    if(event.target.checked) {
      this.termsAccepted = true;
    } else {
      this.termsAccepted = false;
    }
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
  termsAccepted: boolean;
  public emailInputForm: FormGroup;
  showInfo: boolean;
  showRegister: boolean;
  public email: string;
  public sendUpdates: boolean;
  public allMailAdresses: Array<MailAddress>;
  emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.emailInputForm = fb.group(this.formValidation);
  }

  formValidation = {
    formFirstname: [
      '', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])
    ],
    formLastname: [
      '', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])
    ],
    formEmail: [
    '', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])
    ]
}

  // Scrolls to top of page/home
  toHome() {
    document.getElementById("page").scrollIntoView({behavior:"smooth"});
  }

  // Scrolls to first section
  scrollToSection1() {
    document.getElementById("section1").scrollIntoView({behavior: "smooth"});
  }

  // Scrolls to sign up field
  toSignUp() {
    document.getElementById("signUp").scrollIntoView({behavior: "smooth"});
  }

  //Event listener to the checkbox for subscribing to mailing list
  wantUpdates(event) {
    this.sendUpdates = event.target.checked;
  }

  //Adds email to database
  addEmailToDb() {
    const mailAddress = new MailAddress();
    mailAddress.firstname = this.emailInputForm.controls.formFirstname.value;
    mailAddress.lastname = this.emailInputForm.controls.formLastname.value;
    mailAddress.address = this.emailInputForm.controls.formEmail.value;
    if (this.sendUpdates) {
      mailAddress.sendUpdates = true;
    }
    else {
      mailAddress.sendUpdates = false;
    }

    this.http.post("api/MailAddress", mailAddress)
      .subscribe(retur => {
        window.alert("Registreringen var vellykket");
        this.emailInputForm.reset();
        if (this.sendUpdates) {
          this.updateDBStatistics();
        }
      },
        error => console.log(error)
      );
  }

  // Get an array of all emails from the database
  getEmailAddress() {
      this.http.get<MailAddress[]>("api/MailAddress")
      .subscribe(data => {
          this.allMailAdresses = data;
      },
          error => console.log(error)
      );
  }

  updateDBStatistics() {
      var stats = new Statistic();
      stats.lastSignUp = new Date();
      stats.totalSubscribes = 1;
      stats.currentSubscribes = 0;
      stats.totalUnsubscribes = 0;
      this.http.put("api/Statistic", stats)
      .subscribe(response => {
      })
  }

  // Checks if terms and conditions is accepted
  acceptTerms(event) {
    if(event.target.checked) {
      this.termsAccepted = true;
    } else {
      this.termsAccepted = false;
    }
  }

}
