
import { sunglassesOptions, sunglasses } from './sunglassesData.js';

const productDetailsEl = document.getElementById("productDetails");
const productImage = document.getElementById("productImage");
const productFrames = document.getElementsByClassName("product-image_frame")[0];
const productLenses = document.getElementsByClassName("product-image_lenses")[0];

let sunglassesNew = '';

const setSunglasses = (newSunglasses = sunglasses) => newSunglasses;

const render = ({ model, lenses, frame }) => {
    const totalPrice = model.price + lenses.price + frame.price;
    const price = `$${totalPrice}`;
  
    productDetailsEl.innerHTML = `
      <h1>${model.name}</h1>
      <p>Custom: ${lenses.color} lenses, ${frame.color} frames</p>
      <p>${price}</p>
    `;
    
    productImage.classList.replace(productImage.classList[1], model.cssClass);
    productFrames.classList.replace(productFrames.classList[1], frame.cssClass);
    productLenses.classList.replace(productLenses.classList[1], lenses.cssClass);
};

// Highlight current selection
const addHighlight = (clickedItem) => {
    if (clickedItem.classList.contains("product-thumb")) {
        [...document.getElementsByClassName("product-thumb")].forEach(thumb => thumb.classList.remove("selected"));
    } else if (clickedItem.classList.contains("product-color-swatch")) {
        const siblings = clickedItem.closest("ul").querySelectorAll("button");
        [...siblings].forEach(swatch => swatch.classList.remove("selected"));
    }
    clickedItem.classList.add("selected");
};

document.body.addEventListener("click", (event) => {
    const clickedItem = event.target;
    sunglassesNew = sunglassesNew || { ...sunglasses };

    const updateSunglasses = (type, options) => {
        const { color, price, cssClass } = options;
        sunglassesNew[type] = { color, price, cssClass };
    };

    const actions = {
        "product-thumb": () => {
            const model = sunglassesOptions.models.find(item => item.name === clickedItem.dataset.name);
            sunglassesNew.model = { ...model };
        },
        "product-color-swatch": () => {
            const isLens = clickedItem.closest("div").classList.contains("product-lenses");
            const options = isLens 
                ? sunglassesOptions.lenses.find(item => item.color === clickedItem.dataset.color)
                : sunglassesOptions.frames.find(item => item.color === clickedItem.dataset.color);
            updateSunglasses(isLens ? "lenses" : "frame", options);
        }
    };

    Object.keys(actions).forEach(key => {
        if (clickedItem.classList.contains(key)) {
            actions[key]();
            addHighlight(clickedItem);
            setSunglasses(sunglassesNew);
            render(sunglassesNew);
        }
    });
});

render(sunglasses);

