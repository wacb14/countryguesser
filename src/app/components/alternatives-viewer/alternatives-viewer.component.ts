import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-alternatives-viewer',
  templateUrl: './alternatives-viewer.component.html',
  styleUrls: ['./alternatives-viewer.component.css'],
})
export class AlternativesViewerComponent {
  @Input() alternatives: Array<string> = [];
  @Input() answer = '';
}