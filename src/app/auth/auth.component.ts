import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  // These are the data for this component
  isLoginMode = true;

  // Injecting the necessary depenedncies
  constructor(private router: Router, private route: ActivatedRoute) {}

  // This function is invoked when the user clicks on the login button
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // This function is invoked when the user registers
  onRegistrationSuccess() {
    this.isLoginMode = true;
  }

  // This function is invoked when the user logs in
  onLoginSuccess(role: string) {
    this.router.navigate(['../', role.toLowerCase()], {
      relativeTo: this.route,
    });
  }
}
