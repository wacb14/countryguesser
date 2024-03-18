import { Component, OnInit } from '@angular/core';
import { AlternativesGeneratorService } from 'src/app/services/alternatives-generator.service';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';
import { RestCountriesService } from 'src/app/services/rest-countries.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  questions: Array<string> = [];
  currentCountry = '';
  currentContinent = '';
  currentAlternatives: Array<string> = [];
  constructor(
    private questionsGeneratorService: QuestionsGeneratorService,
    private alternativesGeneratorService: AlternativesGeneratorService,
    private restCountriesService: RestCountriesService
  ) {}
  ngOnInit(): void {
    this.questions = this.questionsGeneratorService.generateQuestions(
      10,
      'africa_en'
    );
    this.currentContinent = 'africa_en';
    this.currentCountry = this.questions[0];
    this.currentAlternatives = this.getAlternativesNames();
  }
  getAlternativesNames() {
    let names: Array<string> = [];
    let alternatives = this.alternativesGeneratorService.generateAlternatives(
      this.currentCountry,
      this.currentContinent
    );
    for (const alternative of alternatives) {
      this.restCountriesService
        .getNameByCode(alternative)
        .subscribe((response) => {
          names.push(response[0].name.common);
        });
    }
    return names;
  }
}
