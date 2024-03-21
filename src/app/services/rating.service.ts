import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  @Output() ratingSender = new EventEmitter<boolean>();
  @Output() timeOverSender = new EventEmitter<boolean>();
  constructor() { }
}
