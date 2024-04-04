import { Component } from '@angular/core';

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css'],
})
export class MapViewerComponent {
  countryCode: string = '';
  continentName: string = '';
}
