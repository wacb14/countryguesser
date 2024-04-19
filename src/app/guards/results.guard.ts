import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RatingService } from '../services/rating.service';

export const resultsGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const ratingService = inject(RatingService);
  const router = inject(Router);
  if (!ratingService.finished) {
    router.navigate(['/']);
  }
  return ratingService.finished;
};
