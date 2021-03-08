import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'recipeChecker',
    initialState: {
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
        selectedIngredients: [],
    },
    reducers: {
        addToSelectedIngredients: (state, action) => {
            state.selectedIngredients.push(action.payload);
        },
        removeFromSelectedIngredients: (state, action) => {
            state.selectedIngredients.splice(state.selectedIngredients.indexOf(action.payload), 1);
        },
        clearSelectedIngredients: state => {
            state.selectedIngredients = [];
        }
    }
});

export const selectRecipes = state => state.recipe.recipes
export const selectIngredients = state => state.recipe.ingredients
export const selectSelectedIngredients = state => state.recipe.selectedIngredients

export const {addToSelectedIngredients, removeFromSelectedIngredients, clearSelectedIngredients} = slice.actions;

export default slice.reducer