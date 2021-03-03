import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromSelectedIngredients, selectSelectedIngredients } from '../store/recipeSlice'

function SelectedIngredient(props) {
    const dispatch = useDispatch();
    function removeFromSelected() {
        dispatch(removeFromSelectedIngredients(props.name));
    }
    return(
        <button value={props.name} className="toggle-ingredient selected" onClick={removeFromSelected}>
            {props.name}
            <i className="fas fa-times-circle"></i>
        </button>
    )
}

export default function SelectedIngredients() {
    const selectedIngredients = useSelector(selectSelectedIngredients);
    return(
        <div id="selected-ingredients">
            {selectedIngredients.map(ingredient => <SelectedIngredient key={ingredient} name={ingredient}/>)}
        </div>
    )
}