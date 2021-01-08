import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MailAddress } from '../home/MailAddress';
import { Mail } from './Mail';
import { MailModal } from './modal/mailModal';

@Component({
  selector: 'app-home',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  public emailForm: FormGroup;
  public allMails: Array<Mail>;
  public sendTest: boolean;
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

  constructor(private _http: HttpClient, private fb: FormBuilder, private modalSerivce: NgbModal) {
    this.emailForm = fb.group(this.formValidation);
  }

  ngOnInit() {
    this.getListStats();
    this.getMails();
  }


  //Gets previously sent mails
  getMails() {
    this._http.get<Mail[]>("api/Mail")
      .subscribe(data => {
        this.allMails = data;
      },
        error => console.log(error)
      );
  }




  getListStats() {
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

    this._http.post("/api/Mail/SendMail", mail, { responseType: 'text' })
      .subscribe(response => {
        if (response == "Mail sent") {
          this.MailSentMessage("Mail sent", true);

          //If it was not a test, we archive it.
          if (!this.sendTest) {
            this.logMail(mail);
            this.getMails();
          }

        }
      },
        error => {
          this.MailSentMessage("Mail failed to be sent!", false),
          console.log
        }
      );
  }

  logMail(mail: Mail) {
    this._http.post("api/Mail/LogMail", mail, { responseType: 'text' })
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

  //Feedback message on whether the mail was successfully sent or not
  MailSentMessage(message: string, successful: boolean) {
    if (successful) {
      this.feedback = message;
    } else {
      this.feedback = message;
    }

  }

  expandMail(mail: Mail) {
    const modalRef = this.modalSerivce.open(MailModal);
    modalRef.componentInstance.mail = mail;
  }



}
