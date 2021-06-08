const container = document.getElementById("container");
const btnReset = document.querySelector(".reset");
const btnResize = document.querySelector(".resize");


// CREATE GRID SIZE - create new divs. Same number of columns and rows, but divs themselves are rows so set the columns repeat
const createGrid = (size) => {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    for (i = 0; i < (size * size); i++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.addEventListener("mouseover", colorIn)
        // append the cells to the container & set the background colour 
        container.appendChild(cell);
        cell.style.backgroundColor = "#fdfdfd";
    }  
}


// generate background colour on hovering 
function getRandomColor () {
    let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

function colorIn (event) {
    event.target.style.backgroundColor = getRandomColor();
}
        

// ASK FOR NEW GRID SIZE
function getGridSize () {
    let newSize = prompt ("How many squares per side?", "64");
    if (newSize > 64 || newSize === " ") {
        warning ();
        // if user doesn't enter new gize, auto generate 16x16 grid 
    } else if (newSize === null) {
        clearGrid();
        createGrid(16);
    }
    else {
        clearGrid();
        createGrid(newSize);   
    }  
}

// ALERT WHEN USER INPUT IS TOO BIG 
const warning = () => {
    alert("Lol - smaller please");
    getGridSize();
};

btnResize.addEventListener("click", getGridSize);


// clear the whole grid to be able to create new one 
const clearGrid = () => {
  const gridArray = Array.from(container.childNodes);
  gridArray.forEach((element) => {
    container.removeChild(element);
  });
}


// on reset button click, remove all colours back to default white 
function resetGrid () {
let gridSquares = document.querySelectorAll(".cell");
for(i = 0; i < gridSquares.length; i++) {
    gridSquares[i].style.backgroundColor = "white";
}
}

btnReset.addEventListener("click", resetGrid);

// pre-load new 16x16 grid 
window.addEventListener("load", createGrid(16));