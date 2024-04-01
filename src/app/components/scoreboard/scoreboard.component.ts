import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css'],
})
export class ScoreboardComponent implements OnInit {
  //-- Spinner attributes
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;
  diameter = 300;
  strokeWidth = 16;

  message: string = 'Congrats!';
  rating: Array<number> = [50, 75];
  points: string = '0';

  ngOnInit(): void {
    this.value = (this.rating[0] / this.rating[1]) * 100;
  }
}
