import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { Country } from 'src/app/models/country';
import { AuthFlagsService } from 'src/app/services/auth-flags.service';
import { timeClock } from 'src/app/utils/timeClock';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.css'],
})
export class AnswerCardComponent implements OnInit {
  @Input() answer: Answer = new Answer(
    new Country('', '', '', ''),
    new Country('', '', '', '')
  );
  @Input() id: number = 0;
  @Input() time: number = 0;
  gameMode = 'maps';
  constructor(private authFlagsService: AuthFlagsService) {}

  ngOnInit(): void {
    this.gameMode = this.authFlagsService.currentGameMode;
  }
  timeClock = timeClock;
}
