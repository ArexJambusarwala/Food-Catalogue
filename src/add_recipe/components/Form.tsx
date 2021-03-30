import React, { LegacyRef } from 'react';
import '../styles/form.css';
import AvailableIngredients from './AvailableIngredients';
import SelectedIngredients from './SelectedIngredients';
import UploadedImage from './UploadedImage';

export default function Form({
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
}: {
    handleAddNewImage: (event: React.MouseEvent) => void,
    handleBlur: (event: React.FocusEvent) => void,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleFocus: (event: React.FocusEvent) => void,
    setCustomError: () => void,
    handleNewImage: (event: React.FormEvent<HTMLInputElement>) => void,
    handleSubmit: (event: { preventDefault: () => void; }) => void,
    handleRemoveImage: (event: React.MouseEvent<HTMLImageElement>) => void,
    searchInput: string,
    available: boolean,
    ingredientsInput: LegacyRef<HTMLInputElement>,
    inputImageHelp: LegacyRef<HTMLSpanElement>,
    inputImageFile: LegacyRef<HTMLInputElement>,
    uploadedImages: any[];
}) {
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
                        onFocus={handleFocus} onBlur={handleBlur} ref={ingredientsInput}/>
                    <SelectedIngredients setCustomError={setCustomError} />
                    <br />
                    {available ? <AvailableIngredients search={searchInput}/> : null}
                </div>
                <br />
                <div id="recipe-wrapper" className="field-wrapper">
                    <label htmlFor="recipe" className="label">Recipe 
                        <span className="mandatory-field" title="Mandotory field">*</span></label>
                    <textarea id="recipe" rows={8} required></textarea>
                </div>
                <br />
                <div className="field-wrapper">
                    <label htmlFor="images" className="label">Upload Images&nbsp;
                    </label>
                    <span id="input-image-help" ref={inputImageHelp}>Click on an image to remove it</span>
                    <input type="file" name="images" id="images" accept="image/*" onChange={handleNewImage}
                        ref={inputImageFile}/>
                    <br />
                    <div id="uploaded-images-container">
                        {uploadedImages.map((image: string, index: number) => <UploadedImage key={index}
                            src={image} id={index} removeHandler={handleRemoveImage}/>)}
                        <span id="uploaded-image-new" onClick={handleAddNewImage}>Click here to upload</span>
                    </div>
                </div>
                <br />
                <div id="comments-wrapper" className="field-wrapper">
                    <label htmlFor="comments" className="label">Comments</label>
                    <textarea id="comments" rows={4}></textarea>
                </div>
                <br />
                <input id="submit-button" type="submit"/>
            </form>
        </div>
    )
}