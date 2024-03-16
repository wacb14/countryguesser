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
  generateQuestions(quantity: number) {
    let questions = [];
    for (let i = 0; i < quantity; i++) {
      let random = this.generateRandom(this.africa.length-1);
      questions.push(this.africa[random]);
      this.africa.splice(random,1);
    }
    return questions;
  }
}
