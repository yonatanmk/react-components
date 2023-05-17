import { useState } from 'react';
import classnames from 'classnames';
import orderBy from 'lodash/orderBy';
import "./Table.scss";
import Row from '../Row'
import type { ITableColumn, ITableHeaderRow, ISortOrder, IFilter } from '../../interfaces'
import HeaderCell from '../HeaderCell';
import { SORT_ORDERS, filterRows } from '../../util';
import { TableSortContext } from '../../contexts';

interface ITableProps<T> {
  className?: string;
  // rows: T[];
  rows: any[];
  columns: ITableColumn<T>[];
  defaultSortField: string;
  backupSortField: string;
  filters?: IFilter[];
};

function Table<T extends object>({ className, rows, columns, defaultSortField, backupSortField, filters }: ITableProps<T>) {
  const [sortField, setSortField] = useState(defaultSortField || columns[0]?.name,);
  const [sortOrder, setSortOrder] = useState(SORT_ORDERS.ASC as ISortOrder);
  const sortedColumns = [...columns].sort((a, b) => a.index > b.index ? 1 : -1);
  const headerColumns = sortedColumns.map(col => ({
    ...col,
    component: HeaderCell,
  }));

  const filteredRows = filters && filters.length > 0 ? filterRows(rows, filters)  : rows;

  const sortByColumn = columns.find(col => col.field === sortField) as ITableColumn<T>;
  const sortByFunction = sortByColumn.sortByFunction || sortField; // default to field value if there's no sort by function
  const sortedRows = orderBy(filteredRows, [sortByFunction, defaultSortField || backupSortField], [sortOrder, sortOrder]);

  const headerRow = columns.reduce((agg: Partial<ITableHeaderRow>, col) => ({
    ...agg,
    [col.field]: {
      props: {
        name: col.name,
        field: col.field,
      }
    },
  }), {} as Partial<ITableHeaderRow>) as ITableHeaderRow;

  return (
    <table className={classnames("table", className)}>
      <thead>
        <TableSortContext.Provider value={{ sortField, setSortField, sortOrder, setSortOrder }}>
          <Row className="row__header" row={headerRow} columns={headerColumns} isHeader/>
        </TableSortContext.Provider>
      </thead>
      <tbody>
        {sortedRows.map((row, index) => <Row key={index} row={row} columns={sortedColumns} />)}
      </tbody>
    </table>
  );
}

export default Table;