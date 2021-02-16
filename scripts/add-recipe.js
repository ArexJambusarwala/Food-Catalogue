let uploadedImages = [], selectedIngredients = [];

document.getElementById("uploaded-image-new").addEventListener("click", () => {
    document.getElementById("images").click();
});

document.getElementById("images").addEventListener("change", event => {
    const files = event.target.files;
    let reader = new FileReader();
    for(file of files) {
        reader.onload = function(event) {
            addToArray(event.target);
        }
        reader.readAsDataURL(file);
    }
    event.target.value = "";
});

function createImage(src) {
    let image = document.createElement("img");
    image.setAttribute("src", src);
    image.setAttribute("class", "uploaded-image");
    image.setAttribute("id", uploadedImages.length - 1);
    image.addEventListener("click", (event) => {
        uploadedImages.splice(parseInt(event.target.id), 1);
        event.target.remove();
        if(!uploadedImages.length)
            document.getElementById("input-image-help").style.display = "none";
    });
    return image;
}

function addToArray(target) {
    uploadedImages.push(target.result);
    document.getElementById("uploaded-images-container").prepend(createImage(target.result));
    document.getElementById("input-image-help").style.display = "inline";
}

function createButton({className, value, innerHTML, eventHandler}) {
    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("class", className);
    btn.setAttribute("value", value);
    btn.innerHTML = innerHTML;
    btn.addEventListener("mousedown", eventHandler);
    return btn;
}

document.getElementById("ingredients").addEventListener("keyup", event => {
    document.getElementById("list-of-ingredients").innerHTML = "";
    let curString = event.target.value.toLowerCase();
    let isPresent = false;
    for(ingredient of ingredients) {
        if(ingredient.includes(curString) && !selectedIngredients.includes(ingredient)) {
            document.getElementById("list-of-ingredients").appendChild(
                createButton({
                    className: "ingredient-select-button", 
                    value: ingredient, 
                    innerHTML: ingredient, 
                    eventHandler: addToIngredientList
                })
            );
        }
        if(ingredient === curString)
            isPresent = true;
    }
    if(!isPresent && curString) {
        document.getElementById("list-of-ingredients").appendChild(
            createButton({
                className: "ingredient-select-button", 
                value: curString, 
                innerHTML: "Add new: " + curString, 
                eventHandler: addToIngredientList
            })
        );
    }
});

function addToIngredientList() {
    const value = this.value;
    selectedIngredients.push(this.value);
    document.getElementById("selected-ingredients").appendChild(
        createButton({
            className: "ingredient-selected-button", 
            value: value, 
            innerHTML: value, 
            eventHandler: removeFromIngredientList
        })
    );
    document.getElementById("list-of-ingredients").innerHTML = "";
    document.getElementById("ingredients").value = "";
}

function removeFromIngredientList() {
    selectedIngredients.splice(selectedIngredients.indexOf(this.value), 1);
    this.remove();
}

document.getElementById("ingredients").addEventListener("focus", () => {
    document.getElementById("list-of-ingredients").style.display = "block";
});

document.getElementById("ingredients").addEventListener("blur", () => {
    document.getElementById("list-of-ingredients").style.display = "none";
});
