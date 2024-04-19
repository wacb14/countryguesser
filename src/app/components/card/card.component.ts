import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Answer } from 'src/app/models/answer';
import { Country } from 'src/app/models/country';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnDestroy {
  questions: Array<Country> = [];
  currentCountry = new Country('', '', '');
  answers: Array<Answer> = [];
  currentIndex: number = 0;
  score: number = 0;
  showBtnNext: boolean = false;
  showBtnResults: boolean = false;
  ratingSubscription: Subscription = null!;

  constructor(
    private questionsGeneratorService: QuestionsGeneratorService,
    private ratingService: RatingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let continent = 'south-america_en';
    let number_questions = 5;
    this.questions = this.questionsGeneratorService.generateQuestions(
      number_questions,
      continent
    );
    this.currentCountry = this.questions[0];

    this.ratingSubscription = this.ratingService.ratingSender.subscribe(
      (rating) => {
        if (rating.isCorrect()) {
          this.score = this.score + 100;
        }
        this.answers.push(rating);
        //-- Check if it's the last question
        if (this.answers.length == this.questions.length) {
          this.showBtnResults = true;
          this.ratingService.finished = true;
        } else {
          this.showBtnNext = true;
        }
      }
    );
  }
  ngOnDestroy(): void {
    if (this.ratingSubscription) this.ratingSubscription.unsubscribe();
  }

  nextQuestion() {
    this.currentIndex++;
    this.currentCountry = this.questions[this.currentIndex];
    this.showBtnNext = false;
    this.questionsGeneratorService.questionSender.emit(this.currentCountry);
  }

  goScoreboard() {
    const extras: NavigationExtras = {
      state: {
        answers: this.answers,
        points: this.score,
      },
    };
    this.router.navigate(['/', 'scoreboard'], extras);
  }
}
