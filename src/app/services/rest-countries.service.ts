import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import countries from '../../assets/maps_files/restcountries.com_v3.1_all.json';
@Injectable({
  providedIn: 'root',
})
export class RestCountriesService {
  getInfoByCode(code: string): Observable<any> {
    let countryInfo = countries.filter((c) => c.cca2 === code.toUpperCase())[0];
    return of(countryInfo);
  }
}
