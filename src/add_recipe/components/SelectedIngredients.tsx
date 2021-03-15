import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromSelectedIngredients, selectSelectedIngredients } from '../../store/recipeSlice'

function SelectedIngredient(props: { name: string; }) {
    const dispatch = useDispatch();
    function removeFromSelected() {
        dispatch(removeFromSelectedIngredients(props.name));
    }
    return(
        <button value={props.name} className="ingredient-selected-button" onClick={removeFromSelected}>
            {props.name}
            &ensp;<i className="fas fa-times"></i>
        </button>
    )
}

export default function SelectedIngredients() {
    const selectedIngredients = useSelector(selectSelectedIngredients);
    if(selectedIngredients.length)
        (document.getElementById("ingredients") as HTMLInputElement).setCustomValidity("");
    return(
        <span>
            {selectedIngredients.map((ingredient: string) => <SelectedIngredient key={ingredient} name={ingredient}/>)}
        </span>
    )
}