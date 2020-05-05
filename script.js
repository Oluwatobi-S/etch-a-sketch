const gridDiv = document.getElementById("grid");
const sliderNode = document.getElementById("slider");
const cellAmtNode = document.getElementById("cell-amt");
const cellAmtBtn = document.getElementById("cell-amt-btn");
const canvasBgColorOptions = document.querySelectorAll(".canvasBg-color-options");
const blackCanvasColor = document.getElementById("black-canvas-color");
const whiteCanvasColor = document.getElementById("white-canvas-color");
const customCanvasColor = document.getElementById("custom-canvas-color");
const customCanvasColorPicker = document.getElementById("canvas-color-picker");
const canvasGridToggle = document.getElementById("canvas-grid-toggle");
const clearCanvasBtn = document.getElementById("clear-canvas-btn");
const hoverDragBtn = document.getElementById("hover-drag-btn");
const clickDragBtn = document.getElementById("click-drag-btn");
const blackInkColor = document.getElementById("black-ink-color");
const randomInkColor = document.getElementById("random-ink-color");
const customInkColor = document.getElementById("custom-ink-color");
const customInkColorPicker =  document.getElementById("ink-color-picker");
const inkShadingNode = document.getElementById("ink-shading");
const inkEraserBtn = document.getElementById("ink-eraser");
const inkColorOptions = document.querySelectorAll(".ink-color-options");

let squaresPerSide = 16;
let totalGridCells = squaresPerSide ** 2;
let gridCells;
let hoverDragBtnActive = true;
let mouseDownState = false;

createGridColsAndRows();
createGridCells(totalGridCells);
defaultState()

sliderNode.addEventListener("input", changeValue);
cellAmtNode.addEventListener("input", changeValue);
cellAmtBtn.addEventListener("click", resetCellAmt);
canvasBgColorOptions.forEach(addbgColorChoiceListener);
canvasGridToggle.addEventListener("click", toggleGrid);
clearCanvasBtn.addEventListener("click", resetCanvas);
hoverDragBtn.addEventListener("click", activateInkOnHover);
clickDragBtn.addEventListener("click", activateInkOnClick);
gridDiv.addEventListener("mouseup", stopPen);
inkEraserBtn.addEventListener("click", eraseInk);
inkColorOptions.forEach(item => item.addEventListener("click", () => inkEraserBtn.checked = false));

function createGridColsAndRows() {
  gridDiv.setAttribute("style", 
  `grid-template-columns: repeat(${squaresPerSide}, auto); 
  grid-template-Rows: repeat(${squaresPerSide}, auto)`);
}

function createGridCells(amtOfCells) {
  for(let i = 0; i < amtOfCells; i++) {
    const gridCellDiv = document.createElement("div");
    gridCellDiv.classList.add("grid-cell");

    if (blackCanvasColor.checked) {
      gridCellDiv.setAttribute("style", "background-color: #000000");
    } else if (customCanvasColor.checked) {
      gridCellDiv.setAttribute("style", `background-color: ${customCanvasColorPicker.value}`);
    } else {
      gridCellDiv.setAttribute("style", "background-color: #ffffff");
    }

    gridDiv.appendChild(gridCellDiv);
  }
  gridCells = document.querySelectorAll(".grid-cell");
}

function defaultState() {
  whiteCanvasColor.checked = true;
  randomInkColor.checked = true;
  activateInkOnHover();
}

function changeValue(event) {
  if(event.target.id === "slider") {
    cellAmtNode.value = sliderNode.value;
  } else if (event.target.id === "cell-amt") {
    sliderNode.value = cellAmtNode.value;
  }
}

function resetCellAmt() {
  validateValue();
  while (gridDiv.hasChildNodes()) {
    gridDiv.removeChild(gridDiv.firstChild);
  }
  squaresPerSide = +cellAmtNode.value;
  totalGridCells = squaresPerSide ** 2;
  createGridColsAndRows();
  createGridCells(totalGridCells);
  if(canvasGridToggle.checked) {
    gridCells.forEach(addGrid);
  } else {
    gridCells.forEach(removeGrid);
  }
}

function validateValue() {
  if (cellAmtNode.value < 1 || cellAmtNode.value > 100) {
    sliderNode.value = 16;
    cellAmtNode.value = 16;
    alert("Invalid input. Only values 1 - 100 (inclusive) are valid");
  }
}

function addGrid(item) {
  item.classList.add("grid-cell-border");
}

function removeGrid(item) {
  item.classList.remove("grid-cell-border");
}

function addbgColorChoiceListener(currentItem) {
  currentItem.addEventListener("click", changeGridColor);
}

function changeGridColor() {
  if (blackCanvasColor.checked) {
    gridCells.forEach(item => item.style.setProperty("background-color", "#000000"));
  } else if (whiteCanvasColor.checked) {
    gridCells.forEach(item => item.style.setProperty("background-color", "#ffffff"));
  } else if (customCanvasColor.checked) {
    gridCells.forEach(item => item.style.setProperty("background-color", customCanvasColorPicker.value));
  }
}

function toggleGrid() {
  if(canvasGridToggle.checked) {
    gridCells.forEach(addGrid);
  } else {
    gridCells.forEach(removeGrid);
  }
}

function resetCanvas() {
  while (gridDiv.hasChildNodes()) {
    gridDiv.removeChild(gridDiv.firstChild);
  }
  createGridColsAndRows();
  createGridCells(totalGridCells);
  cellAmtNode.value = squaresPerSide;
  sliderNode.value = squaresPerSide;
  if(canvasGridToggle.checked) {
    gridCells.forEach(addGrid);
  } else {
    gridCells.forEach(removeGrid);
  }
}

function activateInkOnHover() {
  gridCells.forEach(item => item.addEventListener("mouseover", changeCellColor));
}

function changeCellColor(event) {
  if (blackInkColor.checked) {
    event.target.style.setProperty("background-color", "#000000");
  } else if (randomInkColor.checked) {
    const newColor = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
    event.target.style.setProperty("background-color", newColor);
  } else if (customInkColor.checked) {
    if (inkShadingNode.checked) {
      gridCells.forEach(item => item.addEventListener("mouseover", darkenCell));
    } else {
      event.target.style.setProperty("background-color", customInkColorPicker.value);
    }
  }
}

function randomNum(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function darkenCell(event) {
  let currentBg = event.target.style.backgroundColor;
  let newBgColor = adjustBrightness(currentBg);

  event.target.style.backgroundColor = newBgColor;
}

function adjustBrightness(color) {
  let currentBgColor = color;
  let red = (+(currentBgColor.slice(currentBgColor.indexOf('(')+1, currentBgColor.indexOf(','))));
  currentBgColor = currentBgColor.slice(currentBgColor.indexOf(' ')+1);
  let green = (+currentBgColor.slice(0, currentBgColor.indexOf(',')));
  currentBgColor = currentBgColor.slice(currentBgColor.indexOf(' ')+1);
  let blue = (+currentBgColor.slice(0, currentBgColor.indexOf(',')));

  let newR = red - 10;
  let newG = green - 10;
  let newB = blue - 10;
  
  if (newR < 0) newR = 0;
  if (newG < 0) newG = 0;
  if (newB < 0) newB = 0;

  return `rgb(${newR}, ${newG}, ${newB})`;
}

function activateInkOnClick() {
  hoverDragBtnActive = false;
  gridCells.forEach(item => item.removeEventListener("mouseover", changeCellColor));
  gridCells.forEach(addMouseDownListener);
  gridCells.forEach(addMouseEnterListener);
}

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
      if (inkShadingNode.checked && mouseDownState === true) {
        gridCells.forEach(item => item.addEventListener("mousedown", darkenCell));
      } else {
        currentItem.style.setProperty('background-color', customInkColorPicker.value);
      }
    }
  }
}

function addMouseEnterListener(currentItem) {
  currentItem.addEventListener("mouseenter", changeCellColor);
  function changeCellColor() {
    if (mouseDownState) {
      if (blackInkColor.checked) {
        currentItem.style.setProperty('background-color', "#000000");
      } else if (randomInkColor.checked) {
        const newColor = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
        currentItem.style.setProperty('background-color', newColor);
      } else if (customInkColor.checked) {
        if (inkShadingNode.checked &&  mouseDownState === true) {
          gridCells.forEach(item => item.addEventListener("mouseenter", darkenCell));
        } else {
          currentItem.style.setProperty('background-color', customInkColorPicker.value);
        }
      }
    }
  }
}

function stopPen() {
  mouseDownState = false;
  gridCells.forEach(item => item.removeEventListener("mouseenter", darkenCell));
}

function eraseInk() {
  if(inkEraserBtn.checked) {
    blackInkColor.checked = false;
    randomInkColor.checked = false;
    customInkColor.checked = false;
    hoverDragBtn.addEventListener("click", activateInkOnHover);
    clickDragBtn.addEventListener("click", activateInkOnClick);

    function activateInkOnHover() {
      gridCells.forEach(item => item.addEventListener("mouseover", changeCellColor));
    }

    function changeCellColor(event) {
      if (blackCanvasColor.checked && inkEraserBtn.checked) {
        event.target.style.setProperty("background-color", "#000000");
      } else if (whiteCanvasColor.checked && inkEraserBtn.checked) {
        event.target.style.setProperty("background-color", "#ffffff");
      } else if (customCanvasColor.checked && inkEraserBtn.checked) {
        event.target.style.setProperty("background-color", customCanvasColorPicker.value);
      }
    }

    function activateInkOnClick() {
      hoverDragBtnActive = false;
      gridCells.forEach(item => item.removeEventListener("mouseover", changeCellColor));
      gridCells.forEach(addMouseDownListener);
      gridCells.forEach(addMouseEnterListener);
    }
  }

  function addMouseDownListener(currentItem) {
    currentItem.addEventListener("mousedown", changeCellColor);
    function changeCellColor() {
      mouseDownState = true;
      if (blackCanvasColor.checked && inkEraserBtn.checked) {
        currentItem.style.setProperty("background-color", "#000000");
      } else if (whiteCanvasColor.checked && inkEraserBtn.checked) {
        currentItem.style.setProperty("background-color", "#ffffff");
      } else if (customCanvasColor.checked && inkEraserBtn.checked) {
        currentItem.style.setProperty("background-color", customCanvasColorPicker.value);
      }
    }
  }

  function addMouseEnterListener(currentItem) {
    currentItem.addEventListener("mouseenter", changeCellColor);
    function changeCellColor() {
      if (mouseDownState) {
        if (blackCanvasColor.checked && inkEraserBtn.checked) {
          currentItem.style.setProperty("background-color", "#000000");
        } else if (whiteCanvasColor.checked && inkEraserBtn.checked) {
          currentItem.style.setProperty("background-color", "#ffffff");
        } else if (customCanvasColor.checked && inkEraserBtn.checked) {
          currentItem.style.setProperty("background-color", customCanvasColorPicker.value);
        }
      }
    }
  }
}