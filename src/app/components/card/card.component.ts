import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  questions: Array<Country> = [];
  currentCountry = new Country('', '', '');
  answers: Array<boolean> = [];
  currentIndex: number = 0;
  score: number = 0;
  showNext: boolean = false;

  constructor(
    private questionsGeneratorService: QuestionsGeneratorService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    let continent = 'south-america_en';
    let number_questions = 10;
    this.questions = this.questionsGeneratorService.generateQuestions(
      number_questions,
      continent
    );
    this.currentCountry = this.questions[0];

    this.ratingService.ratingSender.subscribe((rating) => {
      this.showNext = true;
      if (rating) {
        this.score = this.score + 100;
      }
      this.answers.push(rating);
    });
  }

  nextQuestion() {
    this.currentIndex++;
    this.currentCountry = this.questions[this.currentIndex];
    this.showNext = false;
    this.questionsGeneratorService.questionSender.emit(this.currentCountry);
  }
}
