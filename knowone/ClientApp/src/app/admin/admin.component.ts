import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';

import { Mail } from '../Models/Mail';
import { MailModal } from './modal/mailModal';
import { fade } from '../animations';
import { Statistic } from '../Models/Statistic';

@Component({
  selector: 'app-home',
  templateUrl: './admin.component.html',
  animations: [
    fade
  ]
})
export class AdminComponent {
  public emailForm: FormGroup;
  public allMails: Array<Mail>;
  public listStats = new Statistic();

  public sendTest: boolean;
  public liveMailPreviewToggle: boolean;
  public loggedIn: boolean;
  public feedback: string;



  emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  //Validation when filling in form, if not valid the send button is disabled
  formValidation = {
    emailTitel: [
      null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(250)])
    ],
    emailBody: [
      null, Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(2000)])
    ],
    emailTestAddress: [
      { value: '', disabled: true }, Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])
    ]
  }

  constructor(private _http: HttpClient, private fb: FormBuilder, private modalSerivce: NgbModal, private router: Router) {
    this.emailForm = fb.group(this.formValidation);
  }

  ngOnInit() {
    this.checkLogIn();
    this.getListStats();
    this.getMails();
  }


  //Checks if you logged in, if not you are sent away from admin page
  checkLogIn() {
    this._http.get("api/Admin/CheckLogIn")
      .subscribe(response => {
        if (!response) {
          this.router.navigate(['/login']);
        }
        else {
          this.loggedIn = true;
        }
      })
  }

  onLogOut() {
    this._http.get("api/Admin/LogOut")
      .subscribe(response => {
        this.router.navigate(['/login']);
      });
  }



  //Gets previously sent mails
  getMails() {
    this._http.get<Mail[]>("api/Admin/GetAll")
      .subscribe(data => {
        this.allMails = data;
      },
        error => console.log(error)
      );
  }

  getListStats() {
    this._http.get<Statistic>("api/Statistic")
      .subscribe(data => {
        this.listStats = data;
      })
  }

  //Sending out mail
  onSendMail() {
    var mail = new Mail();

    mail.titel = this.emailForm.value.emailTitel;
    mail.body = this.emailForm.value.emailBody;
    mail.date = new Date();

    //If it's a test, we fill in field and use it on backend
    if (this.sendTest) {
      mail.address = this.emailForm.value.emailTestAddress;
    }

    this._http.post("/api/Admin/SendMail", mail, { responseType: 'text' })
      .subscribe(response => {
        if (response == "Mail sent") {
          alert("Success! Mail was sent");

          //If it was not a test, we archive it and refresh the list
          if (!this.sendTest) {
            this.logMail(mail);
            this.getMails();
          }
        }
      },
        error => {
          alert("Error! Mail was not sent");
          console.log
        }
      );
  }


  //Logs the mail just sent to the list on the bottom of the page
  logMail(mail: Mail) {
    this._http.post("api/Admin/LogMail", mail, { responseType: 'text' })
      .subscribe(response => {
      },
      error => console.log(error),
      );
  }


  //If the option to send a test mail is toggled we have to validate the email field
  sendTestToggle() {
    if (this.sendTest) {
      this.emailForm.controls['emailTestAddress'].enable();

    } else {
      this.emailForm.controls['emailTestAddress'].disable();
    }
  }

  //Opens modal with mail
  expandMail(mail: Mail) {
    //Custom modal class is found in global css
    const modalRef = this.modalSerivce.open(MailModal, { windowClass: "customModalClass" });
    modalRef.componentInstance.mail = mail;
  }



}
