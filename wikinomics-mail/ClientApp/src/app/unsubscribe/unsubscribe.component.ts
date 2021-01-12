import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Admin } from '../admin/Admin';
import { slide } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './unsubscribe.component.html',
  animations: [
    slide
  ]
})

export class UnsubscribeComponent {
  public unsubscribeForm: FormGroup;
  loggedIn: boolean;
  uniqueID: string;
  public feedback: string;

  constructor(private _http: HttpClient, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.uniqueID = this.route.snapshot.queryParamMap.get("mail");

    this.route.queryParamMap.subscribe(queryParams => {
      this.uniqueID = queryParams.get("mail");
    })
  }

  unsubscribe() {
    this._http.delete("api/Admin/unsubscribe/" + this.uniqueID)
      .subscribe(response => {
        if (response) {
          this.feedbackMessage("You are now removed from the mailing list", true)
        }
      })
  }

  feedbackMessage(message: string, successful: boolean) {
    if (successful) {
      this.feedback = message;
    } else {
      this.feedback = message;
    }
  }

}
