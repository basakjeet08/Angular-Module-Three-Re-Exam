import { Component, EventEmitter, Output } from '@angular/core';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
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
  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  // This function is invoked when the user clicks on the login button
  onLoginClick() {
    // Starting the loading state
    this.loaderService.startLoading();

    // Calling the API
    this.authService.loginUser(this.userInput).subscribe({
      // Success State
      next: (data) => {
        this.loaderService.endLoading();

        this.toastService.showToast({
          type: 'success',
          message: 'User Logged in successfully !!',
        });

        this.successEmitter.emit(data?.role);
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
