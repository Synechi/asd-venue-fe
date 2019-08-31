import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(list: any[], tableHeader: string, input: string): any[] {
    if (!list) {
      return [];
    }
    if (!tableHeader || !input) {
      return list;
    }

    return list.filter(singleItem => singleItem[tableHeader].toLowerCase().includes(input.toLowerCase()));
  }
}