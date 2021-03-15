import React from 'react';
import '../styles/buttonwrapper.css'
import { toggle } from '../../store/expandSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const ButtonWrapper = React.memo(function ButtonWrapper() {
    const dispatch = useDispatch();
    function handleExpandSearch() {
        dispatch(toggle());
    }
    return (
        <div id="button-container-wrapper">
            <div id="button-container">
                <div id="search-bar-wrapper">
                        <button id="search-bar" onClick={handleExpandSearch}>Search recipes with ingredients</button>
                </div>
                <Link id="add-new-recipe" to="/add-recipe">
                    <button id="add-recipe" tabIndex={-1}>
                        <span>Share your recipe with others!</span>
                    </button>
                </Link>
            </div>
        </div>
    );
});

export default ButtonWrapper