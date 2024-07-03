import { Component, Input, OnInit } from '@angular/core';
import { AuthFlagsService } from 'src/app/services/auth-flags.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
})
export class ViewerComponent implements OnInit {
  gameMode = 'maps';

  constructor(private authFlagsService: AuthFlagsService) {}

  ngOnInit(): void {
    this.gameMode = this.authFlagsService.currentGameMode;
  }
}
