import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Mail } from '../Mail';


@Component({
  templateUrl: 'mailModal.html'
})
export class MailModal {
  public mail: Mail;
  public test: String;


  constructor(public modal: NgbActiveModal, private _http: HttpClient) {
  }

  ngOnInit() {
    this.test = "<h2>hello</h2>";
  }
}
