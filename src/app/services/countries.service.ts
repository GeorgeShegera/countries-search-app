import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Country, CountryDetails, Holiday } from '../../infrastructure/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private countries$ = new BehaviorSubject<Country[]>([]);

  private countryDetailsCache: Record<string, CountryDetails> = {};
  private holidaysCache: Record<string, Holiday[]> = {};


  constructor(private readonly http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    if (this.countries$.value.length > 0) {
      return this.countries$.asObservable();
    }
    return this.http
      .get<Country[]>(`${environment.apiUrl}/AvailableCountries`)
      .pipe(tap(countries => this.countries$.next(countries)));
  }

  getCountryDetails(countryCode: string): Observable<CountryDetails> {
    if (this.countryDetailsCache[countryCode]) {
      return of(this.countryDetailsCache[countryCode]);
    }
    return this.http
      .get<CountryDetails>(`${environment.apiUrl}/CountryInfo/${countryCode}`)
      .pipe(
        tap(details => (this.countryDetailsCache[countryCode] = details))
      );
  }

  getNextCountryHolidays(countryCode: string): Observable<Holiday[]> {
    if (this.holidaysCache[countryCode]) {
      return of(this.holidaysCache[countryCode]);
    }
    return this.http
      .get<Holiday[]>(`${environment.apiUrl}/NextPublicHolidays/${countryCode}`)
      .pipe(tap(holidays => (this.holidaysCache[countryCode] = holidays)));
  }
  getCountryHoidays(countryCode: string, year: number){
    return this.http
      .get<Holiday[]>(`${environment.apiUrl}/PublicHolidays/${year}/${countryCode}`);
  }

  getRandomCountries(count: number): Observable<{ details: CountryDetails; holidays: Holiday[] }[]> {
    return this.getAllCountries().pipe(
      map(countries => [...countries].sort(() => 0.5 - Math.random()).slice(0, count)),
      switchMap(randomCountries =>
        forkJoin(
          randomCountries.map(c =>
            forkJoin({
              details: this.getCountryDetails(c.countryCode),
              holidays: this.getNextCountryHolidays(c.countryCode),
            })
          )
        )
      )
    );
  }

  getFilteredCountries(countryName: string): Observable<{ details: CountryDetails; holidays: Holiday[] }[]> {
    return this.getAllCountries().pipe(
      map(countries => countries.filter(c =>
        c.name.toLowerCase().startsWith(countryName.toLowerCase())
      )),
      switchMap(filteredCountries => {
        if (filteredCountries.length === 0) {
          return of([]);
        }
        return forkJoin(
          filteredCountries.map(c =>
            forkJoin({
              details: this.getCountryDetails(c.countryCode),
              holidays: this.getNextCountryHolidays(c.countryCode),
            })
          )
        );
      })
    );
  }

  getCountryByCode(code: string, year: number): Observable<{ details: CountryDetails; holidays: Holiday[] }> {
    return forkJoin({
      details: this.getCountryDetails(code),
      holidays: this.getCountryHoidays(code, year),
    });
  }
}
