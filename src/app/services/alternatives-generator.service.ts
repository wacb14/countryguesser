import { Injectable } from '@angular/core';
import codes from '../../assets/maps_files/codes_name_continent_en.json';
import { Country } from '../models/country';
import { RestCountriesService } from './rest-countries.service';

@Injectable({
  providedIn: 'root',
})
export class AlternativesGeneratorService {
  africa = Object.keys(codes['africa_en']);
  asia = Object.keys(codes['asia_en']);
  australia = Object.keys(codes['australia_en']);
  europe = Object.keys(codes['europe_en']);
  northA = Object.keys(codes['north-america_en']);
  southA = Object.keys(codes['south-america_en']);
  world = Object.keys(codes['world_en']);

  constructor(private restCountriesService: RestCountriesService) {}

  generateRandom(maximum: number) {
    let min = 0;
    let max = maximum;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getCountriesByContinent(region: string) {
    let countries: Array<string> = [];
    switch (region) {
      case 'africa_en':
        countries = this.africa;
        break;
      case 'asia_en':
        countries = this.asia;
        break;
      case 'australia_en':
        countries = this.australia;
        break;
      case 'europe_en':
        countries = this.europe;
        break;
      case 'north-america_en':
        countries = this.northA;
        break;
      case 'south-america_en':
        countries = this.southA;
        break;
      case 'world_en':
        countries = this.africa.concat(
          this.asia,
          this.australia,
          this.europe,
          this.northA,
          this.southA
        );
        break;
    }
    return countries;
  }
  generateAlternatives(countryCode: string, region: string) {
    let generated: Array<string> = [];
    let alternatives: Array<Country> = [];
    let countries: Array<string> = this.getCountriesByContinent(region);
    //-- Choose countries
    let i = 0;
    while (i < 3) {
      let random = this.generateRandom(countries.length - 1);
      if (countries[random] != countryCode) {
        generated.push(countries[random]);
        countries.splice(random, 1);
        i++;
      }
    }
    //-- Randomize alternatives
    generated.push(countryCode);
    generated.sort(() => Math.random() - 0.5);

    for (const item of generated) {
      this.restCountriesService.getInfoByCode(item).subscribe((response) => {
        alternatives.push(
          new Country(generated[i], response[0].name.common, region)
        );
      });
    }
    return alternatives;
  }
}
