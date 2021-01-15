import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Mail } from '../../Models/Mail';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  templateUrl: 'mailModal.html'
})
export class MailModal {
  public mail: Mail;
  public htmlString: SafeHtml;


  constructor(public modal: NgbActiveModal, private _http: HttpClient, private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.htmlString = this.domSanitizer.bypassSecurityTrustHtml(this.mail.body);
  }
}
