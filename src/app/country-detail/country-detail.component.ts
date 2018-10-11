import { Component, OnInit } from '@angular/core';
import { Country } from '../input-data/app.country';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../services/country.service';
import { FieldDefinition } from '../../fw/dynamic-forms/field-definition';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {

  country: Country;
  countryDefinition: Array<FieldDefinition> = [
    {
      key: 'id',
      type: 'number',
      isId: true,
      label: 'Id',
      required: true
    },
    { key: 'name',
      type: 'string',
      isId: false,
      label: 'Country Name',
      required: true
    },
    {
      key: 'epiIndex',
      type: 'number',
      isId: false,
      label: 'EPI Index',
      required: true
    }
  ];
  errorMessage: string;

  // tham số thứ 3 trong route: country-detail/:id/:operation
  operation: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService) { }

  ngOnInit() {
    this.operation = this.route.snapshot.params['operation'];

    // create new country
    if (this.operation === 'create') {
      this.country = { id: 0, name: '', epiIndex: null };
    } else {
      this.countryService.getCountry(this.route.snapshot.params['id'])
        .subscribe((newCountry: Country) => this.country = newCountry);
    }
  }

  createCountry(country: Country) {
    country.id = 0;
    this.errorMessage = null;
    this.countryService.createCountry(country).subscribe(
      c => this.router.navigate(['/authenticated/country-maint']),
      err => this.errorMessage = 'Error creating country'
    );
  }

  updateCountry(country: Country) {
    this.errorMessage = null;
    this.countryService.updateCountry(country).subscribe(
      c => this.router.navigate(['/authenticated/country-maint']),
      err => this.errorMessage = 'Error updating country'
    );
  }

}
