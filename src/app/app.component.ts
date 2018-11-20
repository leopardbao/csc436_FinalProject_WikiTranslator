import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare let ga: any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'search';

  constructor(private router:Router){
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
        console.log('ga sent')
      }
    });
  }
}
