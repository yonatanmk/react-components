
import React, { createContext } from 'react';
import { SORT_ORDERS } from '../util'
import type { ISortOrder } from '../interfaces'

// interface ITableSortContext {
//   sortField: string;
//   sortOrder: ISortOrder;
//   setSortField: React.Dispatch<React.SetStateAction<string>>;
//   setSortOrder: React.Dispatch<React.SetStateAction<ISortOrder>>;
// }

// export const TableSortContext = createContext<ITableSortContext>({ ... })

export const TableSortContext = createContext({
  sortField: 'name',
  sortOrder: SORT_ORDERS.ASC as ISortOrder,
  setSortField: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
  setSortOrder: (() => {}) as React.Dispatch<React.SetStateAction<ISortOrder>>,
});