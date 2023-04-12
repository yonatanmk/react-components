import countryList from './countries';
export { countryList }

export const fetchSuggestions = async (val: string) => {
  return countryList.filter(country => country.toLowerCase().includes(val.toLowerCase())).slice(0, 10)
}