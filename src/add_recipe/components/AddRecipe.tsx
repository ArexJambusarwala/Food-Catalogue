import React, { useEffect } from 'react';
import Header from './Header'
import Form from './Form'
import '../styles/addrecipe.css'
import { useDispatch } from 'react-redux';
import { clearSelectedIngredients } from '../../store/recipeSlice';
import withHandlers from './withHandlers'

export default function AddRecipe() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearSelectedIngredients());
    }, [dispatch]);
    const FormWithHandlers: React.FC = withHandlers(Form);
    return(
        <>
            <Header />
            <br />
            <br />
            <FormWithHandlers />
            <br />
            <br />
        </>
    )
}

