import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // This is the data for the component
  userInput = { email: '', role: 'USER', password: '', confirmPassword: '' };

  // This is the Output Emitter
  @Output('onSuccess') successEmitter = new EventEmitter<string>();

  // This function is invoked when the user clicks on the register button
  onRegisterClick() {
    console.log(this.userInput);
  }
}
