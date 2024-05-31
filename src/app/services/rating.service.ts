import { EventEmitter, Injectable, Output } from '@angular/core';
import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  @Output() ratingSender = new EventEmitter<Answer>();
  @Output() timeOverSender = new EventEmitter<boolean>();
  constructor() {}
}
