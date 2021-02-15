import { LocationStrategy } from '@angular/common';
import { Component, Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isExpanded = false;
  norwegian = false;

  constructor(private url : LocationStrategy) {}

  ngOnInit() {
    if(this.url.path() === '/home/no') {
      this.norwegian = true;
    } else {
      this.norwegian = false;
    }
  }

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
      this.norwegian = false;
    } else {
      this.norwegian = true;
    }
  }
 
}
