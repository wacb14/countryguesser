import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { mapsColors } from 'src/app/models/mapsColors';
import { AuthFlagsService } from 'src/app/services/auth-flags.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import {
  gameModeSelectOptions,
  continentSelectOptions,
  questionsSelectOptions,
} from 'src/app/models/selectsOptions';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent implements OnInit {
  colors = mapsColors;
  preferences = {
    language: 'en',
    gameMode: 'maps',
    continent: 'world_en',
    numberQuestions: 5,
  };
  gameModeSelectOptions = gameModeSelectOptions;
  continentSelectOptions = continentSelectOptions;
  questionsSelectOptions = questionsSelectOptions;

  constructor(
    private router: Router,
    private authFlagsService: AuthFlagsService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadPreferences();
  }

  savePreferences(
    gameMode: string,
    continent: string,
    numberQuestions: string
  ) {
    this.localStorageService.set('language', this.translateService.currentLang);
    this.localStorageService.set('gameMode', gameMode);
    this.localStorageService.set('continent', continent);
    this.localStorageService.set('numberQuestions', numberQuestions);
  }

  startGame(gameMode: string, continent: string, numberQuestions: string) {
    console.log(continent);
    this.authFlagsService.startGame = true;
    this.savePreferences(gameMode, continent, numberQuestions);
    const extras: NavigationExtras = {
      state: {
        continent: continent,
        numberQuestions: numberQuestions,
      },
    };
    this.router.navigate(['/', 'maps'], extras);
  }

  loadPreferences() {
    this.preferences.language = this.localStorageService.get('language');
    this.preferences.gameMode = this.localStorageService.get('gameMode');
    this.preferences.continent = this.localStorageService.get('continent');
    this.preferences.numberQuestions = Number(
      this.localStorageService.get('numberQuestions')
    );
  }
}
