import { Routes } from '@angular/router';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { CardComponent } from './components/card/card.component';
import { resultsGuard } from './guards/results.guard';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { gameGuard } from './guards/game.guard';
import { HighscoresComponent } from './pages/highscores/highscores.component';

export const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'maps', component: CardComponent, canActivate: [gameGuard] },
  {
    path: 'scoreboard',
    component: ScoreboardComponent,
    canActivate: [resultsGuard],
  },
  { path: 'highscores', component: HighscoresComponent },
];
