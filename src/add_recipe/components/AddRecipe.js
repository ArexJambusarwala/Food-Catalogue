import React, { useEffect } from 'react';
import Header from './Header'
import Form from './Form'
import '../styles/addrecipe.css'
import { useDispatch } from 'react-redux';
import { clearSelectedIngredients } from '../../store/recipeSlice';

export default function AddRecipe() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearSelectedIngredients());
    }, [dispatch]);
    return(
        <>
            <Header />
            <br />
            <br />
            <Form />
            <br />
            <br />
        </>
    )
}

