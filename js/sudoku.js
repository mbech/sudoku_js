var SUD = SUD || {};

SUD.run= function(sudoState){
  console.log(this);
  var state = sudoState; 
  this.board = Object.create(this.Board.prototype);
  this.board.init(state);  
}