import React, { useState, useCallback } from 'react';
import searchimg from "../logos/search.gif";
import axios from 'axios';
import { useAuth } from '../context/UserContext';

function NetworkSearch({ fetchSearchResults }) {
  const [query, setQuery] = useState('');
  const { user } = useAuth();
  const search = async (name) => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_backendUserURL}/networksearch`, { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      
      fetchSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const debouncedSearch = useCallback(debounce(search, 300), []); // 300 ms debounce

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  
    if (value.trim() === '') {
      // Reset the full network list when input is cleared
      fetchSearchResults(user?.networks || []); 
    } else {
      // If there's input, trigger the search function
      debouncedSearch(value);
    }
  };  
  

  return (
    <div className="searchbar">
      <img src={searchimg} alt="Search" className="searchIcon" />
      <input
        placeholder="Search your networks"
        value={query}
        onChange={handleInputChange}
        className="searchInput"
      />
    </div>
  );
}

export default NetworkSearch;
