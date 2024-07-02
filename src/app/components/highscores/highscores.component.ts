import { Component, OnInit } from '@angular/core';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css'],
})
export class HighscoresComponent implements OnInit {
  tableVisible = false;
  highScores = [
    { score: 0, name: '', time: 0, mode: 'flags' },
    { score: 0, name: '', time: 0, mode: 'flags' },
    { score: 0, name: '', time: 0, mode: 'flags' },
    { score: 0, name: '', time: 0, mode: 'flags' },
    { score: 0, name: '', time: 0, mode: 'flags' },
    { score: 0, name: '', time: 0, mode: 'flags' },
    { score: 0, name: '', time: 0, mode: 'flags' },
    { score: 0, name: '', time: 0, mode: 'flags' },
    { score: 0, name: '', time: 0, mode: 'flags' },
    { score: 0, name: '', time: 0, mode: 'flags' },
  ];

  constructor(private scoresService: ScoresService) {}
  ngOnInit(): void {
    this.scoresService.getHighScores().subscribe((res: any) => {
      this.highScores = res;
      this.highScores = this.highScores.slice(0, 10);
      this.tableVisible = true;
    });
  }
}
