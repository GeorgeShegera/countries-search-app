import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string | Date, format: 'short' | 'long' | 'custom' = 'short'): string {
    if(!value){
      return '';
    }

    const date = new Date(value);
    switch (format) {
      case 'long':
        return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      case 'custom':
        return date.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
      case 'short':
      default:
        return date.toLocaleDateString();
    }
 }
}
