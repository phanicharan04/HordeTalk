import React, { useState, useCallback } from 'react';
import searchimg from "../logos/search.gif";
import axios from 'axios';
import { Link } from 'react-router-dom';

function Search() {
  const [sresult, setsresult] = useState([]);
  const [query, setQuery] = useState('');

  const search = async (name) => {
    if (!name) {
      setsresult([]); // Clear results if the input is empty
      return;
    }
    
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_backendUserURL}/search/`, { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setsresult(data);
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
    debouncedSearch(value);
  };

  return (
    <div className="searchbar">
      <img src={searchimg} alt="Search" className="searchIcon" />
      <input
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
        className="searchInput"
      />
      {sresult.length > 0 && (
        <div className='search-results'>
          {sresult.map((e, i) => (
            <div key={i}>
            <Link to={`/profiles/${e?._id}`}>
                { e?.fname}
            </Link>
                </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
