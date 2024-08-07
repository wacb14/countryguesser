import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthFlagsService } from '../services/auth-flags.service';

export const resultsGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const ratingService = inject(AuthFlagsService);
  const router = inject(Router);
  if (!ratingService.gameFinished) {
    router.navigate(['/']);
  }
  return ratingService.gameFinished;
};
