import { Pipe, PipeTransform } from '@angular/core';
/**
 * returns number, string, array, or object
 */
@Pipe({
  name: 'typeOf'
})
export class TypeOfPipe implements PipeTransform {

  transform(value: any): string {
    if(typeof value !== "undefined") return Array.isArray(value) ?  'array' : typeof value;
    return value;
  }

}
