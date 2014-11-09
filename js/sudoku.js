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
  var board = SUD.createBoardInstance(sudoState);
  this.render.board(board);
  this.render.userInputMenu();
};
