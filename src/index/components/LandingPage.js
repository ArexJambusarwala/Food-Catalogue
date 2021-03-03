import React from 'react';
import Carousel from './Carousel'
import ButtonWrapper from './ButtonWrapper'
import '../styles/main.css'
import ExpandedSearch from './ExpandedSearch'
import { useSelector } from 'react-redux';
import { selectExpanded } from '../store/expandSlice'

export default function LandingPage() {
    const expand = useSelector(selectExpanded);
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