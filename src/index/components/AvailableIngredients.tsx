import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToSelectedIngredients, selectIngredients, selectSelectedIngredients } from '../../store/recipeSlice'

function AvailableIngredient(props: {name: string}) {
    const dispatch = useDispatch();
    function handleMouseDown() {
        dispatch(addToSelectedIngredients(props.name));
    }
    return (
        <button 
            value={props.name} 
            className="toggle-ingredient available--big"
            onMouseDown={handleMouseDown}>
                {props.name}
        </button>
    )
}

export default function AvailableIngredients(props: {search: string}) {
    const ingredients = useSelector(selectIngredients);
    const selectedIngredients = useSelector(selectSelectedIngredients)
    const ingredientsToDisplay = ingredients.filter((ingredient: string) => 
        (!selectedIngredients.includes(ingredient)&&ingredient.includes(props.search)));
    return (
        <div id="available-ingredients--big">
            {ingredientsToDisplay.map((ingredient: string) => 
                <AvailableIngredient name={ingredient} key={ingredient}/>)}
        </div>
    )
}