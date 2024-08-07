import { EventEmitter, Injectable, Output } from '@angular/core';
import codes from '../../assets/maps_files/codes_name_continent_en.json';
import { Country } from '../models/country';
import { RestCountriesService } from './rest-countries.service';
import { TranslateService } from '@ngx-translate/core';
import { languages } from '../models/languages';

@Injectable({
  providedIn: 'root',
})
export class QuestionsGeneratorService {
  africa = Object.keys(codes['africa_en']);
  asia = Object.keys(codes['asia_en']);
  australia = Object.keys(codes['australia_en']);
  europe = Object.keys(codes['europe_en']);
  northA = Object.keys(codes['north-america_en']);
  southA = Object.keys(codes['south-america_en']);
  world = Object.keys(codes['world_en']);

  @Output() questionSender = new EventEmitter<Country>();

  constructor(
    private restCountriesService: RestCountriesService,
    private translateService: TranslateService
  ) {}

  loadAllCountries() {
    this.africa = Object.keys(codes['africa_en']);
    this.asia = Object.keys(codes['asia_en']);
    this.australia = Object.keys(codes['australia_en']);
    this.europe = Object.keys(codes['europe_en']);
    this.northA = Object.keys(codes['north-america_en']);
    this.southA = Object.keys(codes['south-america_en']);
    this.world = Object.keys(codes['world_en']);
  }

  generateRandom(maximum: number) {
    let min = 0;
    let max = maximum;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getCountriesByContinent(region: string) {
    let countries: Array<string> = [];
    switch (region) {
      case 'africa_en':
        countries = this.africa;
        break;
      case 'asia_en':
        countries = this.asia;
        break;
      case 'australia_en':
        countries = this.australia;
        break;
      case 'europe_en':
        countries = this.europe;
        break;
      case 'north-america_en':
        countries = this.northA;
        break;
      case 'south-america_en':
        countries = this.southA;
        break;
      case 'world_en':
        countries = this.africa.concat(
          this.asia,
          this.australia,
          this.europe,
          this.northA,
          this.southA
        );
        break;
    }
    return countries;
  }
  //-- Returns the translation code for the current language of the app.
  private getTranslationCode() {
    let index = languages
      .map((l) => l.code)
      .indexOf(this.translateService.currentLang);
    return languages[index].translation;
  }
  generateQuestions(quantity: number, region: string) {
    this.loadAllCountries(); //-- To avoid the disappearance of countries
    let generated: Array<string> = [];
    let questions: Array<Country> = [];
    let countries: Array<string> = this.getCountriesByContinent(region);

    for (let i = 0; i < quantity; i++) {
      let random = this.generateRandom(countries.length - 1);
      generated.push(countries[random]);
      countries.splice(random, 1);

      if (generated[i] != undefined) {
        //-- Complete countries' info
        this.restCountriesService
          .getInfoByCode(generated[i])
          .subscribe((response) => {
            //-- English as default language
            let name = response[0].name.common;
            if (this.translateService.currentLang != 'en') {
              name = response[0].translations[this.getTranslationCode()].common;
            }
            questions.push(
              new Country(generated[i], name, response[0].flags.svg, region)
            );
            //-- Send the first question to viewer
            if (i == 0) this.questionSender.emit(questions[0]);
          });
      }
    }
    return questions;
  }
}
