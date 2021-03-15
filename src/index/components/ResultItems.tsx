import React from 'react';
import { useSelector } from 'react-redux';
import { selectRecipes, selectSelectedIngredients } from '../../store/recipeSlice'
import '../styles/resultitems.css'

function ResultItem({image, name, ingredients}: {image: string, name: string, ingredients: string[]}) {
    return (
        <a className="result-item" href="/">
            <img src={image} className="result-item-image" alt={name} />
            <br />
            <span className="result-item-name">{name}</span>
            <br />
            <span className="result-item-ingredients">
                {ingredients.reduce((acc: string, val: string, ind: number) => {
                    return ind !== ingredients.length -1 ? acc+=(val + ", ") : acc+=val;
                },"")}
            </span>
        </a>
    )
}

export default function ResultItems() {
    const selectedIngredients = useSelector(selectSelectedIngredients);
    const recipes = useSelector(selectRecipes);
    const recipesToBeDisplayed = recipes.filter((recipe: { ingredients: string[]; }) => 
        selectedIngredients.every((ingredient: string) => recipe.ingredients.includes(ingredient))
    );
    return(
        <div id="results">
            {recipesToBeDisplayed.map((recipe: { id: number; images: string[]; itemName: string; ingredients: string[]; }) => 
                <ResultItem 
                    key={recipe.id}
                    image={recipe.images[0]}
                    name={recipe.itemName}
                    ingredients={recipe.ingredients}
                />
            )}
        </div>
    )
}