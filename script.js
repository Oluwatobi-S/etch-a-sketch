const cellAmountBtn = document.getElementById("cell-amount-btn");
const clearCanvasBtn = document.getElementById("clear-canvas-btn");
const gridDiv = document.getElementById("grid");
const stylesheet = document.styleSheets[0];
let squaresPerSide = 16;
let totalGridCells = squaresPerSide ** 2;
let gridCells;

createGridColsAndRows();
createGridCells(totalGridCells);

cellAmountBtn.addEventListener("click", resetCellAmount);
clearCanvasBtn.addEventListener("click", resetCanvas);

const canvasGridToggle = document.getElementById("canvas-grid-toggle");
canvasGridToggle.addEventListener("click", toggleGrid);

function toggleGrid() {
  gridCells = document.querySelectorAll(".grid-cell");
  if(canvasGridToggle.checked) {
    gridCells.forEach(addGrid);
  } else {
    gridCells.forEach(removeGrid);
  }
}

function addGrid(item) {
  item.classList.add("grid-cell-border");
}

function removeGrid(item) {
  item.classList.remove("grid-cell-border");
}

function resetCanvas() {
  while (gridDiv.hasChildNodes()) {
    gridDiv.removeChild(gridDiv.firstChild);
  }
  createGridCells(totalGridCells);
  createGridColsAndRows();
  cellAmountNode.value = squaresPerSide;
  sliderNode.value = squaresPerSide;
  if(canvasGridToggle.checked) {
    gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(addGrid);
  } else {
    gridCells.forEach(removeGrid);
  }
}

function createGridColsAndRows() {
  for(let i = 0; i < stylesheet.cssRules.length; i++) {
    if(stylesheet.cssRules[i].selectorText === "#grid") {
      let gridCSSRule = stylesheet.cssRules[i].style;
      gridCSSRule.setProperty("grid-template-columns", `repeat(${squaresPerSide}, auto)`);
      gridCSSRule.setProperty("grid-template-Rows", `repeat(${squaresPerSide}, auto)`);
    }
  }
}

function createGridCells(amountOfCells) {
  for(let i = 0; i < amountOfCells; i++) {
      const gridCellDiv = document.createElement("div");
      gridCellDiv.classList.add("grid-cell");
      gridCellDiv.setAttribute("data-pen-opacity", "0");
      gridCellDiv.setAttribute("style", "background-color: #ffffff");
      gridDiv.appendChild(gridCellDiv);
  }
}

function randomNum(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

const sliderNode = document.getElementById("slider");
const cellAmountNode = document.getElementById("cell-amount");

sliderNode.addEventListener("input", changeValue);
cellAmountNode.addEventListener("input", changeValue);

function changeValue(event) {
  if(event.target.id === "slider") {
    cellAmountNode.value = sliderNode.value;
  } else if (event.target.id === "cell-amount") {
    sliderNode.value = cellAmountNode.value;
  }
}

function resetCellAmount() {
  gridCells = document.querySelectorAll(".grid-cell");
  validateValue();
  while (gridDiv.hasChildNodes()) {
    gridDiv.removeChild(gridDiv.firstChild);
  }
  squaresPerSide = cellAmountNode.value;
  totalGridCells = squaresPerSide ** 2;
  createGridCells(totalGridCells);
  createGridColsAndRows();
  if(canvasGridToggle.checked) {
    gridCells.forEach(addGrid);
  } else {
    gridCells.forEach(removeGrid);
  }
}

function validateValue() {
  if (cellAmountNode.value <= 0 || cellAmountNode.value > 100) {
    cellAmountNode.value = 16;
    sliderNode.value = 16;
    alert("Invalid input. Choose any value from 1 - 100 (inclusive)");
  }
}

const canvasBackgroundColor = document.querySelectorAll(".canvas-bg-colors");
canvasBackgroundColor.forEach(insertListener);

function insertListener(currentItem) {
  currentItem.addEventListener("click", changeGridColor);
}

function changeGridColor() {
  const blackCanvasColor = document.getElementById("black-canvas-color");
  const whiteCanvasColor = document.getElementById("white-canvas-color");
  const customCanvasColor = document.getElementById("custom-canvas-color");
  const customCanvasColorPicker =  document.getElementById("canvas-color-picker");

  if (blackCanvasColor.checked) {
    for(let i = 0; i < stylesheet.cssRules.length; i++) {
      if(stylesheet.cssRules[i].selectorText === ".grid-cell") {
        let gridCSSRule = stylesheet.cssRules[i].style;
        gridCSSRule.setProperty("background-color", "#000000");
      } 
    }
  } else if (whiteCanvasColor.checked) {
    for(let i = 0; i < stylesheet.cssRules.length; i++) {
      if(stylesheet.cssRules[i].selectorText === ".grid-cell") {
        let gridCSSRule = stylesheet.cssRules[i].style;
        gridCSSRule.setProperty("background-color", "#ffffff");
      } 
    }
  } else if (customCanvasColor.checked) {
    for(let i = 0; i < stylesheet.cssRules.length; i++) {
      if(stylesheet.cssRules[i].selectorText === ".grid-cell") {
        let gridCSSRule = stylesheet.cssRules[i].style;
        gridCSSRule.setProperty("background-color", customCanvasColorPicker.value);
      } 
    }
  }
}

const hoverDragBtn = document.getElementById("hover-drag-btn");
hoverDragBtn.addEventListener("click", putOnHoverPen)

function putOnHoverPen() {
  gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach(addMouseOverListener);
}

function addMouseOverListener(currentItem) {
  currentItem.addEventListener("mouseover", changeCellColor);
}

function changeCellColor(event) {
  const newColor = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
  event.target.style.setProperty('background-color', newColor);
}

let mouseDownState = false;

const clickDragBtn = document.getElementById("click-drag-btn");
clickDragBtn.addEventListener("click", inkActiveOnClick)

function inkActiveOnClick() {
  gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach(removeMouseOverListener);
  gridCells.forEach(addMouseDownListener);
  gridCells.forEach(addMouseEnterListener);
}

function removeMouseOverListener(currentItem) {
  currentItem.removeEventListener("mouseover", changeCellColor);
}

let inkColor;
const blackInkColor = document.getElementById("black-ink-color");
const randomInkColor = document.getElementById("random-ink-color");
const customInkColor = document.getElementById("custom-ink-color");
const customInkColorPicker =  document.getElementById("ink-color-picker");

const inkDarkeningToggleNode = document.getElementById("ink-darkening-toggle");

function addMouseDownListener(currentItem) {
  currentItem.addEventListener("mousedown", changeCellColor);
  function changeCellColor() {
    mouseDownState = true;
    if(blackInkColor.checked) {
      currentItem.style.setProperty('background-color', "#000000");
    } else if (randomInkColor.checked) {
      const newColor = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
      currentItem.style.setProperty('background-color', newColor);
    } else if (customInkColor.checked) {
      if (inkDarkeningToggleNode.checked && mouseDownState === true) {
        gridCells = document.querySelectorAll(".grid-cell");
        gridCells.forEach(item => item.addEventListener("mousedown", darkenCell));
      } else {
        currentItem.style.setProperty('background-color', customInkColorPicker.value);
      }
    }
  }
}

function darkenCell(event) {
  const penOpacityAttrValPlus = (+event.target.getAttribute("data-pen-opacity") + 0.1).toFixed(1);
  event.target.setAttribute("data-pen-opacity", `${penOpacityAttrValPlus}`);
  let currentBackgroundColor = event.target.style.backgroundColor;
  let red = (+(currentBackgroundColor.slice(currentBackgroundColor.indexOf('(')+1, currentBackgroundColor.indexOf(','))));
  currentBackgroundColor = currentBackgroundColor.slice(currentBackgroundColor.indexOf(' ')+1);
  let green = (+currentBackgroundColor.slice(0, currentBackgroundColor.indexOf(',')));
  currentBackgroundColor = currentBackgroundColor.slice(currentBackgroundColor.indexOf(' ')+1);
  let blue = (+currentBackgroundColor.slice(0, currentBackgroundColor.indexOf(',')));
  console.log(`red: ${red}, green: ${green}, blue: ${blue}`)
  let alpha = penOpacityAttrValPlus;

  console.log(`The new background is: rgba(${red},${green},${blue},${alpha})`)

  event.target.style.backgroundColor = `rgba(${red},${green},${blue},${alpha})`;
}

function addMouseEnterListener(currentItem) {
  currentItem.addEventListener("mouseenter", changeCellColor);
  function changeCellColor() {
    if(mouseDownState) {
      if(blackInkColor.checked) {
        currentItem.style.setProperty('background-color', "#000000");
      } else if (randomInkColor.checked) {
        const newColor = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
        currentItem.style.setProperty('background-color', newColor);
      } else if (customInkColor.checked) {
        if (inkDarkeningToggleNode.checked &&  mouseDownState === true) {
          gridCells = document.querySelectorAll(".grid-cell");
          gridCells.forEach(item => item.addEventListener("mouseenter", darkenCell));
        } else {
          currentItem.style.setProperty('background-color', customInkColorPicker.value);
        }
      }
    }
  }
}

gridDiv.addEventListener("mouseup", stopPen);

function stopPen() {
  mouseDownState = false;
  gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach(item => item.removeEventListener("mouseenter", darkenCell));
}

function changeGridColor() {
  const blackCanvasColor = document.getElementById("black-canvas-color");
  const whiteCanvasColor = document.getElementById("white-canvas-color");
  const customCanvasColor = document.getElementById("custom-canvas-color");
  const canvasColorPicker =  document.getElementById("canvas-color-picker");

  if (blackCanvasColor.checked) {
    for(let i = 0; i < stylesheet.cssRules.length; i++) {
      if(stylesheet.cssRules[i].selectorText === ".grid-cell") {
        let gridCSSRule = stylesheet.cssRules[i].style;
        gridCSSRule.setProperty("background-color", "#000000");
      } 
    }
  } else if (whiteCanvasColor.checked) {
    for(let i = 0; i < stylesheet.cssRules.length; i++) {
      if(stylesheet.cssRules[i].selectorText === ".grid-cell") {
        let gridCSSRule = stylesheet.cssRules[i].style;
        gridCSSRule.setProperty("background-color", "#ffffff");
      } 
    }
  } else if (customCanvasColor.checked) {
    for(let i = 0; i < stylesheet.cssRules.length; i++) {
      if(stylesheet.cssRules[i].selectorText === ".grid-cell") {
        let gridCSSRule = stylesheet.cssRules[i].style;
        gridCSSRule.setProperty("background-color", canvasColorPicker.value);
      } 
    }
  }
}