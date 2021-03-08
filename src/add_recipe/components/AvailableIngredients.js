import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToSelectedIngredients, selectIngredients, selectSelectedIngredients } from '../../store/recipeSlice'

function AvailableIngredient(props) {
    const dispatch = useDispatch();
    function handleMouseDown() {
        dispatch(addToSelectedIngredients(props.name));
    }
    return (
        <button 
            value={props.name} 
            className="ingredient-select-button"
            onMouseDown={handleMouseDown}>
                {props.showText || props.name}
        </button>
    )
}

export default function AvailableIngredients(props) {
    const ingredients = useSelector(selectIngredients);
    const selectedIngredients = useSelector(selectSelectedIngredients)
    const ingredientsToDisplay = ingredients.filter(ingredient => 
        (!selectedIngredients.includes(ingredient)&&ingredient.includes(props.search)));
    return (
        <div id="available-ingredients--small">
            {ingredientsToDisplay.map(ingredient => 
                <AvailableIngredient name={ingredient} key={ingredient}/>)}
            {ingredients.indexOf(props.search) === -1 && props.search &&
                <AvailableIngredient name={props.search} showText={`Add new: ${props.search}`}/>}
        </div>
    )
}