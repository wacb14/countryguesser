import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Answer } from 'src/app/models/answer';
import { Country } from 'src/app/models/country';
import { AuthFlagsService } from 'src/app/services/auth-flags.service';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnDestroy {
  questions: Array<Country> = [];
  currentCountry = new Country('', '', '', '');
  answers: Array<Answer> = [];
  times: Array<number> = [];
  currentIndex: number = 0;
  score: number = 0;
  showBtnNext: boolean = false;
  showBtnResults: boolean = false;

  pointingSubscription: Subscription = null!;

  constructor(
    private questionsGeneratorService: QuestionsGeneratorService,
    private ratingService: RatingService,
    private router: Router,
    private authFlagsService: AuthFlagsService
  ) {}

  ngOnInit(): void {
    //-- Receive parameters
    let continent = history.state.continent;
    let number_questions = history.state.numberQuestions;

    try {
      this.questions = this.questionsGeneratorService.generateQuestions(
        number_questions,
        continent
      );
      this.currentCountry = this.questions[0];
    } catch (error) {
      console.log('There was an error: ' + error);
    }

    this.pointingSubscription = this.ratingService.pointingSender.subscribe(
      (res: any) => {
        if (res.rating.isCorrect()) {
          this.score += 100 - res.time;
        }
        this.answers.push(res.rating);
        this.times.push(res.time);

        //-- Check if it's the last question
        if (this.answers.length == this.questions.length) {
          this.showBtnResults = true;
          this.authFlagsService.gameFinished = true;
        } else {
          this.showBtnNext = true;
        }
      }
    );
  }
  ngOnDestroy(): void {
    if (this.pointingSubscription) this.pointingSubscription.unsubscribe();
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
        times: this.times,
        points: this.score,
      },
    };
    this.router.navigate(['/', 'scoreboard'], extras);
  }
}
