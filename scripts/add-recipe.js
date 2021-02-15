let uploadedImages = [], selectedIngredients = [];

document.getElementById("uploaded-image-new").addEventListener("click", () => {
    document.getElementById("images").click();
});

function uploadImages(target) {
    const files = target.files;
    let reader = new FileReader();
    for(file of files) {
        reader.onload = function(event) {
            addToArray(event.target);
        }
        reader.readAsDataURL(file);
    }
    target.value = "";
}

function addToArray(target) {
    uploadedImages.push(target.result);
    let image = document.createElement("img");
    image.setAttribute("src", target.result);
    image.setAttribute("class", "uploaded-image");
    image.setAttribute("id", uploadedImages.length - 1);
    image.addEventListener("click", (event) => {
        uploadedImages.splice(parseInt(event.target.id), 1);
        event.target.remove();
        if(!uploadedImages.length)
            document.getElementById("input-image-help").style.display = "none";
    });
    document.getElementById("uploaded-images-container").prepend(image);
    document.getElementById("input-image-help").style.display = "inline";
}

function showOptions(target) {
    document.getElementById("list-of-ingredients").innerHTML = "";
    let curString = target.value.toLowerCase();
    let isPresent = false;
    for(ingredient of ingredients) {
        if(ingredient.includes(curString)) {
            let but = document.createElement("button");
            but.setAttribute("type", "button");
            but.setAttribute("class", "ingredient-select-button");
            but.setAttribute("value", ingredient);
            but.innerHTML = ingredient;
            but.addEventListener("mousedown", addToIngredientList);
            document.getElementById("list-of-ingredients").appendChild(but);
        }
        if(ingredient === curString)
            isPresent = true;
    }
    if(!isPresent && curString) {
        let but = document.createElement("button");
        but.setAttribute("type", "button");
        but.setAttribute("value", curString);
        but.setAttribute("class", "ingredient-select-button");
        but.addEventListener("mousedown", addToIngredientList);
        but.innerHTML = "Add new: " + curString;
        document.getElementById("list-of-ingredients").appendChild(but);
    }
}

function addToIngredientList() {
    const value = this.value;
    if(selectedIngredients.indexOf(value) === -1)
        selectedIngredients.push(this.value);
    let but = document.createElement("button");
    but.setAttribute("type", "button");
    but.setAttribute("class", "ingredient-selected-button");
    but.setAttribute("value", value);
    but.addEventListener("mousedown", removeFromIngredientList);
    but.innerHTML = value;
    document.getElementById("selected-ingredients").appendChild(but);
    document.getElementById("list-of-ingredients").innerHTML = "";
    document.getElementById("ingredients").value = "";
}

document.getElementById("ingredients").addEventListener("focus", (event) => {
    document.getElementById("list-of-ingredients").style.display = "block";
});

document.getElementById("ingredients").addEventListener("blur", (event) => {
    document.getElementById("list-of-ingredients").style.display = "none";
});

function removeFromIngredientList() {
    selectedIngredients.splice(selectedIngredients.indexOf(this.value), 1);
    this.remove();
}