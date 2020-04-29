const resetButton = document.getElementById("button");
const gridDiv = document.getElementById("grid");
const stylesheet = document.styleSheets[0];
let squaresPerSide = 16;
let totalGridCells = squaresPerSide ** 2;
let gridCells;

createGridColsAndRows();
createGridCells(totalGridCells);

gridCells = document.querySelectorAll(".grid-cell");
gridCells.forEach(addListener);

resetButton.addEventListener("click", resetGrid);

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
      // gridCellDiv.textContent = i + 1;
      gridDiv.appendChild(gridCellDiv);
  }
}

function addListener(currentItem) {
    currentItem.addEventListener("mouseover", changeCellColor);
    function changeCellColor() {
      const newColor = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
      currentItem.style.setProperty('background-color', newColor);
    }
}

function randomNum(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function resetGrid() {
  while (gridDiv.hasChildNodes()) {
    gridDiv.removeChild(gridDiv.firstChild);
  }
  squaresPerSide = Number(prompt("How many squares per side should the new grid have?"));
  if (squaresPerSide === 0) {
    squaresPerSide = 16;
  }
  totalGridCells = squaresPerSide ** 2;
  createGridCells(totalGridCells);
  createGridColsAndRows();
  gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach(addListener);
}