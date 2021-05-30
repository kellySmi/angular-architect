import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endsWith'
})
export class EndsWithPipe implements PipeTransform {

  transform(value: string, endStr: string | string[]): unknown {
    if(Array.isArray(endStr)) {
      return value ? endStr.some(e => value.endsWith(e)) : value;
    }
    return  value ? value.endsWith(endStr) : value;
  }

}
