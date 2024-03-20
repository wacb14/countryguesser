import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  time: number = 3;
  timeRemaining: number = 3;
  timeEnded = false;
  ngOnInit(): void {
    this.startCountDown();
  }
  startCountDown() {
    this.timeRemaining = this.time;
    let interval: any = setInterval(() => {
      if (this.timeRemaining == 0) {
        clearInterval(interval);
        this.timeEnded = true;
      } else {
        this.timeRemaining--;
      }
    }, 1000);
  }
}
