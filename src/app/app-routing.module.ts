import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { CardComponent } from './components/card/card.component';
import { resultsGuard } from './guards/results.guard';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { gameGuard } from './guards/game.guard';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'maps', component: CardComponent, canActivate: [gameGuard] },
  {
    path: 'scoreboard',
    component: ScoreboardComponent,
    canActivate: [resultsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
