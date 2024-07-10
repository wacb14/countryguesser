import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthFlagsService {
  startGame: boolean = false;
  gameFinished: boolean = false;
  currentGameMode: string = 'maps';

  constructor() {}
}
