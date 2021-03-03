import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToSelectedIngredients, selectIngredients, selectSelectedIngredients } from '../store/recipeSlice'

function AvailableIngredient(props) {
    const dispatch = useDispatch();
    function handleMouseDown() {
        dispatch(addToSelectedIngredients(props.name));
    }
    return (
        <button 
            value={props.name} 
            className="toggle-ingredient available"
            onMouseDown={handleMouseDown}>
                {props.name}
        </button>
    )
}

export default function AvailableIngredients(props) {
    const ingredients = useSelector(selectIngredients);
    const selectedIngredients = useSelector(selectSelectedIngredients)
    const ingredientsToDisplay = ingredients.filter(ingredient => 
        (!selectedIngredients.includes(ingredient)&&ingredient.includes(props.search)));
    return (
        <div id="available-ingredients">
            {ingredientsToDisplay.map(ingredient => 
                <AvailableIngredient name={ingredient} key={ingredient}/>)}
        </div>
    )
}