export const selectRecipes = state => state.recipe.recipes
export const selectIngredients = state => state.recipe.ingredients
export const selectSelectedIngredients = state => state.recipe.selectedIngredients

export const {addToSelectedIngredients, removeFromSelectedIngredients, clearSelectedIngredients} = {
    addToSelectedIngredients(ingredient) {
        return {
            type: 'ADD_TO_SELECTED_INGREDIENTS',
            payload: ingredient
        }
    },
    removeFromSelectedIngredients(ingredient) {
        return {
            type: 'REMOVE_FROM_SELECTED_INGREDIENTS',
            payload: ingredient
        }
    },
    clearSelectedIngredients() {
        return {
            type: 'CLEAR_SELECTED_INGREDIENTS'
        }
    }
};

export default function slice (state = {
    recipes: [
        {
            id: 1,
            username : "Arex",
            itemName : "Pizza",
            ingredients : ["flour", "cheese"],
            recipe : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.Epsum factorial non deposit quid pro quo hic escorol. Olypian quarrels et gorilla congolium sic ad nauseum.",
            images : ["assets/carousel-1.jpg", "assets/carousel-3.jpg"],
            comments : ["Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."]
        },
        {
            id: 2,
            username : "Micheal",
            itemName : "Pretzel",
            ingredients : ["milk", "sugar", "flour"],
            recipe : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.Epsum factorial non deposit quid pro quo hic escorol. Olypian quarrels et gorilla congolium sic ad nauseum.",
            images : ["assets/carousel-1.jpg", "assets/carousel-3.jpg"],
            comments : ["Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."]
        },
    ],
    ingredients: ["flour", "cheese", "milk", "sugar"],
    selectedIngredients: []
    }, action) {
    switch (action.type) {
        case 'ADD_TO_SELECTED_INGREDIENTS': {
            return {...state, selectedIngredients: state.selectedIngredients.concat(action.payload)};
        }
        case 'REMOVE_FROM_SELECTED_INGREDIENTS':
            return {
                ...state, 
                selectedIngredients: [...state.selectedIngredients.slice(0,state.selectedIngredients.indexOf(action.payload)),
                     ...state.selectedIngredients.slice(state.selectedIngredients.indexOf(action.payload)+1)]
            };
        case 'CLEAR_SELECTED_INGREDIENTS':
            return {...state, selectedIngredients: []};
        default:
            return state;
    }
}