import { Component, Input } from '@angular/core';
import { CountryDetails, Holiday } from '../../infrastructure/country';
import { RouterLink } from '@angular/router';
import { DateFormatPipe } from '../pipes/date-format-pipe'

@Component({
  standalone: true,
  selector: 'app-country-card',
  imports: [RouterLink, DateFormatPipe],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.scss',
})
export class CountryCardComponent {
  @Input({required: true}) country!: {
    details: CountryDetails;
    holidays: Holiday[];
  }
}
