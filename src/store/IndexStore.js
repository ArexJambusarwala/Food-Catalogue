import { configureStore } from '@reduxjs/toolkit';
import expandReducer from './expandSlice'
import recipeReducer from './recipeSlice'

export default configureStore({
    reducer: {
        expanded: expandReducer,
        recipe: recipeReducer
    }
})