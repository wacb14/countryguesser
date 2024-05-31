import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';
import { mapsColors } from 'src/app/models/mapsColors';
import { AuthFlagsService } from 'src/app/services/auth-flags.service';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent {
  colors = mapsColors;

  constructor(
    private router: Router,
    private questionsGeneratorService: QuestionsGeneratorService,
    private authFlagsService: AuthFlagsService
  ) {}
  startGame(gameMode: string, continent: string, numberQuestions: string) {
    this.authFlagsService.startGame = true;
    this.questionsGeneratorService.gameMode = gameMode;
    const extras: NavigationExtras = {
      state: {
        continent: continent,
        numberQuestions: numberQuestions,
      },
    };
    this.router.navigate(['/', 'maps'], extras);
  }
}
