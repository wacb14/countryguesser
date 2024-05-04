import { AfterViewInit, Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionsGeneratorService } from 'src/app/services/questions-generator.service';
declare var $: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  //-- Critical attributes
  @Input() countryCode: string = 'fj';
  @Input() continentName: string = 'world_en';
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
  questionGeneratorSubscription: Subscription = null!;

  constructor(private questionsGeneratorService: QuestionsGeneratorService) {}
  ngAfterViewInit(): void {
    //-- Load initial map
    try {
      this.loadMap(this.continentName, this.countryCode);
    } catch (error) {
      console.log(
        'There was an error while loading the map. Please refresh the page'
      );
    }
    //-- Changing map
    this.questionGeneratorSubscription =
      this.questionsGeneratorService.questionSender.subscribe((response) => {
        this.countryCode = response.code;
        this.continentName = response.continent;
        this.reloadMap(this.continentName, this.countryCode);
      });
  }
  ngOnDestroy(): void {
    if (this.questionGeneratorSubscription)
      this.questionGeneratorSubscription.unsubscribe();
  }

  //-- Changes the map showed in the card
  loadMap(continentName: string, countryCode: string) {
    let map: any = $('#map' + this.id);
    map.vectorMap({
      map: continentName,
      color: this.color,
      enableZoom: this.enableZoom,
      hoverOpacity: this.hoverOpacity,
      normalizeFunction: 'polynomial',
      selectedColor: this.selectedColor,
      colors: this.colors,
      showTooltip: this.showTooltip
    });
    map.vectorMap('set', 'colors', countryCode, '#f63340');
  }

  reloadMap(continentName: string, countryCode: string) {
    this.emptyMap();
    this.loadMap(continentName, countryCode);
  }

  //-- Clear the map
  emptyMap() {
    $('#map' + this.id).empty();
  }
}
