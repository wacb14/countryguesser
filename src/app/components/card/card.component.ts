import { Component, OnInit } from '@angular/core';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  constructor(private questionsGeneratorService: QuestionsGeneratorService){}
  ngOnInit(): void {
    console.log(this.questionsGeneratorService.generateQuestions(10,'south-america'));
  }
}
