import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';
import { RatingService } from 'src/app/services/rating.service';
declare var $: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  //-- Critical attributes
  @Input() countryCode: string = 'pe';
  @Input() continentName: string = 'south-america_en';
  @Input() id: number = 99999;
  //-- Style attributes
  @Input() color: string = '#f4f3f0';
  @Input() enableZoom: boolean = true;
  @Input() hoverOpacity: boolean = true;
  @Input() selectedColor: string = null!;
  @Input() colors: object = null!;
  @Input() showTooltip: boolean = false;
  //-- Size attributes
  @Input() height = '90%'; //-- Height of the map in CSS units

  constructor(private questionsGeneratorService: QuestionsGeneratorService) {}
  ngAfterViewInit(): void {
    this.questionsGeneratorService.questionSender.subscribe((response) => {
      this.countryCode = response.code;
      this.continentName = response.continent;
      this.loadMap(this.continentName, this.countryCode);
    });
  }

  //-- Changes the map showed in the card
  loadMap(continentName: string, countryCode: string) {
    this.emptyMapViewer();
    var map: any = $('#mapViewer' + this.id);
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
