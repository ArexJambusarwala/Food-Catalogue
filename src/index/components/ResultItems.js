import React from 'react';
import { useSelector } from 'react-redux';
import { selectRecipes, selectSelectedIngredients } from '../../store/recipeSlice'
import '../styles/resultitems.css'

function ResultItem({ image, name, ingredients}) {
    return (
        <a className="result-item" href="/">
            <img src={image} className="result-item-image" alt={name} />
            <br />
            <span className="result-item-name">{name}</span>
            <br />
            <span className="result-item-ingredients">
                {ingredients.reduce((acc, val, ind) => {
                    return ind !== ingredients.length -1 ? acc+=(val + ", ") : acc+=val;
                },"")}
            </span>
        </a>
    )
}

const ResultItems = React.memo(({resultItemsOpacity}) => {
    const selectedIngredients = useSelector(selectSelectedIngredients);
    const recipes = useSelector(selectRecipes);
    const recipesToBeDisplayed = recipes.filter((recipe) => 
        selectedIngredients.every((ingredient) => recipe.ingredients.includes(ingredient))
    );
    return(
        <div id="results" style={{opacity: resultItemsOpacity, transition: "0.2s ease-in"}}>
            {recipesToBeDisplayed.map((recipe) => 
                <ResultItem 
                    key={recipe.id}
                    image={recipe.images[0]}
                    name={recipe.itemName}
                    ingredients={recipe.ingredients}
                />
            )}
        </div>
    )
});

export default ResultItems