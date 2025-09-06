import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { CountriesService } from '../services/countries.service';
import { CountryDetails, Holiday } from '../../infrastructure/country';
import { DateFormatPipe } from '../pipes/date-format-pipe';

@Component({
  selector: 'app-country-page',
  imports: [RouterLink, NgIf, NgFor, DateFormatPipe],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss',
})
export class CountryPageComponent implements OnInit {
  code!: string;
  protected country!: { details: CountryDetails; holidays: Holiday[] };

  curYear = new Date().getFullYear();
  readonly minYear = 2020;
  readonly maxYear = 2030;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly countryService: CountriesService,
  ) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code')!;
    this.countryService.getCountryByCode(this.code, this.curYear).subscribe((res) => {
      console.log(res);
      this.country = res;
    });
  }

  setYear(year: number): void {
    if (this.curYear === year) {
      return;
    }

    this.curYear = year;
    this.countryService
      .getCountryHoidays(this.country.details.countryCode, year)
      .subscribe((holidays) => {
        this.country.holidays = holidays;
      });
  }

  changeYear(value: number): void {
    const newYear = this.curYear + value;

    if (newYear < this.minYear || newYear > this.maxYear) {
      alert(`year is out of range ${this.minYear}-${this.maxYear}`);
      return;
    }

    this.curYear = newYear;
    this.countryService
      .getCountryHoidays(this.country.details.countryCode, newYear)
      .subscribe((holidays) => {
        this.country.holidays = holidays;
      });
  }
}
