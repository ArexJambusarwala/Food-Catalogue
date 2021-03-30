import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedIngredients } from '../../store/recipeSlice';

interface InjectedHandlers {
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
}

export default function withHandlers<P>(Component: React.FC<P & InjectedHandlers>): React.FC<P> {
    return function(baseProps) {
        const selectedIngredients = useSelector(selectSelectedIngredients);
        const [searchInput, setInput] = useState("");
        const [available, setAvailable] = useState(false);
        const [uploadedImages, setUploadedImages] = useState([]);
        const ingredientsInput = useRef<HTMLInputElement>(null);
        const inputImageHelp = useRef<HTMLSpanElement>(null);
        const inputImageFile = useRef<HTMLInputElement>(null);

        function handleChange(event: { target: { value: string; }; }) {
            setCustomError();
            setInput(event.target.value.toLowerCase());
        }

        function handleFocus() {
            setAvailable(true);
        }

        function handleBlur() {
            setAvailable(false);
        }

        function setCustomError(): void {
            (ingredientsInput.current as HTMLInputElement)!.setCustomValidity("");
        }

        function handleAddNewImage() {
            inputImageFile.current!.click();
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
            inputImageHelp.current!.style.display = "inline";
        }

        function handleRemoveImage(event: React.MouseEvent<HTMLImageElement>) {
            const id = parseInt(event.currentTarget.id);
            setUploadedImages(prev => [...prev.slice(0,id), ...prev.slice(id+1, prev.length)]);
        }
        
        useEffect(() => {
            if(!uploadedImages.length)
                inputImageHelp.current!.style.display = "none";
        },[uploadedImages]);

        function handleSubmit(event: { preventDefault: () => void; }) {
            if(!selectedIngredients.length) {
                (ingredientsInput.current as HTMLInputElement)!.setCustomValidity("Select atleast one ingredient!");
                (ingredientsInput.current as HTMLInputElement)!.reportValidity();
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
        return(
        <Component {...baseProps as P} {...props} />)
    }
}