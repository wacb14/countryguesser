import { Component, Input, OnInit } from '@angular/core';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
})
export class ViewerComponent implements OnInit {
  gameType = 'maps';
  
  constructor(private questionsGeneratorService: QuestionsGeneratorService) {}

  ngOnInit(): void {
    this.gameType = this.questionsGeneratorService.gameType;
  }
}
