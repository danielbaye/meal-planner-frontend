import React, { useState, useEffect, useCallback } from 'react';
import { FormControl, ListGroup, InputGroup } from 'react-bootstrap';
import '../css/searchBar.css';
import api from "../../../api"
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
    onSearch: (seachString: string) => void
}

const SearchBar: React.FC<SearchBarProps> = React.memo(({ onSearch }) => {
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<{ title: string, id: string, imageUrl: string }[]>([]);
    const num_to_load = 5
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() =>
            setIsFocused(false)
            , 500)
    };


    const navigate = useNavigate();
    const handleNaviage = (id: string) => {
        navigate(`/recipe/${id}`)
    }


    // Using useCallback to memoize the function
    const fetchSuggestions = useCallback(async (query: string) => {
        if (query.length > 0) {
            try {

                const response = await api.get(`api/recipes/suggestions/?searchString=${query}&num_to_load=${num_to_load}`);
                console.log(response.data)
                if (response.status == 200)
                    setSuggestions(response.data.slice(0, num_to_load)); // Limit to 5 suggestions
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    }, []);

    // Fetch suggestions when the query changes
    useEffect(() => {
        fetchSuggestions(query);
    }, [query, fetchSuggestions]);

    return (
        <div className="search-bar-container">
            <InputGroup>
                <FormControl
                    type="text"
                    placeholder="Search recipes, ingredients..."
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ backgroundColor: `var(--pale-peach)`, fontSize: '20px', fontFamily: `Playfair Display`, color: `var(--olive-drab)` }}
                />
            </InputGroup>
            {suggestions.constructor === Array && suggestions.length > 0 && (
                <ListGroup className={`suggestions-list ${!isFocused ? 'transition-component-hidden' : 'transition-component'}`}>
                    {suggestions.map((suggestion, index) => (
                        <ListGroup.Item onClick={() => handleNaviage(suggestion.id)} key={index} className="suggestion-item d-flex align-items-center">
                            <img src={suggestion.imageUrl} className='suggestion-image' />
                            <p className='suggestion-text'>{suggestion.title}</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}
)

export default SearchBar;