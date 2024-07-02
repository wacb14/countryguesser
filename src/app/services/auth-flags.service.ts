import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthFlagsService {
  startGame: boolean = false;
  finished: boolean = false;

  constructor() { }
}
