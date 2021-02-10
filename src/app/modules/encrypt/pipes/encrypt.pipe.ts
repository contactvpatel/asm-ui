import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encrypt',
})
export class EncryptPipe implements PipeTransform {
  transform(value: string): string {
    if (value === undefined || value === '') return value;
    return btoa(value);
  }
}
