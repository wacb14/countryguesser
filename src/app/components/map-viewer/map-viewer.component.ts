import { AfterViewInit, Component, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css'],
})
export class MapViewerComponent implements AfterViewInit {
  @Input() countryCode: string = '';
  @Input() continentName: string = '';

  ngAfterViewInit(): void {
    this.loadMap(this.continentName, this.countryCode);
  }

  //-- Changes the map showed in the card
  loadMap(continentName: string, countryCode: string) {
    this.emptyMapViewer();
    var map: any = $('#mapViewer');
    map.vectorMap({
      map: continentName,
      color: '#f4f3f0',
      enableZoom: true,
      hoverColor: '#c9dfaf',
      hoverOpacity: true,
      normalizeFunction: 'linear',
      selectedColor: null,
      // selectedColor: null,
      // colors: {
      //   za: '#2980b9',
      // },
      showTooltip: false,
    });
    map.vectorMap('set', 'colors', countryCode, '#ff0000');
  }

  //-- Clear the viewer
  emptyMapViewer() {
    $('#mapViewer').empty();
  }
}
