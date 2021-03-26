import React, { useEffect, useRef, useState } from 'react';
import '../styles/stickysearch.css'
import { toggle } from '../../store/expandSlice'
import { useDispatch } from 'react-redux';
import AvailableIngredients from './AvailableIngredients'
import SelectedIngredients from './SelectedIngredients'

const StickySearch = React.memo(function ({
        showExpandedSearchWrapper, 
        hideExpandedSearchWrapper,
        setResultItemsOpacity
    }) {
    const dispatch = useDispatch();
    const [available, setAvailable] = useState(false);
    const [searchInput, setInput] = useState("");
    const expandedInput = useRef(null);
    const closeSearch = useRef(null);
    useEffect(() => {
        showExpandedSearchWrapper();
        expandedInput.current.style.animation = "search 1.5s 0s 1 forwards";
        closeSearch.current.style.animation = "close 1.5s 0s 1 forwards";
        setTimeout(() => {
            expandedInput.current.focus();
        }, 1300);
    }, [showExpandedSearchWrapper]);
    function handleFocus() {
        setAvailable(true);
        setResultItemsOpacity(0.3);
        document.getElementById("selected-ingredients").style.transition = "0.2s ease-in";
    }
    function handleBlur() {
        setAvailable(false);
        setResultItemsOpacity(1);
        document.getElementById("selected-ingredients").style.opacity = "0.8";
    }
    function handleChange(event) {
        setInput(event.target.value.toLowerCase());
    }
    function handleClose() {
        hideExpandedSearchWrapper();
        dispatch(toggle());
    }
    return (
        <div id="sticky-search">
            <input type="text" id="search-bar-expanded" placeholder="Search recipes with ingredients" 
                onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} value={searchInput} 
                ref={expandedInput} autoComplete="off"/>
            <button id="close-search" onClick={handleClose} ref={closeSearch}>Back to home screen</button>
            {available ? <AvailableIngredients search={searchInput}/> : null}
            <SelectedIngredients />
        </div>
    )
});

export default StickySearch;