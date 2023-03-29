import "./App.scss";
import { useState } from 'react';
// import Select from 'react-select';
import uniq from 'lodash/uniq';
import Table from '../Table';
import FilterBar from '../FilterBar';
import Search from '../Search';
import Multiselect from '../Multiselect'
import { peopleRows, peopleColumns, songRows, songColumns } from './data';
import type { IFilter } from '../../interfaces';
import { FILTER_TYPES } from '../../util';


function App() {
  const [personSearch, setPersonSearch] = useState('');
  const [songSearch, setSongSearch] = useState('');
  const [countryFilters, setCountryFilters] = useState<string[]>([]);
  // const [countryFilters, setCountryFilters] = useState([]);
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
    console.log('handleCountrySelectChange')
    console.log(selected)
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
    <div className="App">
        <FilterBar>
          <Search label="Search People" search={personSearch} placeholder="Name" setSearch={setPersonSearch} />
          <Multiselect options={countryOptions} placeholder="Filter by Country" onChange={handleCountrySelectChange}/>
        </FilterBar>
        <div className="App__container">
          <Table 
            rows={peopleRows} 
            columns={peopleColumns} 
            defaultSortPredicate="name" 
            backupSortPredicate="name"
            filters={peopleFilters}
          />
        </div>
        <FilterBar>
          <Search label="Search Songs" search={songSearch} placeholder="Name" setSearch={setSongSearch} />
        </FilterBar>
        <div className="App__container">
          <Table
            rows={songRows}
            columns={songColumns}
            defaultSortPredicate="name"
            backupSortPredicate="name"
            filters={songFilters}
          />
        </div>
    </div>
  );
}

export default App;
