import { Component, Input } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.css'],
})
export class AnswerCardComponent {
  @Input() answer: Answer = new Answer(
    new Country('', '', ''),
    new Country('', '', '')
  );
  @Input() id: number = 0;
}
