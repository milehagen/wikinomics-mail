import { Component, Directive, HostListener } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isExpanded = false;
  norwegian: boolean = JSON.parse(window.localStorage.getItem('norwegian'));

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  scrollToTop(event) {
    window.scroll(0,0);
  }

  // Changes language of navbar when language of page changes
  changeLanguage() {
    if(this.norwegian) {
      window.localStorage.setItem('norwegian', 'false');
      this.norwegian = JSON.parse(window.localStorage.getItem('norwegian'));
    } else {
      window.localStorage.setItem('norwegian', 'true');
      this.norwegian = JSON.parse(window.localStorage.getItem('norwegian'));
    }
    
  }

 
}
