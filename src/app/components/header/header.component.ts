import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlternativesGeneratorService } from 'src/app/services/alternatives-generator.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  interval: any;
  time: number = 20;
  timeRemaining: number = 20;
  showTimer: boolean = true;
  message: string = '';
  timeOver = false;

  @Input() questions: Array<number> = [];
  @Input() score: number = 0;

  ratingSubscription: Subscription = null!;
  questionGeneratorSubscription: Subscription = null!;

  constructor(
    private ratingService: RatingService,
    private alternativesGeneratorService: AlternativesGeneratorService
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
      this.alternativesGeneratorService.startTimerSender.subscribe((res) => {
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
          this.message = 'card.message.correct';
          this.stopTimer();
        } else {
          if (this.timeOver) {
            this.message = 'card.message.timeUp';
          } else {
            this.message = 'card.message.wrong';
            this.stopTimer();
          }
        }
        this.ratingService.pointingSender.emit({
          rating: rating,
          time: this.time - this.timeRemaining,
        });
      }
    );
  }
}
