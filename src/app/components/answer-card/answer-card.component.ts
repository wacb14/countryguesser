import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { Country } from 'src/app/models/country';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.css'],
})
export class AnswerCardComponent implements OnInit {
  @Input() answer: Answer = new Answer(
    new Country('', '', '', ''),
    new Country('', '', '', '')
  );
  @Input() id: number = 0;
  gameMode = 'maps';

  constructor(
    private localStorageService:LocalStorageService
  ) {}

  ngOnInit(): void {
    this.gameMode = this.localStorageService.get('gameMode');
  }
}
