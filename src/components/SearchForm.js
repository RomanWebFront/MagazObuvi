import React from 'react';
import { useNavigate } from "react-router-dom";

const SearchForm = ({hidden}) => {

    const navigate = useNavigate();

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            navigate('/catalog');
        }
    };

    return (
        <form data-id="search-form" class={"header-controls-search-form form-inline "+(hidden ? "invisible":"")}>
            <input onKeyDown={handleKeyDown} class="form-control" placeholder="Поиск"></input>
        </form>
    );
}

export default SearchForm;