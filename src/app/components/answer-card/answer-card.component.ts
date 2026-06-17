import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { FlagComponent } from '../flag/flag.component';
import { MapComponent } from '../map/map.component';
import { Answer } from 'src/app/models/answer';
import { Country } from 'src/app/models/country';
import { AuthFlagsService } from 'src/app/services/auth-flags.service';
import { timeClock } from 'src/app/utils/timeClock';

@Component({
  selector: 'app-answer-card',
  imports: [FlagComponent, MapComponent, NgClass, TranslatePipe],
  templateUrl: './answer-card.component.html',
})
export class AnswerCardComponent implements OnInit {
  @Input() answer: Answer = new Answer(
    new Country('', '', '', ''),
    new Country('', '', '', ''),
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
