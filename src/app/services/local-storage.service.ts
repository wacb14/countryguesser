import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  set(name: string, value: string) {
    localStorage.setItem(name, value);
  }
  get(name: string) {
    let value = localStorage.getItem(name);
    if (value) return value;
    else {
      switch (name) {
        case 'language':
          return 'en';
        case 'gameMode':
          return 'maps';
        case 'continent':
          return 'world_en';
        case 'numberQuestions':
          return '5';
      }
    }
    return '';
  }
  remove(name: string) {
    localStorage.removeItem(name);
  }
  clear() {
    localStorage.clear();
  }
}
