import { Component, Directive, HostListener } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isExpanded = false;
  english: boolean = true;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  scrollToTop(event) {
    window.scroll(0,0);
  }

  changeLanguage() {
    if(this.english) {
      this.english = false;
    } else {
      this.english = true;
    }
    
  }

 
}
