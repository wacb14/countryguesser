import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  colors = ['a', 'a', 'a', 'a'];
  disableButtons = false;
  @Output() rate = new EventEmitter<boolean>();

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

  findAnswerIndex() {
    let i = 0,
      found = false,
      index = -1;
    while (i < this.alternatives.length && !found) {
      if (this.alternatives[i].code == this.answer.code) {
        found = true;
        index = i;
      }
      i++;
    }
    return index;
  }

  rateQuestion(index: number) {
    this.colors = ['b', 'b', 'b', 'b'];
    if (this.alternatives[index].code == this.answer.code) {
      this.rate.emit(true);
      this.colors[index] = 'c';
    } else {
      this.rate.emit(false);
      this.colors[index] = 'w';
      let correctIndex = this.findAnswerIndex();
      console.log(correctIndex);
      this.colors[correctIndex] = 'c';
    }
    this.disableButtons = true;
  }
}
