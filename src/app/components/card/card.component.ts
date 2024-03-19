import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { AlternativesGeneratorService } from 'src/app/services/alternatives-generator.service';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';
import { RestCountriesService } from 'src/app/services/rest-countries.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  questions: Array<Country> = [];
  currentCountry = new Country('', '', '');
  currentAlternatives: Array<string> = [];
  constructor(
    private questionsGeneratorService: QuestionsGeneratorService
  ) {}
  ngOnInit(): void {
    let continent = 'africa_en';
    let number_questions = 10;
    this.questions = this.questionsGeneratorService.generateQuestions(
      number_questions,
      continent
    );
    this.currentCountry = this.questions[0];
  }
}
