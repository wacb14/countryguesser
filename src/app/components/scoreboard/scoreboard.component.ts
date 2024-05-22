import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Answer } from 'src/app/models/answer';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css'],
})
export class ScoreboardComponent implements OnInit {
  //-- Spinner default attributes
  color: ThemePalette = 'primary';
  backgroundColor: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;
  diameter = 300;
  strokeWidth = 16;
  //-- Component default attributes
  message: string = 'Congrats!';
  rating: Array<number> = [0, 0];
  points: string = '0';
  answers: Array<Answer> = [];
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.answers = history.state.answers.map(
      (ans: any) => new Answer(ans.country, ans.answer)
    );
    this.points = history.state.points;
    this.countRightAnswers();
  }
  countRightAnswers() {
    for (const answer of this.answers) {
      if (answer.isCorrect()) {
        this.rating[0]++;
      }
    }
    this.rating[1] = this.answers.length;
    this.value = (this.rating[0] / this.rating[1]) * 100;
    if (this.value >= 80) this.message = 'scoreboard.message.congrats';
    else if (this.value > 50) this.message = 'scoreboard.message.notBad';
    else this.message = 'scoreboard.message.tryHarder';
  }
  newGame() {
    this.router.navigate(['/']);
  }
}
