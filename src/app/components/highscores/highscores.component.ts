import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { AppLogoComponent } from '../app-logo/app-logo.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  selector: 'app-highscores',
  imports: [
    AppLogoComponent,
    LanguageSelectorComponent,
    NgClass,
    TranslatePipe,
  ],
  templateUrl: './highscores.component.html',
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
    this.scoresService.getTopScores().subscribe((res: any) => {
      this.highScores = res;
      this.tableVisible = true;
    });
  }
}
