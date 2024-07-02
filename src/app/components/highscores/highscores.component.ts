import { Component } from '@angular/core';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css'],
})
export class HighscoresComponent {
  highScores = [
    { score: 50000, name: 'KNGBejar', time: 1500, mode: 'flags' },
    { score: 50000, name: 'KNGBejar', time: 1500, mode: 'flags' },
    { score: 50000, name: 'KNGBejar', time: 1500, mode: 'flags' },
    { score: 50000, name: 'KNGBejar', time: 1500, mode: 'flags' },
    { score: 50000, name: 'KNGBejar', time: 1500, mode: 'flags' },
    { score: 50000, name: 'KNGBejar', time: 1500, mode: 'flags' },
    { score: 50000, name: 'KNGBejar', time: 1500, mode: 'flags' },
    { score: 50000, name: 'KNGBejar', time: 1500, mode: 'flags' },
    { score: 50000, name: 'KNGBejar', time: 1500, mode: 'flags' },
    { score: 50000, name: 'KNGBejar', time: 1500, mode: 'flags' },
  ];
}
