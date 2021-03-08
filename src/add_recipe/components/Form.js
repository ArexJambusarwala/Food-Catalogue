import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedIngredients } from '../../store/recipeSlice';
import '../styles/form.css';
import AvailableIngredients from './AvailableIngredients';
import SelectedIngredients from './SelectedIngredients';
import UploadedImage from './UploadedImage';

export default function Form() {
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

    return (
        <div id="form-container">
            <form method="POST" action="/" id="form" onSubmit={handleSubmit}>
                <div className="field-wrapper">
                    <label htmlFor="username" className="label">Username 
                        <span className="mandatory-field" title="Mandotory field">*</span>
                    </label>
                    <input type="text" id="username" autoComplete="off" required />
                </div>
                <br />
                <div className="field-wrapper">
                    <label htmlFor="foodItem" className="label">Name of your dish 
                        <span className="mandatory-field" title="Mandotory field">*</span>
                    </label>
                    <input type="text" id="foodItem" autoComplete="off" required />
                </div>
                <br />
                <div className="field-wrapper">
                    <label htmlFor="ingredients" className="label">Select or add new ingredients
                        <span className="mandatory-field" title="Mandotory field">*</span>
                    </label>
                    <input type="text" id="ingredients" autoComplete="off" value={searchInput} onChange={handleChange}
                        onFocus={handleFocus} onBlur={handleBlur}/>
                    <SelectedIngredients />
                    <br />
                    {available ? <AvailableIngredients search={searchInput}/> : null}
                </div>
                <br />
                <div id="recipe-wrapper" className="field-wrapper">
                    <label htmlFor="recipe" className="label">Recipe 
                        <span className="mandatory-field" title="Mandotory field">*</span></label>
                    <textarea id="recipe" rows="8" required></textarea>
                </div>
                <br />
                <div className="field-wrapper">
                    <label htmlFor="images" className="label">Upload Images&nbsp;
                    </label>
                    <span id="input-image-help">Click on an image to remove it</span>
                    <input type="file" name="images" id="images" accept="image/*" onChange={handleNewImage}/>
                    <br />
                    <div id="uploaded-images-container">
                        {uploadedImages.map((image, index) => <UploadedImage key={index}
                            src={image} id={index} removeHandler={handleRemoveImage}/>)}
                        <span id="uploaded-image-new" onClick={handleAddNewImage}>Click here to upload</span>
                    </div>
                </div>
                <br />
                <div id="comments-wrapper" className="field-wrapper">
                    <label htmlFor="comments" className="label">Comments</label>
                    <textarea id="comments" rows="4"></textarea>
                </div>
                <br />
                <input id="submit-button" type="submit"/>
            </form>
        </div>
    )
}