import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const profileService = inject(ProfileService);
  const router = inject(Router);

  if (profileService.getUser()) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
