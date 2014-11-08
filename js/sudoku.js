var SUD = SUD || {};

$(document).ready(function(){
  SUD.render.emptyGrid();
});

SUD.run= function(sudoState){
  var state = sudoState || this.sudoStates.easyStart(); 
  var board = Object.create(this.Board.prototype).init(state);

  this.render.board(board);
}
