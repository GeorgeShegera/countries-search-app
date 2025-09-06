import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { Country, CountryDetails, Holiday } from '../../infrastructure/country';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CountryCardComponent } from '../country-card/country-card.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [ReactiveFormsModule, CountryCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  protected randomCountries?: {
    details: CountryDetails;
    holidays: Holiday[];
  }[];
  protected visibleCountries?: {
    details: CountryDetails;
    holidays: Holiday[];
  }[];
  public searchControl = new FormControl('');

  constructor(private readonly countryService: CountriesService) { }

  ngOnInit(): void {
    this.countryService.getRandomCountries(3).subscribe(details => {
      this.randomCountries = details;
      this.visibleCountries = details;
    });


    this.searchControl.valueChanges.subscribe(value => {
      console.log('value changed', value);
      if(value === null || value === '') {
        this.visibleCountries = this.randomCountries;
        return;
      }
      this.countryService.getFilteredCountries(value).subscribe(result => {
          console.log(result);
          this.visibleCountries = result;
        }
      );
    });
  }
}
