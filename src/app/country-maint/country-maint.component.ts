import { Component, OnInit } from '@angular/core';
import { Country } from '../input-data/app.country';
import { Router } from '@angular/router';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-country-maint',
  templateUrl: './country-maint.component.html',
  styleUrls: ['./country-maint.component.css']
})
export class CountryMaintComponent {

  countries: Array<Country>;
  deleteError: string;
  deleteId: number;
  isDeleting = false;

  constructor(private countryService: CountryService,
              private router: Router) {
    countryService.getCountries().subscribe((data) => this.countries = data);
  }

  // hàm navigate ở đây có 3 tham số, tương ứng với route: country-detail/:id/:operation
  showCountryDetail(id: number) {
    this.router.navigate(['/authenticated/country-detail', id, 'details']);
  }

  createCountry() {
    this.router.navigate(['/authenticated/country-detail', 0, 'create']);
  }

  editCountry(id: number) {
    this.router.navigate(['/authenticated/country-detail', id, 'edit']);
  }

  deleteCountryQuestion(id: number) {
    this.deleteError = null;
    this.deleteId = id;
  }

  deleteCountry(id: number) {
    this.isDeleting = true;
    this.countryService.deleteCountry(id).subscribe(
      c => this.cancelDelete(),
      err => { this.deleteError = err; this.isDeleting = false; }
      );
  }

  cancelDelete() {
    this.isDeleting = false;
    this.deleteId = null;
  }

}
