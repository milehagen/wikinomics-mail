import { Component, Directive, HostListener } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isExpanded = false;
  showNav = true;
  previousScrollPosition = window.pageYOffset;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  scrollToTop(event) {
    window.scroll(0,0);
  }

  @HostListener('window:scroll') hideShow() {
    let currentScrollPosition = window.pageYOffset;
    if(this.previousScrollPosition > currentScrollPosition) {
        this.showNav = true;
    } else {
        this.showNav = false;
    }
    this.previousScrollPosition = currentScrollPosition;
}
}