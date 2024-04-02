import { Country } from './country';

export class Answer {
  country: Country;
  answer: Country;
  constructor(country: Country, answer: Country) {
    this.country = country;
    this.answer = answer;
  }
  public isCorrect(): boolean {
    return this.country.code == this.answer.code;
  }
}
