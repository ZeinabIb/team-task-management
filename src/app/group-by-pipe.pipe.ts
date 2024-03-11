import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {
  transform(collection: any[], property: string): any[] {
    if (!collection) {
      return [];
    }

    const groupedCollection = collection.reduce((accumulator, currentValue) => {
      const key = currentValue[property];
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(currentValue);
      return accumulator;
    }, {});

    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
  }
}
