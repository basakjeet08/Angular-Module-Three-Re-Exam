import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // This is the data for the component
  userInput = { email: '', role: 'USER', password: '', confirmPassword: '' };

  // This is the Output Emitter
  @Output('onSuccess') successEmitter = new EventEmitter<void>();

  // Injecting the necessary dependencies
  constructor(private authService: AuthService) {}

  // This function is invoked when the user clicks on the register button
  onRegisterClick() {
    this.authService.registerUser(this.userInput).subscribe({
      // Success State
      next: () => this.successEmitter.emit(),
    });
  }
}
