import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // This is the data for the component
  userInput = { email: '', password: '' };

  // This is the Output Emitter
  @Output('onSuccess') successEmitter = new EventEmitter<string>();

  // Injecting the required dependencies
  constructor(private authService: AuthService) {}

  // This function is invoked when the user clicks on the login button
  onLoginClick() {
    this.authService.loginUser(this.userInput).subscribe({
      // Success State
      next: (data) => this.successEmitter.emit(data.role),
    });
  }
}
