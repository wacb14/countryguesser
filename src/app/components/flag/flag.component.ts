import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css'],
})
export class FlagComponent implements AfterViewInit, OnDestroy {
  @Input() flagUrl: string = '';
  @Input() id = 999999;

  questionGeneratorSubscription: Subscription = null!;

  constructor(private questionsGeneratorService: QuestionsGeneratorService) {}

  ngAfterViewInit(): void {
    this.questionGeneratorSubscription =
      this.questionsGeneratorService.questionSender.subscribe((response) => {
        this.flagUrl = response.flag;
      });
  }
  ngOnDestroy(): void {
    this.questionGeneratorSubscription.unsubscribe();
  }
}
