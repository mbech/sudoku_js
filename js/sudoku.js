var SUD = SUD || {};

$(document).ready(function(){
  SUD.run();
});

SUD.createBoardInstance = function(sudoState){
  var state = sudoState || this.sudoStates.easyStart(); 
  var board = Object.create(this.Board.prototype);
  board.init(state);

  return board;
};

SUD.run = function(sudoState){
  //create a new board instance, store it as a property of the app
  this.currentBoard = this.createBoardInstance(sudoState);
  //render the board and set up event bindings
  this.render.initialBoard(this.currentBoard);
  this.render.userInputMenu();
  this.bind.cellSelection();
  this.bind.inputMenu();
};

SUD.updateCellSelection = function(cellId){
  //update data in board object 
  this.currentBoard.setSelectedCell(cellId);
  //then rerender based on that updated board
  this.render.cellSelection(this.currentBoard);
  this.render.neighborHighlight(this.currentBoard);
};

SUD.updateCellValue = function(cellId, value){
  this.currentBoard.setCellVal(cellId, value);  
  this.render.cellValueChange(this.currentBoard);
  this.render.neighborConflict(this.currentBoard, value);
  //value has changed, check if game has been won
  if(this.currentBoard.isSolved()){
    var playAgain = confirm("A Winner Is You!\n Play Again?");
    if(playAgain){
    this.run();
    }
  }
};
