import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { AlternativesGeneratorService } from 'src/app/services/alternatives-generator.service';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';
@Component({
  selector: 'app-alternatives-viewer',
  templateUrl: './alternatives-viewer.component.html',
  styleUrls: ['./alternatives-viewer.component.css'],
})
export class AlternativesViewerComponent implements OnInit {
  alternatives: Array<Country> = [];
  answer = new Country('', '', '');
  constructor(
    private alternativesGeneratorService: AlternativesGeneratorService,
    private questionsGeneratorService: QuestionsGeneratorService
  ) {}
  ngOnInit(): void {
    this.questionsGeneratorService.questionSender.subscribe((response) => {
      this.answer = response;
      this.alternatives =
        this.alternativesGeneratorService.generateAlternatives(
          this.answer.code,
          this.answer.continent
        );
    });
  }
}
