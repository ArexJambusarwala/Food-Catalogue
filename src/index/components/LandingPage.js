import React, { useEffect } from 'react';
import Carousel from './Carousel'
import ButtonWrapper from './ButtonWrapper'
import '../styles/main.css'
import ExpandedSearch from './ExpandedSearch'
import { useDispatch, useSelector } from 'react-redux';
import { selectExpanded } from '../../store/expandSlice'
import { clearSelectedIngredients } from '../../store/recipeSlice';

export default function LandingPage() {
    const expand = useSelector(selectExpanded);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearSelectedIngredients());
    }, [dispatch]);
    return (
        <>
            {expand ? 
                <ExpandedSearch/> : 
                <>
                    <Carousel />
                    <ButtonWrapper />
                </>
            }
        </>
    )
}