// src/app/services/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signInAnonymously, UserCredential } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  signInAnonymously(): Promise<UserCredential> {
    return signInAnonymously(this.auth);
  }
}
