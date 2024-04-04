import { AfterViewInit, Component, Input } from '@angular/core';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';
declare var $: any;

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css'],
})
export class MapViewerComponent implements AfterViewInit {
  //idMapViewer=1
  countryCode: string = '';
  continentName: string = '';

  @Input() color: string = '#f4f3f0';
  @Input() enableZoom: boolean = true;
  @Input() hoverOpacity: boolean = true;
  @Input() selectedColor: string = null!;
  @Input() colors: object = null!;
  @Input() showTooltip: boolean = false;

  constructor(private questionsGeneratorService: QuestionsGeneratorService) {}

  ngAfterViewInit(): void {
    this.questionsGeneratorService.questionSender.subscribe((response) => {
      this.countryCode = response.code;
      this.continentName = response.continent;
      this.loadMap(response.continent, response.code);
    });
  }

  //-- Changes the map showed in the card
  loadMap(continentName: string, countryCode: string) {
    this.emptyMapViewer();
    var map: any = $('#mapViewer');
    map.vectorMap({
      map: continentName,
      color: this.color,
      enableZoom: this.enableZoom,
      hoverOpacity: this.hoverOpacity,
      normalizeFunction: 'linear',
      selectedColor: this.selectedColor,
      colors: this.colors,
      showTooltip: this.showTooltip,
    });
    map.vectorMap('set', 'colors', countryCode, '#f63340');
  }

  //-- Clear the viewer
  emptyMapViewer() {
    $('#mapViewer').empty();
  }
}
