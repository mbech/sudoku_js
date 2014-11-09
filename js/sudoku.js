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
  //create a new board instance, store it as a property
  this.currentBoard = SUD.createBoardInstance(sudoState);
  //Render the board and set up event bindings
  this.render.board(this.currentBoard);
  this.render.userInputMenu();
  this.bind.cellSelection();
};

SUD.updateSelectedCell = function(cellId){
  //update data in board object 
  this.currentBoard.setSelectedCell(cellId);
  //then rerender based on that updated board
  this.render.selectedCell(this.currentBoard);
  this.render.highlightedNeighbors(this.currentBoard);
};
