import { Injectable } from '@angular/core';
import {
  gameModeSelectOptions,
  continentSelectOptions,
  questionsSelectOptions,
} from 'src/app/models/selectsOptions';
import { languages } from 'src/app/models/languages';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  gameModeSelectOptions = gameModeSelectOptions;
  continentSelectOptions = continentSelectOptions;
  questionsSelectOptions = questionsSelectOptions;
  languages = languages;

  constructor() {}

  set(name: string, value: string) {
    localStorage.setItem(name, value);
  }
  verifyValue(array: Array<any>, value: any, func: any) {
    return array.find(func);
  }
  get(name: string) {
    let value = localStorage.getItem(name);
    switch (name) {
      case 'language':
        if (
          this.verifyValue(this.languages, value, (l: any) => {
            return l.code == value;
          }) &&
          value
        )
          return value;
        else return 'en';
      case 'gameMode':
        if (
          this.verifyValue(this.gameModeSelectOptions, value, (o: any) => {
            return o.value == value;
          }) &&
          value
        )
          return value;
        else return 'maps';
      case 'continent':
        if (
          this.verifyValue(this.continentSelectOptions, value, (o: any) => {
            return o.value == value;
          }) &&
          value
        )
          return value;
        else return 'world_en';
      case 'numberQuestions':
        if (
          this.verifyValue(this.questionsSelectOptions, value, (o: any) => {
            return o.value == value;
          }) &&
          value
        )
          return value;
        else return '5';
      default:
        return '';
    }
  }
  remove(name: string) {
    localStorage.removeItem(name);
  }
  clear() {
    localStorage.clear();
  }
}
