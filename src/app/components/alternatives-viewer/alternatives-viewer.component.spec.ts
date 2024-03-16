import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativesViewerComponent } from './alternatives-viewer.component';

describe('AlternativesViewerComponent', () => {
  let component: AlternativesViewerComponent;
  let fixture: ComponentFixture<AlternativesViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlternativesViewerComponent]
    });
    fixture = TestBed.createComponent(AlternativesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
