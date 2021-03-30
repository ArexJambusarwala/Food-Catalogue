import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedIngredients } from '../../store/recipeSlice';

export default function withHandlers(Component) {
    return function(baseProps) {
        const selectedIngredients = useSelector(selectSelectedIngredients);
        const [searchInput, setInput] = useState("");
        const [available, setAvailable] = useState(false);
        const [uploadedImages, setUploadedImages] = useState([]);
        const ingredientsInput = useRef(null);
        const inputImageHelp = useRef(null);
        const inputImageFile = useRef(null);

        function handleChange(event) {
            setCustomError();
            setInput(event.target.value.toLowerCase());
        }

        function handleFocus() {
            setAvailable(true);
        }

        function handleBlur() {
            setAvailable(false);
        }

        function setCustomError() {
            ingredientsInput.current.setCustomValidity("");
        }

        function handleAddNewImage() {
            inputImageFile.current.click();
        }

        function handleNewImage(event) {
            const file = event.target.files[0];
            let reader = new FileReader();
            reader.onload = function(event) {
                addToArray(event.target);
            }
            reader.readAsDataURL(file);
            event.target.value = "";
        }

        function addToArray(target) {
            setUploadedImages(prev => prev.concat(target.result));
            inputImageHelp.current.style.display = "inline";
        }

        function handleRemoveImage(event) {
            setUploadedImages(prev => [...prev.slice(0,event.target.id), ...prev.slice(event.target.id+1, prev.length)]);
        }
        
        useEffect(() => {
            if(!uploadedImages.length)
                inputImageHelp.current.style.display = "none";
        },[uploadedImages]);

        function handleSubmit(event) {
            if(!selectedIngredients.length) {
                ingredientsInput.current.setCustomValidity("Select atleast one ingredient!");
                ingredientsInput.current.reportValidity();
            }
            else
                alert("Thanks for sharing!");
            event.preventDefault();
        }
        const props = {
            handleAddNewImage,
            handleBlur,
            handleChange,
            handleFocus,
            setCustomError,
            handleNewImage,
            handleSubmit,
            handleRemoveImage,
            searchInput,
            available,
            ingredientsInput,
            inputImageHelp,
            inputImageFile,
            uploadedImages
        };
        return(<Component {...baseProps} {...props} />)
    }
}