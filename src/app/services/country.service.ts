import { Injectable } from '@angular/core';

import { UserService } from './user.service';
import { Observable } from 'rxjs/Rx';
import { Country } from '../input-data/app.country';

@Injectable()
export class CountryService {

  private countries: Array<Country> = [
    { id: 1, name: 'Switzerland', epiIndex: 87.67 },
    { id: 2, name: 'Luxembourg', epiIndex: 83.29 },
    { id: 3, name: 'Australia', epiIndex: 82.4 },
    { id: 4, name: 'Singapore', epiIndex: 81.78 },
    { id: 5, name: 'Czech Republic', epiIndex: 81.47 },
    { id: 6, name: 'Germany', epiIndex: 80.47 },
    { id: 7, name: 'Spain', epiIndex: 79.09 },
    { id: 8, name: 'Austria', epiIndex: 78.32 },
    { id: 9, name: 'Sweden', epiIndex: 78.09 },
    { id: 10, name: 'Norway', epiIndex: 78.04 }
  ];

  constructor(private userService: UserService) {
  }

  getCountries(): Observable<any> {
    return Observable.of(this.countries);
  }

  getCountry(id: number): Observable<Country> {
    const country = this.countries.find(c => c.id === id);
    return Observable.of(country);
  }

  createCountry(country: Country): Observable<any> {
    // return Observable.of({}).delay(2000).flatMap(x => Observable.throw('Unable to create country'));
    let id = 0;
    this.countries.forEach(c => { if (c.id >= id) { id = c.id + 1; } });
    country.id = id; // id của phần tử tiếp theo được push vào mảng = id của phần tử cuối cùng trong mảng + 1
    this.countries.push(country); // thêm 1 phần tử vào cuối mảng
    return Observable.of(country);
  }

  updateCountry(updatedCountry: Country): Observable<any> {
    const country = this.countries.find(c => c.id === updatedCountry.id);
    // sao chép mọi thuộc tính của updatedCountry đến country (ghi đè nếu trùng nhau) và trả về country
    Object.assign(country, updatedCountry);
    return Observable.of(country).delay(2000);
    // return Observable.of({}).delay(2000).flatMap(x => Observable.throw(''));
  }

  deleteCountry(id: number): Observable<any> {
    // return Observable.of({}).delay(2000).flatMap(x => Observable.throw('Delete error'));
    return Observable.of({}).delay(2000)
     .do(e => this.countries.splice(this.countries.findIndex(c => c.id === id), 1));  // xóa 1 phần tử tại vị trí cụ thể trong mảng
  }

}
