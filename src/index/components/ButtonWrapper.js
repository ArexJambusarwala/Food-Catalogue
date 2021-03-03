import React from 'react';
import '../styles/buttonwrapper.css'
import { toggle } from '../store/expandSlice'
import { useDispatch } from 'react-redux';

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
                <a id="add-new-recipe" href="add-recipe.html">
                    <button id="add-recipe" tabIndex="-1">
                        <span>Share your recipe with others!</span>
                    </button>
                </a>
            </div>
        </div>
    );
});

export default ButtonWrapper