import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedIngredients } from '../../store/recipeSlice';

export default function withHandlers(Component) {
    return function() {
        const selectedIngredients = useSelector(selectSelectedIngredients);
        const [searchInput, setInput] = useState("");
        const [available, setAvailable] = useState(false);
        const [uploadedImages, setUploadedImages] = useState([]);

        function handleChange(event) {
            document.getElementById("ingredients").setCustomValidity("");
            setInput(event.target.value.toLowerCase());
        }

        function handleFocus() {
            setAvailable(true);
        }

        function handleBlur() {
            setAvailable(false);
        }

        function handleAddNewImage() {
            document.getElementById("images").click();
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
            document.getElementById("input-image-help").style.display = "inline";
        }

        function handleRemoveImage(event) {
            setUploadedImages(prev => [...prev.slice(0,event.target.id), ...prev.slice(event.target.id+1, prev.length)]);
        }
        
        useEffect(() => {
            if(!uploadedImages.length)
                document.getElementById("input-image-help").style.display = "none";
        },[uploadedImages]);

        function handleSubmit(event) {
            if(!selectedIngredients.length) {
                console.log(selectedIngredients);
                document.getElementById("ingredients").setCustomValidity("Select atleast one ingredient!");
                document.getElementById("ingredients").reportValidity();
            }
            else
                alert("Thanks for sharing!");
            event.preventDefault();
        }
        return(
        <Component
            handleAddNewImage={handleAddNewImage}
            handleBlur={handleBlur}
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleNewImage={handleNewImage}
            handleSubmit={handleSubmit}
            handleRemoveImage={handleRemoveImage}
            searchInput={searchInput}
            available={available}
            uploadedImages={uploadedImages}
        />)
    }
}