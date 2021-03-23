import { Component,OnInit } from "@angular/core";
import { NavigationEnd, Router } from '@angular/router';
import { filter } from "rxjs/operators";

declare var gtag;
@Component({
    selector: 'app-home',
    templateUrl: './signedUp.html',
    styleUrls: ['./home.component.css' ],
})

export class SignedUpComponent {
    constructor(private router : Router) {
        const navEndEvent = router.events.pipe(
            filter(e => e instanceof NavigationEnd)
          );
          navEndEvent.subscribe((e: NavigationEnd) => {
            // This is for google ads
            gtag('config', 'UA-192782067-1', { 'page_path': e.urlAfterRedirects });
          });
    }

    ngOnInit() {
        
        window.scroll(0,0);
        setTimeout(() => {
            this.router.navigate(['home/en']);
        }, 10000) // Redirected to home page after 5 sec
    }

}

@Component({
    selector: 'app-home',
    templateUrl: './signedUpNorwegian.html',
    styleUrls: ['./home.component.css'],
})

export class SignedUpNorwegianComponent {
    constructor(private router : Router) {
        const navEndEvent = router.events.pipe(
            filter(e => e instanceof NavigationEnd)
          );
          navEndEvent.subscribe((e: NavigationEnd) => {
            // This is for google ads
            gtag('config', 'UA-192782067-1', { 'page_path': e.urlAfterRedirects });
          });
    }

    ngOnInit() {
        window.scroll(0,0);

        setTimeout(() => {
            this.router.navigate(['home']);
        }, 10000) // Redirected to home page after 5 sec
    }
}