import "./TableLayout.scss";
import { useState } from 'react';
import uniq from 'lodash/uniq';
import Table from '../../components/Table';
import FilterBar from '../../components/FilterBar';
import Search from '../../components/Search';
import Multiselect from '../../components/Multiselect'
import { peopleRows, peopleColumns, songRows, songColumns } from './data';
import type { IFilter } from '../../interfaces';
import { FILTER_TYPES } from '../../util';


function TableLayout() {
  const [personSearch, setPersonSearch] = useState('');
  const [songSearch, setSongSearch] = useState('');
  const [countryFilters, setCountryFilters] = useState<string[]>([]);
  const peopleFilters: IFilter[] = [
    {
      type: FILTER_TYPES.SEARCH,
      field: 'name',
      value: personSearch,
    },
    {
      type: FILTER_TYPES.SELECT,
      field: 'country',
      value: countryFilters,
    },
  ];
  const countryOptions = uniq(peopleRows.map(row => row.country)).map(value => ({
    label: value,
    value,
  }));

  const handleCountrySelectChange = (selected: { label: string, value: string }[]) => {
    setCountryFilters(selected.map(option => option.value))
  }


  const songFilters: IFilter[] = [
    {
      type: FILTER_TYPES.SEARCH,
      field: 'name',
      value: songSearch,
    },
  ];

  return (
    <div className="TableLayout">
        <FilterBar>
          <Search label="Search People" search={personSearch} placeholder="Name" setSearch={setPersonSearch} />
          <Multiselect options={countryOptions} placeholder="Filter by Country" onChange={handleCountrySelectChange}/>
        </FilterBar>
        <div className="TableLayout__container">
          <Table 
            rows={peopleRows} 
            columns={peopleColumns} 
            defaultSortField="name" 
            backupSortField="name"
            filters={peopleFilters}
          />
        </div>
        <FilterBar>
          <Search label="Search Songs" search={songSearch} placeholder="Name" setSearch={setSongSearch} />
        </FilterBar>
        <div className="TableLayout__container">
          <Table
            rows={songRows}
            columns={songColumns}
            defaultSortField="name"
            backupSortField="name"
            filters={songFilters}
          />
        </div>
    </div>
  );
}

export default TableLayout;
