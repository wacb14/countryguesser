import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AppLogoComponent } from '../../components/app-logo/app-logo.component';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector.component';
import { MapComponent } from '../../components/map/map.component';
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
  imports: [
    AppLogoComponent,
    FormsModule,
    LanguageSelectorComponent,
    MapComponent,
    TranslatePipe,
  ],
  templateUrl: './main-menu.component.html',
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
  selectedNumberQuestions = 5;

  constructor(
    private router: Router,
    private authFlagsService: AuthFlagsService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadPreferences();
  }

  savePreferences(
    gameMode: string,
    continent: string,
    numberQuestions: string,
  ) {
    this.localStorageService.set(
      'language',
      this.translateService.currentLang() ?? 'en',
    );
    this.localStorageService.set('gameMode', gameMode);
    this.localStorageService.set('continent', continent);
    this.localStorageService.set('numberQuestions', numberQuestions);
  }

  startGame(gameMode: string, continent: string, numberQuestions: string) {
    this.authFlagsService.startGame = true;
    this.authFlagsService.currentGameMode = gameMode;
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
      this.localStorageService.get('numberQuestions'),
    );
    this.selectedNumberQuestions = this.preferences.numberQuestions;
  }
}
