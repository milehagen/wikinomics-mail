import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent {

  showHeaderContent: Boolean = false;
  showNumber: Number = 1;

  constructor(){}

  ShowHeaderContent() {
    this.showHeaderContent = this.showHeaderContent ? false : true;
  }

  /*showRegistration() {
    let info = document.getElementById("info");
    let registration = document.getElementById("registration");
    const btnShowReg = document.getElementById("btnShowReg");

    if (info.className = "d-block") {
      info.className = "d-none";
      registration.className = "d-block";
      btnShowReg.className = "d-none";
    }

  }*/
}
