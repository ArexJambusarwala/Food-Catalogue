import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import expandReducer from './expandSlice'
import recipeReducer from './recipeSlice'

export default createStore(
    combineReducers({
        expanded: expandReducer,
        recipe: recipeReducer
    }),
    composeWithDevTools()
)