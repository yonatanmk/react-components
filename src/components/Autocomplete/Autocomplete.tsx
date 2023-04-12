import "./Autocomplete.scss";
import React, { useState, useEffect, useCallback, useRef, KeyboardEvent } from 'react';
import { debounce } from 'lodash';

export type IAutocompleteProps = {
  value: string;
  onChange: (val: string) => void;
  fetchSuggestions: (val: string) => string[] | Promise<string[]>;
};

const Autocomplete: React.FC<IAutocompleteProps> = ({ value: inputValue, onChange, fetchSuggestions }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggCache, setSuggCache] = useState<{[key: string]: string[]}>({})
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const valueRef = useRef(inputValue);

  const debouncedFetchSuggestions = useCallback(debounce(async () => {
    if (suggCache[valueRef.current]) return;
    if (valueRef.current) {
      setLoading(true);
      const suggestions = await fetchSuggestions(valueRef.current);
      setSuggestions(suggestions);
      setSuggCache(prev => ({...prev, [valueRef.current]: suggestions }))
      setLoading(false);
    }
  }, 500), [fetchSuggestions, suggCache, setLoading, setSuggestions, setSuggCache]);

  useEffect(() => {
    if (!valueRef.current) {
      setSuggestions([]);
      setLoading(false);
    } else if (suggCache[valueRef.current]) {
      setSuggestions(suggCache[valueRef.current]);
      setLoading(false);
    } else {
      debouncedFetchSuggestions();
    }
  }, [inputValue, suggCache, debouncedFetchSuggestions]);

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    valueRef.current = value;
    onChange(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    valueRef.current = suggestion;
    onChange(suggestion);
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' && selectedSuggestionIndex > 0) {
      setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
    } else if (event.key === 'ArrowDown' && selectedSuggestionIndex < suggestions.length - 1) {
      setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
    } else if (event.key === 'Enter' && selectedSuggestionIndex !== -1) {
      valueRef.current = suggestions[selectedSuggestionIndex]
      onChange(suggestions[selectedSuggestionIndex]);
      setSuggestions([]);
      setSelectedSuggestionIndex(-1);
    }
  };

  return (
    <div className="Autocomplete">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {loading && <div className="Autocomplete__Loading">Loading...</div>}
      {!loading && suggestions.length > 0 && inputValue.length > 0 && (
        <ul className="Autocomplete__Suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={selectedSuggestionIndex === index ? 'selected' : ''}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
