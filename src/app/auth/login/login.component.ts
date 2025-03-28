import { Component, EventEmitter, Output } from '@angular/core';

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

  // This function is invoked when the user clicks on the login button
  onLoginClick() {
    console.log(this.userInput);
  }
}
