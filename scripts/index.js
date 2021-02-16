(function setCarouselAnimation() {
    let carouselImages = document.getElementsByClassName("carousel-images");
    const numberOfCarouselImages = carouselImages.length, totalTime = numberOfCarouselImages * 5;
    for(let i=0; i<numberOfCarouselImages; i++) {
        carouselImages[i].style.animation = `carousel ${totalTime}s infinite`;
        carouselImages[i].style.animationDelay = `${i*5}s`;
    }
    setTimeout(setCarouselAnimation, 13501);
})();

function expandSearch() {
    document.getElementById("expanded-search-wrapper").style.display = "block";
    document.getElementById("search-bar-expanded").style.animation = "search 1.5s 0s 1 forwards";
    document.getElementById("close-search").style.animation = "close 1.5s 0s 1 forwards";
    document.getElementById("carousel").style.display = "none";
    document.getElementById("flex-container").style.display = "none";
    setTimeout(() => {
        document.getElementById("search-bar-expanded").focus();
    }, 1300);
}

document.getElementById("search-bar-expanded").addEventListener("focus", (event) => {
    document.getElementById("available-ingredients").style.display = "block";
    document.getElementById("results").style.opacity = "0.3";
    document.getElementById("selected-ingredients").style.opacity = "0.3";
    document.getElementById("results").style.transition = "0.2s ease-in";
    document.getElementById("selected-ingredients").style.transition = "0.2s ease-in";
    showOptions(event.target);
});

document.getElementById("search-bar-expanded").addEventListener("blur", () => {
    document.getElementById("results").style.opacity = "1";
    document.getElementById("selected-ingredients").style.opacity = "0.8";
    document.getElementById("results").style.transition = "0.2s ease-in";
    document.getElementById("available-ingredients").style.display = "none";
});

function closeSearch() {
    document.getElementById("expanded-search-wrapper").style.display = "none";
    document.getElementById("carousel").style.display = "block";
    document.getElementById("flex-container").style.display = "flex";
}   

let selectedIngredients  = [];

function showOptions(target) {
    document.getElementById("available-ingredients").innerHTML = "";
    let curString = target.value.toLowerCase();
    console.log(curString);
    if(!curString)
        return;
    for(ingredient of ingredients) {
        if(selectedIngredients.includes(ingredient))
            continue;
        if(ingredient.includes(curString)) {
            let but = document.createElement("button");
            but.setAttribute("class", "toggle-ingredient available");
            but.setAttribute("value", ingredient);
            but.innerHTML = ingredient;
            but.addEventListener("mousedown", addToSelectedList);
            document.getElementById("available-ingredients").appendChild(but);
        }
    }
}

function addToSelectedList(event) {
    const value = event.target.value;
    event.target.remove();
    if(selectedIngredients.indexOf(value) === -1)
        selectedIngredients.push(value);
    showRecipes();
    let but = document.createElement("button");
    but.setAttribute("class", "toggle-ingredient selected");
    but.setAttribute("value", value);
    but.addEventListener("click", removeFromSelectedList);
    but.innerHTML = value;
    document.getElementById("selected-ingredients").appendChild(but);
}

function removeFromSelectedList() {
    selectedIngredients.splice(selectedIngredients.indexOf(this.value), 1);
    showRecipes();
    if(document.getElementById("search-bar-expanded").value
        && (this.value).includes(document.getElementById("search-bar-expanded").value)) {
        let but = document.createElement("button");
        but.setAttribute("class", "toggle-ingredient available");
        but.setAttribute("value", this.value);
        but.innerHTML = this.value;
        but.addEventListener("click", addToSelectedList);
        document.getElementById("available-ingredients").appendChild(but);
    }
    this.remove();
}

function showRecipes() {
    document.getElementById("results").innerHTML = "";
    if(!selectedIngredients.length) {
        return;
    }
    let recipesToBeDisplayed = recipes.filter(recipe => 
        selectedIngredients.every(ingredient => recipe.ingredients.includes(ingredient))
    );
    //console.log(recipesToBeDisplayed);
    for(recipe of recipesToBeDisplayed) {
        let item = document.createElement("a");
        item.classList.add("result-item");
        item.href = "item.html";
        let itemImage = document.createElement("img");
        itemImage.classList.add("result-item-image");
        itemImage.src = recipe.images[0];
        let breakPoint = document.createElement("br");
        let itemName = document.createElement("span");
        itemName.classList.add("result-item-name");
        itemName.innerHTML = recipe.itemName;
        let itemIngredients = document.createElement("span");
        itemIngredients.classList.add("result-item-ingredients");
        itemIngredients.innerHTML = recipe.ingredients.reduce((acc, val, ind) => {
            return ind !== recipe.ingredients.length -1 ? acc+=(val + ", ") : acc+=val;
        },"");
        item.appendChild(itemImage);
        item.appendChild(breakPoint);
        item.appendChild(itemName);
        item.appendChild(breakPoint);
        item.appendChild(itemIngredients);
        document.getElementById("results").appendChild(item);
    }
}