import "./AutocompleteLayout.scss";
import { useState } from 'react';
import Autocomplete from '../../components/Autocomplete';

import { fetchSuggestions } from '../../components/Autocomplete/utils';

function AutocompleteLayout() {
  const [val, setVal] = useState('');

  const handleValChange = (newVal: string) => setVal(newVal)

  return (
    <div className="AutocompleteLayout">
      <p>AutocompleteLayout</p>
      <p>Value: {val}</p>
      <Autocomplete value={val} onChange={handleValChange} fetchSuggestions={fetchSuggestions}/>
    </div>
  )
}

export default AutocompleteLayout;