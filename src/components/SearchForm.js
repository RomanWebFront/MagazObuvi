import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { SearchContext } from './SearchContext';

const SearchForm = ({hidden}) => {
    const {currentSearch, setCurrentSearch} = useContext(SearchContext);
    const navigate = useNavigate();

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            setCurrentSearch(event.target.value);
            navigate('/catalog');
        }
    };

    return (
        <form onSubmit={e => { e.preventDefault(); }} data-id="search-form" class={"header-controls-search-form form-inline "+(hidden ? "invisible":"")}>
            <input onKeyDown={handleKeyDown} class="form-control" placeholder="Поиск"></input>
        </form>
    );
}

export default SearchForm;