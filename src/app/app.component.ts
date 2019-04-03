import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kit-car';
  url: string;
  constructor(private router: Router) {}

  redirect(url) {
    this.router.navigateByUrl(url);
  }
}
