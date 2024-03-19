import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment-dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestCountriesService {
  constructor(private htpp: HttpClient) {}

  getInfoByCode(code: string): Observable<any> {
    return this.htpp.get<any>(environment.apiURL + code);
  }
}
