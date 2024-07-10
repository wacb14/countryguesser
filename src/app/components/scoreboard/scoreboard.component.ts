import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Answer } from 'src/app/models/answer';
import { AuthFlagsService } from 'src/app/services/auth-flags.service';
import { AuthService } from 'src/app/services/auth.service';
import { ScoresService } from 'src/app/services/scores.service';
import { timeClock } from 'src/app/utils/timeClock';

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
  times: Array<number> = [];

  form = this.formBuilder.group({
    inpPlayerName: ['', Validators.required],
  });
  get inpPlayerName() {
    return this.form.get('inpPlayerName');
  }
  formHidden = false;
  responseMessage = '';
  success = true;

  constructor(
    private router: Router,
    private scoresService: ScoresService,
    private authFlagsService: AuthFlagsService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    try {
      this.answers = history.state.answers.map(
        (ans: any) => new Answer(ans.country, ans.answer)
      );
      this.points = history.state.points;
      this.times = history.state.times;
      this.countRightAnswers();
    } catch (e) {
      console.log('Error:' + e);
    }
    this.authService
      .signInAnonymously()
      .then((userCredential) => {
        console.log('User signed in anonymously successfully');
      })
      .catch((error) => {
        console.error('Error signing in anonymously: ', error);
      });
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

  totalTime() {
    let total = 0;
    for (const time of this.times) {
      total += time;
    }
    return total;
  }

  timeClock = timeClock;

  saveHighScore() {
    let data = {
      mode: this.authFlagsService.currentGameMode,
      name: this.inpPlayerName?.value,
      time: this.totalTime(),
      score: this.points,
    };
    this.scoresService
      .createScore(data)
      .then(() => {
        this.authFlagsService.gameFinished = false;
        this.success = true;
        this.responseMessage = 'scoreboard.updateSuccess';
      })
      .catch((error) => {
        console.log('An error has ocurred: ' + error);
        this.success = false;
        this.responseMessage = 'scoreboard.updateError';
      });
    this.formHidden = true;
  }
  goHighScores() {
    this.router.navigate(['', 'highscores']);
  }
}
