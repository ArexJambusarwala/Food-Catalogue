import React, { useEffect, useState } from 'react';
import '../styles/stickysearch.css'
import { toggle } from '../../store/expandSlice'
import { useDispatch } from 'react-redux';
import AvailableIngredients from './AvailableIngredients'
import SelectedIngredients from './SelectedIngredients'

export default function StickySearch() {
    const dispatch = useDispatch();
    const [available, setAvailable] = useState(false);
    const [searchInput, setInput] = useState("");
    useEffect(() => {
        document.getElementById("expanded-search-wrapper")!.style.display = "block";
        document.getElementById("search-bar-expanded")!.style.animation = "search 1.5s 0s 1 forwards";
        document.getElementById("close-search")!.style.animation = "close 1.5s 0s 1 forwards";
        setTimeout(() => {
            document.getElementById("search-bar-expanded")!.focus();
        }, 1300);
    }, []);
    function handleFocus() {
        setAvailable(true);
        document.getElementById("results")!.style.opacity = "0.3";
        document.getElementById("selected-ingredients")!.style.opacity = "0.3";
        document.getElementById("results")!.style.transition = "0.2s ease-in";
        document.getElementById("selected-ingredients")!.style.transition = "0.2s ease-in";
    }
    function handleBlur() {
        setAvailable(false);
        document.getElementById("results")!.style.opacity = "1";
        document.getElementById("selected-ingredients")!.style.opacity = "0.8";
        document.getElementById("results")!.style.transition = "0.2s ease-in";
    }
    function handleChange(event: { target: { value: string; }; }) {
        setInput(event.target.value.toLowerCase());
    }
    function handleClose() {
        document.getElementById("expanded-search-wrapper")!.style.display = "none";
        dispatch(toggle());
    }
    return (
        <div id="sticky-search">
            <input type="text" id="search-bar-expanded" placeholder="Search recipes with ingredients" 
                onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} value={searchInput}/>
            <button id="close-search" onClick={handleClose}>Back to home screen</button>
            {available ? <AvailableIngredients search={searchInput}/> : null}
            <SelectedIngredients />
        </div>
    )
}