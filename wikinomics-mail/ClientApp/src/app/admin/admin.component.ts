import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  public emailForm: FormGroup;
  public sendTest: boolean;

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

  constructor(private _http: HttpClient, private fb: FormBuilder) {
    this.emailForm = fb.group(this.formValidation);
  }

  //Sending to mailing list
  onSendToList() {

  }


  //Test sending to single mail address
  onSendTest() {

  }

  //If the option to send a test mail is toggled we have to validate the email field
  sendTestToggle() {
    if (this.sendTest) {
      this.emailForm.controls['emailTestAddress'].enable();

    } else {
      this.emailForm.controls['emailTestAddress'].disable();
    }
  }



}
