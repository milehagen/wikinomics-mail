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
      window.localStorage.setItem('english', 'false');
      this.english = JSON.parse(window.localStorage.getItem('english'));
    } else {
      window.localStorage.setItem('english', 'true');
      this.english = JSON.parse(window.localStorage.getItem('english'));
    }
    console.log(this.english)
  }

 
}
