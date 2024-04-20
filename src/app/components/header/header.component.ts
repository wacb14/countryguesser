import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  interval: any;
  time: number = 15;
  timeRemaining: number = 15;
  showTimer: boolean = true;
  message: string = '';
  timeOver = false;
  @Input() questions: Array<number> = [];
  @Input() score: number = 0;
  ratingSubscription: Subscription = null!;
  questionGeneratorSubscription: Subscription = null!;

  constructor(
    private ratingService: RatingService,
    private questionGeneratorService: QuestionsGeneratorService
  ) {}

  ngOnInit(): void {
    this.startTimer();
    this.showResult();
  }

  ngOnDestroy(): void {
    if (this.ratingSubscription) this.ratingSubscription.unsubscribe();
    if (this.questionGeneratorSubscription)
      this.questionGeneratorSubscription.unsubscribe();
  }

  startCountDown() {
    this.timeRemaining = this.time;

    this.interval = setInterval(() => {
      if (this.timeRemaining == 0) {
        this.stopTimer();
        this.timeOver = true;
        this.ratingService.timeOverSender.emit(this.timeOver);
      } else {
        this.timeRemaining--;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  startTimer() {
    this.questionGeneratorSubscription =
      this.questionGeneratorService.questionSender.subscribe((question) => {
        this.timeRemaining = this.timeRemaining;
        this.showTimer = true;
        this.message = '';
        this.timeOver = false;
        this.startCountDown();
      });
  }

  showResult() {
    this.ratingSubscription = this.ratingService.ratingSender.subscribe(
      (rating) => {
        this.showTimer = false;
        if (rating.isCorrect()) {
          this.message = 'CORRECT!';
          this.stopTimer();
        } else {
          if (this.timeOver) {
            this.message = "TIME'S UP!";
          } else {
            this.message = 'WRONG!';
            this.stopTimer();
          }
        }
      }
    );
  }
}