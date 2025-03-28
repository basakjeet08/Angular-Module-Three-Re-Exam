import { Router } from '@angular/router';
import { ProfileService } from './../../services/profile.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // Injecting the necessary depenedncies
  constructor(private profileService: ProfileService, private router: Router) {}

  // This function is invoked when the user clicks on the logout button
  onLogoutClick() {
    this.profileService.logout();
    this.router.navigate(['auth']);
  }
}
