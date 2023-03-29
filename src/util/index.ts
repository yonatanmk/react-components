import includes from 'lodash/includes';
import type { IFilter } from '../interfaces';
import { FILTER_TYPES } from './_enums';

export * from './_enums';

// TODO TYPE filterfunctions
// const filterFunctions = {
//   name: (filter: IFilter, row: any) => {
//     if (filter.type === FILTER_TYPES.SEARCH && typeof filter.value === 'string') {
//       return searchMatch(row.name, filter.value.toLowerCase())
//     }
//     // TODO SELECT?
//     return false;
//   }
// }

export const filterRows = (rows: any, filters: IFilter[]) => {
  return rows.filter((row: any) => {
    return filters.every((filter: IFilter) => {
      if (filter.type === FILTER_TYPES.SEARCH && typeof filter.value === 'string') {
        return searchMatch(row[filter.field as string], filter.value.toLowerCase())
      } else if (filter.type === FILTER_TYPES.SELECT && Array.isArray(filter.value)) {
        return filter.value.length === 0 || includes(filter.value, row[filter.field as string]) // filter.value array has the value of row[filter.field]
      } else if (filter.type === FILTER_TYPES.CUSTOM && filter.filterMethod) {
        return filter.filterMethod(row);
      } else {
        return false;
      }
    })
  })
};

const searchMatch = (value: string, search: string): boolean => {
  return !!value && value.toLowerCase().indexOf(search) > -1;
};
