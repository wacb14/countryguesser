import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
})
export class ViewerComponent implements OnInit {
  gameMode = 'maps';

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.gameMode = this.localStorageService.get('gameMode');
  }
}
