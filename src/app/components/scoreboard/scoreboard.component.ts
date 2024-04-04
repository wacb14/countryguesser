import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Answer } from 'src/app/models/answer';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css'],
})
export class ScoreboardComponent implements OnInit {
  //-- Spinner attributes
  color: ThemePalette = 'primary';
  backgroundColor: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;
  diameter = 300;
  strokeWidth = 16;

  message: string = 'Congrats!';
  rating: Array<number> = [50, 100];
  points: string = '0';
  answers: Array<Answer> = [
    new Answer(
      new Country('pe', 'Peru', 'south-america_en'),
      new Country('', '', '')
    ),
    new Answer(
      new Country('ar', 'Argentina', 'south-america_en'),
      new Country('pe', 'Peru', 'south-america_en')
    ),
    new Answer(
      new Country('pe', 'Peru', 'south-america_en'),
      new Country('pe', 'Peru', 'south-america_en')
    ),
    new Answer(
      new Country('', '', ''),
      new Country('pe', 'Peru', 'south-america_en')
    ),
    new Answer(
      new Country('ar', 'Argentina', 'south-america_en'),
      new Country('pe', 'Peru', 'south-america_en')
    ),
    new Answer(
      new Country('pe', 'Peru', 'south-america_en'),
      new Country('pe', 'Peru', 'south-america_en')
    ),
    new Answer(
      new Country('', '', ''),
      new Country('pe', 'Peru', 'south-america_en')
    ),
    new Answer(
      new Country('ar', 'Argentina', 'south-america_en'),
      new Country('pe', 'Peru', 'south-america_en')
    ),
    new Answer(
      new Country('pe', 'Peru', 'south-america_en'),
      new Country('pe', 'Peru', 'south-america_en')
    ),
  ];

  ngOnInit(): void {
    this.value = (this.rating[0] / this.rating[1]) * 100;
  }
}
