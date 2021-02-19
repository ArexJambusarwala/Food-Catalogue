(function setCarouselAnimation() {
    let carouselImages = document.getElementsByClassName("carousel-images");
    const numberOfCarouselImages = carouselImages.length, totalTime = numberOfCarouselImages * 5;
    for(let i=0; i<numberOfCarouselImages; i++) {
        carouselImages[i].style.animation = `carousel ${totalTime}s infinite`;
        carouselImages[i].style.animationDelay = `${i*5}s`;
    }
    setTimeout(setCarouselAnimation, 13501);
})();

document.getElementById("search-bar").addEventListener("click", () => {
    document.getElementById("expanded-search-wrapper").style.display = "block";
    document.getElementById("search-bar-expanded").style.animation = "search 1.5s 0s 1 forwards";
    document.getElementById("close-search").style.animation = "close 1.5s 0s 1 forwards";
    document.getElementById("carousel").style.display = "none";
    document.getElementById("button-container-wrapper").style.display = "none";
    setTimeout(() => {
        document.getElementById("search-bar-expanded").focus();
    }, 1300);
});

document.getElementById("search-bar-expanded").addEventListener("focus", (event) => {
    document.getElementById("available-ingredients").style.display = "block";
    document.getElementById("results").style.opacity = "0.3";
    document.getElementById("selected-ingredients").style.opacity = "0.3";
    document.getElementById("results").style.transition = "0.2s ease-in";
    document.getElementById("selected-ingredients").style.transition = "0.2s ease-in";
    showOptions(event);
});

document.getElementById("search-bar-expanded").addEventListener("blur", () => {
    document.getElementById("results").style.opacity = "1";
    document.getElementById("selected-ingredients").style.opacity = "0.8";
    document.getElementById("results").style.transition = "0.2s ease-in";
    document.getElementById("available-ingredients").style.display = "none";
});

document.getElementById("close-search").addEventListener("click", () => {
    document.getElementById("expanded-search-wrapper").style.display = "none";
    document.getElementById("carousel").style.display = "block";
    document.getElementById("button-container-wrapper").style.display = "flex";
});

let selectedIngredients  = [];

document.getElementById("search-bar-expanded").addEventListener("keyup", showOptions);

function createButton({className, value, innerHTML, eventHandler}, event = "click") {
    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("class", className);
    btn.setAttribute("value", value);
    btn.innerHTML = innerHTML;
    btn.addEventListener(event, eventHandler);
    return btn;
}

function showOptions(event) {
    document.getElementById("available-ingredients").innerHTML = "";
    let curString = event.target.value.toLowerCase();
    for(ingredient of ingredients) {
        if(selectedIngredients.includes(ingredient))
            continue;
        if(ingredient.includes(curString)) {
            document.getElementById("available-ingredients").appendChild(
                createButton({
                    className: "toggle-ingredient available", 
                    value: ingredient, 
                    innerHTML: ingredient, 
                    eventHandler: addToSelectedList
                }, "mousedown")
            );
        }
    }
}

function addToSelectedList(event) {
    const value = event.target.value;
    event.target.remove();
    selectedIngredients.push(value);
    showRecipes();
    document.getElementById("selected-ingredients").appendChild(
        createButton({
            className: "toggle-ingredient selected", 
            value: value, 
            innerHTML: value + '<i class="fas fa-times-circle"></i>', 
            eventHandler: removeFromSelectedList
        })
    );
}

function removeFromSelectedList() {
    selectedIngredients.splice(selectedIngredients.indexOf(this.value), 1);
    showRecipes();
    if(document.getElementById("search-bar-expanded").value
        && (this.value).includes(document.getElementById("search-bar-expanded").value)) {
        document.getElementById("available-ingredients").appendChild(
            createButton({
                className: "toggle-ingredient available", 
                value: this.value, 
                innerHTML: this.value, 
                eventHandler: addToSelectedList
            })
        );
    }
    this.remove();
}

function createItemImage(src) {
    let itemImage = document.createElement("img");
    itemImage.classList.add("result-item-image");
    itemImage.src = src || defaultImage;
    return itemImage;
}

function createItemName(name) {
    let itemName = document.createElement("span");
    itemName.classList.add("result-item-name");
    itemName.innerHTML = name;
    return itemName;
}

function createItemIngredients(ingredients) {
    let itemIngredients = document.createElement("span");
    itemIngredients.classList.add("result-item-ingredients");
    itemIngredients.innerHTML = ingredients.reduce((acc, val, ind) => {
        return ind !== ingredients.length -1 ? acc+=(val + ", ") : acc+=val;
    },"");
    return itemIngredients;
}

function createItem(recipe) {
    let item = document.createElement("a"); 
    item.classList.add("result-item");
    item.href = "item.html";
    let breakPoint = document.createElement("br");
    item.appendChild(createItemImage(recipe.images[0]));
    item.appendChild(breakPoint);
    item.appendChild(createItemName(recipe.itemName));
    item.appendChild(breakPoint);
    item.appendChild(createItemIngredients(recipe.ingredients));
    return item;
}

let defaultRecipes = Array(15).fill(recipes[0]);

function displayDefaultRecipes(defaultRecipes) {
    for(recipe of defaultRecipes)
        document.getElementById("results").appendChild(createItem(recipe));
}

displayDefaultRecipes(defaultRecipes);

function showRecipes() {
    document.getElementById("results").innerHTML = "";
    if(!selectedIngredients.length){
        displayDefaultRecipes(defaultRecipes);
        return;
    }
    let recipesToBeDisplayed = recipes.filter(recipe => 
        selectedIngredients.every(ingredient => recipe.ingredients.includes(ingredient))
    );
    for(recipe of recipesToBeDisplayed) {
        document.getElementById("results").appendChild(createItem(recipe));
    }
}