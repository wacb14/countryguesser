import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Answer } from 'src/app/models/answer';
import { Country } from 'src/app/models/country';
import { AlternativesGeneratorService } from 'src/app/services/alternatives-generator.service';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';
import { RatingService } from 'src/app/services/rating.service';
@Component({
  selector: 'app-alternatives-viewer',
  templateUrl: './alternatives-viewer.component.html',
  styleUrls: ['./alternatives-viewer.component.css'],
})
export class AlternativesViewerComponent implements OnInit, OnDestroy {
  alternatives: Array<Country> = [];
  answer = new Country('', '', '', '');
  colors = ['a', 'a', 'a', 'a'];
  disableButtons = false;
  ratingSubscription: Subscription = null!;
  questionGeneratorSubscription: Subscription = null!;

  constructor(
    private alternativesGeneratorService: AlternativesGeneratorService,
    private questionsGeneratorService: QuestionsGeneratorService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.showNewAlternatives();
    this.ratingSubscription = this.ratingService.timeOverSender.subscribe(
      (timeOver) => {
        if (timeOver) this.rateQuestion(-1);
      }
    );
  }
  ngOnDestroy(): void {
    if (this.ratingSubscription) this.ratingSubscription.unsubscribe();
    if (this.questionGeneratorSubscription)
      this.questionGeneratorSubscription.unsubscribe();
  }

  showNewAlternatives() {
    this.questionGeneratorSubscription =
      this.questionsGeneratorService.questionSender.subscribe((question) => {
        this.answer = question;
        this.alternatives =
          this.alternativesGeneratorService.generateAlternatives(
            this.answer.code,
            this.answer.continent
          );
        //-- Reset attributes
        this.colors = ['a', 'a', 'a', 'a'];
        this.disableButtons = false;
      });
  }

  findAnswerIndex() {
    let i = 0,
      found = false,
      index = -1;
    while (i < this.alternatives.length && !found) {
      if (this.alternatives[i].code == this.answer.code) {
        found = true;
        index = i;
      }
      i++;
    }
    return index;
  }

  rateQuestion(index: number) {
    this.colors = ['b', 'b', 'b', 'b'];
    //-- If didn't answered or answered wrong
    if (index == -1 || this.alternatives[index].code != this.answer.code) {
      let userAnswer = null;
      if (index == -1) {
        userAnswer = new Answer(this.answer, new Country('', '', '','')); //-- Didn't answer
      } else {
        userAnswer = new Answer(this.answer, this.alternatives[index]);
      }
      this.ratingService.ratingSender.emit(userAnswer);
      this.colors[index] = 'w';
      let correctIndex = this.findAnswerIndex();
      this.colors[correctIndex] = 'c';
    }
    //-- Answered correctly
    else {
      let userAnswer = new Answer(this.answer, this.alternatives[index]);
      this.ratingService.ratingSender.emit(userAnswer);
      this.colors[index] = 'c';
    }
    this.disableButtons = true;
  }
}
