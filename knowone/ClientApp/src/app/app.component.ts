import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
declare var gtag;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router) {
    const navEndEvent = router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    );
    navEndEvent.subscribe((e: NavigationEnd) => {
      gtag('config', 'G-QHNRQGYB8W', { 'page_path': e.urlAfterRedirects });
    });
    
    
  }
}
