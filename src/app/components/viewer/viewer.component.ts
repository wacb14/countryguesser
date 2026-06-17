import { Component, Input, OnInit } from '@angular/core';
import { FlagComponent } from '../flag/flag.component';
import { MapComponent } from '../map/map.component';
import { AuthFlagsService } from 'src/app/services/auth-flags.service';

@Component({
  selector: 'app-viewer',
  imports: [FlagComponent, MapComponent],
  templateUrl: './viewer.component.html',
})
export class ViewerComponent implements OnInit {
  gameMode = 'maps';

  constructor(private authFlagsService: AuthFlagsService) {}

  ngOnInit(): void {
    this.gameMode = this.authFlagsService.currentGameMode;
  }
}
