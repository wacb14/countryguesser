import { AfterViewInit, Component, Input } from '@angular/core';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';
declare var $: any;

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css'],
})
export class MapViewerComponent implements AfterViewInit {
  
  countryCode: string = '';
  continentName: string = '';

  constructor(private questionsGeneratorService: QuestionsGeneratorService) {}

  ngAfterViewInit(): void {
    this.questionsGeneratorService.questionSender.subscribe((response) => {
      this.countryCode = response.code;
      this.continentName = response.continent;
      this.loadMap(response.continent,response.code);
    });
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
