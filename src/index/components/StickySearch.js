import React, { useEffect, useRef, useState } from 'react';
import '../styles/stickysearch.css'
import { toggle } from '../../store/expandSlice'
import { useDispatch } from 'react-redux';
import AvailableIngredients from './AvailableIngredients'
import SelectedIngredients from './SelectedIngredients'

const StickySearch = React.memo(function ({setExpandedSearchWrapperDisplay, setResultItemsOpacity}) {
    const dispatch = useDispatch();
    const [available, setAvailable] = useState(false);
    const [searchInput, setInput] = useState("");
    const closeSearchButton = useRef(null);
    const searchBarExpanded = useRef(null);
    const selectedIngredients = useRef(null);
    useEffect(() => {
        setExpandedSearchWrapperDisplay("block");
        searchBarExpanded.current.style.animation = "search 1.5s 0s 1 forwards";
        closeSearchButton.current.style.animation = "close 1.5s 0s 1 forwards";
        setTimeout(() => {
            searchBarExpanded.current.focus();
        }, 1300);
    }, [setExpandedSearchWrapperDisplay]);
    function handleFocus() {
        setAvailable(true);
        setResultItemsOpacity(0.3);
        selectedIngredients.current.style.opacity = "0.3";
    }
    function handleBlur() {
        setAvailable(false);
        setResultItemsOpacity(1);
        selectedIngredients.current.style.opacity = "0.8";
    }
    function handleChange(event) {
        setInput(event.target.value.toLowerCase());
    }
    function handleClose() {
        setExpandedSearchWrapperDisplay("none");
        dispatch(toggle());
    }
    return (
        <div id="sticky-search">
            <input type="text" id="search-bar-expanded" placeholder="Search recipes with ingredients" 
                onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} value={searchInput}
                ref={searchBarExpanded}/>
            <button id="close-search" onClick={handleClose} ref={closeSearchButton}>Back to home screen</button>
            {available ? <AvailableIngredients search={searchInput}/> : null}
            <SelectedIngredients ref={selectedIngredients} />
        </div>
    )
});

export default StickySearch;