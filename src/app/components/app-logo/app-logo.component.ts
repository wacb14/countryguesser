import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-logo',
  templateUrl: './app-logo.component.html',
  styleUrls: ['./app-logo.component.css'],
})
export class AppLogoComponent {
  constructor(private router: Router) {}
  goMainMenu() {
    this.router.navigate(['/']);
  }
}
