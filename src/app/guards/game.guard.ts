import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { QuestionsGeneratorService } from '../services/questions-generator.service';

export const gameGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const ratingService = inject(QuestionsGeneratorService);
  const router = inject(Router);
  if (!ratingService.startGame) {
    router.navigate(['/']);
  }
  return ratingService.startGame;
};
