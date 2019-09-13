import { Pipe, PipeTransform, Injectable } from "@angular/core";

@Pipe({
  name: "filter"
})
@Injectable()

//Used to filter data displayed in a table 
export class FilterPipe implements PipeTransform {
  transform(data: any, filter: any, currentFilter: boolean): any {
    if (!filter) {
      return data;
    }

    if (!Array.isArray(data)) {
      return data;
    }

    if (filter && Array.isArray(data)) {
      let filterKeys = Object.keys(filter);

      //Filters and reduces data based on input
      if (currentFilter) {
        return data.filter(item =>
          filterKeys.reduce(
            (x, keyName) =>
              (x && new RegExp(filter[keyName], "gi").test(item[keyName])) ||
              filter[keyName] == "",
            true
          )
        );
      } else {
        return data.filter(item => {
          return filterKeys.some(keyName => {
            return (
              new RegExp(filter[keyName], "gi").test(item[keyName]) ||
              filter[keyName] == ""
            );
          });
        });
      }
    }
  }
}
