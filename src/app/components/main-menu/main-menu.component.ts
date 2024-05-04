import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';
import { MapsColors } from 'src/assets/mapsColors';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent {
  colors = new MapsColors().colors;

  constructor(private router: Router,
    private questionsGeneratorService:QuestionsGeneratorService
  ) {}
  startGame(continent: string, numberQuestions: string) {
    this.questionsGeneratorService.optionsSelected=true;
    const extras: NavigationExtras = {
      state: { continent: continent, numberQuestions: numberQuestions },
    };
    this.router.navigate(['/', 'maps'],extras);
  }
}
