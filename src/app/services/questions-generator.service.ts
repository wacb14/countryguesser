import { Injectable } from '@angular/core';
import codes from '../../assets/maps_files/codes_name_continent_en.json';

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

  constructor() {}

  generateRandom(maximum: number) {
    let min = 0;
    let max = maximum;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateQuestions(quantity: number, region: string) {
    let questions = [];
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

    for (let i = 0; i < quantity; i++) {
      let random = this.generateRandom(countries.length - 1);
      questions.push(countries[random]);
      countries.splice(random, 1);
    }
    return questions;
  }
}
