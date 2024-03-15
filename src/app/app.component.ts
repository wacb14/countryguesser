import { Component, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title: string = 'countryGuesser';
  constructor() {}

  ngAfterViewInit(): void {
    this.loadMap('africa_en','cg');
  }

  //-- Changes the map showed in the card
  loadMap(name: string, regionCode:string) {
    this.emptyMapViewer();
    var map: any = $('#mapViewer');
    map.vectorMap({
      map: name,
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
    map.vectorMap('set', 'colors', regionCode, '#ff0000');
  }

  //-- Clear the viewer
  emptyMapViewer() {
    $('#mapViewer').empty();
  }
}
