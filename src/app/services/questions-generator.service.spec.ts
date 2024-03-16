import { TestBed } from '@angular/core/testing';

import { QuestionsGeneratorService } from './questions-generator.service';

describe('QuestionsGeneratorService', () => {
  let service: QuestionsGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
