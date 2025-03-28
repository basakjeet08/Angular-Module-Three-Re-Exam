import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from 'src/app/shared/models/users/UserDto';
import { ProfileService } from 'src/app/shared/services/profile.service';

export const adminGuard: CanActivateFn = (_route, _state) => {
  const profileService = inject(ProfileService);
  const router = inject(Router);

  if (profileService.getUser()?.role === UserRole.ADMIN) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
