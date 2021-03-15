import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedIngredients } from '../../store/recipeSlice';

interface InjectedHandlers {
        handleAddNewImage: (event: React.MouseEvent) => void,
        handleBlur: (event: React.FocusEvent) => void,
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
        handleFocus: (event: React.FocusEvent) => void,
        handleNewImage: (event: React.FormEvent<HTMLInputElement>) => void,
        handleSubmit: (event: { preventDefault: () => void; }) => void,
        handleRemoveImage: (event: React.MouseEvent<HTMLImageElement>) => void,
        searchInput: string,
        available: boolean,
        uploadedImages: any[];
}

export default function withHandlers<P>(Component: React.FC<P & InjectedHandlers>): React.FC<P> {
    return function(baseProps) {
        const selectedIngredients = useSelector(selectSelectedIngredients);
        const [searchInput, setInput] = useState("");
        const [available, setAvailable] = useState(false);
        const [uploadedImages, setUploadedImages] = useState([]);

        function handleChange(event: { target: { value: string; }; }) {
            (document.getElementById("ingredients") as HTMLInputElement)!.setCustomValidity("");
            setInput(event.target.value.toLowerCase());
        }

        function handleFocus() {
            setAvailable(true);
        }

        function handleBlur() {
            setAvailable(false);
        }

        function handleAddNewImage() {
            document.getElementById("images")!.click();
        }

        function handleNewImage(event: React.FormEvent<HTMLInputElement>) {
            const file = event.currentTarget.files![0];
            let reader = new FileReader();
            reader.onload = function(event: {currentTarget: any}) {
                addToArray(event.currentTarget);
            }
            reader.readAsDataURL(file);
            event.currentTarget.value = "";
        }

        function addToArray(target: {result: any}) {
            setUploadedImages(prev => prev.concat(target.result));
            document.getElementById("input-image-help")!.style.display = "inline";
        }

        function handleRemoveImage(event: React.MouseEvent<HTMLImageElement>) {
            const id = parseInt(event.currentTarget.id);
            setUploadedImages(prev => [...prev.slice(0,id), ...prev.slice(id+1, prev.length)]);
        }
        
        useEffect(() => {
            if(!uploadedImages.length)
                document.getElementById("input-image-help")!.style.display = "none";
        },[uploadedImages]);

        function handleSubmit(event: { preventDefault: () => void; }) {
            if(!selectedIngredients.length) {
                console.log(selectedIngredients);
                (document.getElementById("ingredients") as HTMLInputElement)!.setCustomValidity("Select atleast one ingredient!");
                (document.getElementById("ingredients") as HTMLInputElement)!.reportValidity();
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
            handleNewImage,
            handleSubmit,
            handleRemoveImage,
            searchInput,
            available,
            uploadedImages
        };
        return(
        <Component {...baseProps as P} {...props} />)
    }
}