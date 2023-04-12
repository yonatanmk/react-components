import axios from 'axios';
import countryList from './countries';
export { countryList }

interface IPokemon {
  name: string;
  url: string;
}

export const fetchCountrySuggestions = (val: string) => {
  return countryList.filter(country => country.toLowerCase().includes(val.toLowerCase())).slice(0, 10)
}

export const fetchPokemonSuggestions = async (query: string) => {
  try {
    // const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0&name=${query}`);
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0`);
    const pokemonList = response?.data?.results as IPokemon[];
    return pokemonList?.filter((pokemon: any) => pokemon.name.includes(query)).map(pokemon => pokemon.name);
  } catch (error) {
    console.error(error);
    return [];
  }
}