import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthFlagsService } from '../services/auth-flags.service';

export const gameGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const ratingService = inject(AuthFlagsService);
  const router = inject(Router);
  if (!ratingService.startGame) {
    router.navigate(['/']);
  }
  return ratingService.startGame;
};
