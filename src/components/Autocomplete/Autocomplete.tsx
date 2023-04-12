import "./Autocomplete.scss";
import React, { useState, useEffect, KeyboardEvent } from 'react';

export type IAutocompleteProps = {
  value: string;
  onChange: (val: string) => void;
  fetchSuggestions: (val: string) => Promise<string[]>;
};

const Autocomplete: React.FC<IAutocompleteProps> = ({ value: inputValue, onChange, fetchSuggestions }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);

  useEffect(() => {
    const getSuggestions = async () => {
      const suggestions = await fetchSuggestions(inputValue);
      setSuggestions(suggestions);
    };

    getSuggestions();
  }, [inputValue, fetchSuggestions]);

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
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
      {suggestions.length > 0 && (
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
