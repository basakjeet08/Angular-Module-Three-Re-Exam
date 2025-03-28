import { Component, EventEmitter, Output } from '@angular/core';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
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
  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  // This function is invoked when the user clicks on the register button
  onRegisterClick() {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the Api
    this.authService.registerUser(this.userInput).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'User registered successfully !!',
        });

        this.successEmitter.emit();
      },

      // Error state
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
