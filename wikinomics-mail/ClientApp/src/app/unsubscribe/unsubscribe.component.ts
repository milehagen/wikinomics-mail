import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Admin } from '../Models/Admin';
import { fade } from '../animations';
import { Statistic } from '../Models/Statistic';

@Component({
  selector: 'app-home',
  templateUrl: './unsubscribe.component.html',
  animations: [
    fade
  ]
})

export class UnsubscribeComponent {
  public unsubscribeForm: FormGroup;
  public unsubscribed: boolean;
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
    console.log("ID: " + this.uniqueID);
  }

  unsubscribe() {
    this._http.delete("api/MailAddress/unsubscribe/" + this.uniqueID)
      .subscribe(response => {
        if (response) {
          this.unsubscribed = true;
          this.feedbackMessage("You are now removed from the mailing list", true)
          this.updateDBStatistics();
        }
      },
        error => {
          console.log(error),
            this.feedbackMessage("We could not find you in our lists", false);
        }
      );
  }

  feedbackMessage(message: string, successful: boolean) {
    if (successful) {
      this.feedback = message;
    } else {
      this.feedback = message;
    }
  }


  updateDBStatistics() {
    var stats = new Statistic();

    stats.totalUnsubscribes = -1;

    stats.currentSubscribes = 0;
    stats.totalSubscribes = 0;

    this._http.put("api/Statistic", stats)
      .subscribe(response => {

      })
  }

}
