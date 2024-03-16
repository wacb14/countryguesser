import { Component, OnInit } from '@angular/core';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  questions: Array<string> = [];
  currentCountry = '';
  currentContinent = '';
  constructor(private questionsGeneratorService: QuestionsGeneratorService) {}
  ngOnInit(): void {
    this.questions = this.questionsGeneratorService.generateQuestions(
      10,
      'world_en'
    );
    this.currentContinent = 'world_en';
    this.currentCountry = this.questions[0];
  }
}
