const gridLayout = function() {
  this.DOMGridContainer = 0;
  this.DOMGridColumns = [];
  this.DOMGridGutters = [];
  this.DOMGridRows = [];

  this.DOMGridButton = document.createElement("button");
  this.bActive = true;

}

//Global Variables
const createGrid = new gridLayout();

function setGridLayout( object ) {

  createGrid.DOMGridContainer = document.createElement("div");
  createGrid.DOMGridContainer.classList.add("grid-container");


  createGrid.DOMGridButton.classList.add("grid-button");
  createGrid.DOMGridButton.innerHTML = "Remove";

  document.getElementsByTagName("body")[0].appendChild(createGrid.DOMGridContainer);
  document.getElementsByTagName("body")[0].appendChild(createGrid.DOMGridButton);
  createGrid.DOMGridContainer.style.width = object.gridWidth+object.gridWidthUnit;

  for( let i = 0; i < object.gridColumnNumber; i ++) {

    createGrid.DOMGridGutters[i] = document.createElement("div");
    createGrid.DOMGridGutters[i].classList.add("grid-gutter");
    createGrid.DOMGridGutters[i].style.width = object.gridGutterWidth+object.gridGutterWidthUnit;
    createGrid.DOMGridGutters[i].style.height = document.body.offsetHeight +"px";
    createGrid.DOMGridColumns[i] = document.createElement("div");
    createGrid.DOMGridColumns[i].classList.add("grid-column")
    createGrid.DOMGridColumns[i].style.width = ((object.gridWidth / object.gridColumnNumber) - object.gridGutterWidth) + (object.gridGutterWidth/object.gridColumnNumber)+object.gridWidthUnit;
    createGrid.DOMGridColumns[i].style.height = document.body.offsetHeight +"px";
    createGrid.DOMGridContainer.appendChild(createGrid.DOMGridColumns[i]);
    if(i != object.gridColumnNumber-1){ //in order to not add a gutter to the end
      createGrid.DOMGridContainer.appendChild(createGrid.DOMGridGutters[i]);
    }
  }
  //Checks if there needs to be rows
  if(object.gridRowHeight){
    for(let i = 0; i < document.body.offsetHeight / object.gridRowHeight - 1; i ++) {
      createGrid.DOMGridRows[i] = document.createElement("div");
      createGrid.DOMGridRows[i].classList.add("grid-row");
      createGrid.DOMGridRows[i].style.height = object.gridRowHeight+object.gridRowUnit;
      createGrid.DOMGridContainer.appendChild(createGrid.DOMGridRows[i]);
    }
  }
  //Checks if there needs to start active/inactive
  createGrid.bActive = object.activateGrid;
  if(createGrid.bActive == true) {gp
    createGrid.DOMGridContainer.style.opacity = 1;
    createGrid.DOMGridButton.innerHTML = "Display";
  }
  if(createGrid.bActive == false) {
    createGrid.DOMGridContainer.style.opacity = 0;
    createGrid.DOMGridButton.innerHTML = "Display";
  }
}

createGrid.DOMGridButton.addEventListener("click", function() {
  if(createGrid.bActive == false) {
    createGrid.bActive = true;
    createGrid.DOMGridContainer.style.opacity = 1;
    createGrid.DOMGridButton.innerHTML = "Remove";
  }
  else {
    createGrid.bActive = false;
    createGrid.DOMGridContainer.style.opacity = 0;
    createGrid.DOMGridButton.innerHTML = "Display";
  }
});
