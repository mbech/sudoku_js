var SUD = SUD || {};

$(document).ready(function(){
  SUD.render.emptyGrid();
});

SUD.run= function(sudoState){
  var state = sudoState || this.sudoStates.easyStart(); 
  var board = Object.create(this.Board.prototype);
  board.init(state);

  return board;
}
