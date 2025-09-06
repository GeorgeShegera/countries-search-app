import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountryPageComponent } from './country-page/country-page.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'country/:code', component: CountryPageComponent},
];
