import "./AutocompleteLayout.scss";
import { useState, useEffect } from 'react';
import Autocomplete from '../../components/Autocomplete';

import { fetchCountrySuggestions, fetchPokemonSuggestions } from '../../components/Autocomplete/utils';


const fetchSuggestionsAsync = (val: string): Promise<string[]> => new Promise((resolve) => {
  setTimeout(() => resolve(fetchCountrySuggestions(val)), 1000)
})

function AutocompleteLayout() {
  const [val, setVal] = useState('');
  const [val2, setVal2] = useState('');
  const [pokemon, setPokemon] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const results = await fetchPokemonSuggestions('pik');
  //     console.log(results)
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="AutocompleteLayout">
      <p>AutocompleteLayout</p>
      <p>Value 1: {val}</p>
      <Autocomplete value={val} onChange={(newVal: string) => setVal(newVal)} fetchSuggestions={fetchCountrySuggestions}/>
      <p>Value 2: {val}</p>
      <Autocomplete value={val2} onChange={(newVal: string) => setVal2(newVal)} fetchSuggestions={fetchSuggestionsAsync}/>
      <p>Pokemon Val: {pokemon}</p>
      <Autocomplete value={pokemon} onChange={(newVal: string) => setPokemon(newVal)} fetchSuggestions={fetchPokemonSuggestions}/>
    </div>
  )
}

export default AutocompleteLayout;