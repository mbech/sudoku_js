SUD.Board = function(){
};

SUD.Board.prototype = {
  init: function(stateArray){
  this.width = 9;
  this.height = 9;
  this.selectedCell = 0;
  this.state = stateArray;
  }, 

  setSelectedCell: function(cellId){
    this.selectedCell = cellId;
  },

  setCellVal: function(cellId, value){
    this.state[cellId] = value;
  },

  getCellVal: function(cellId){
    return this.state[cellId];
  },

  clearCellVal: function(cellId){
    this.state[cellId] = 0;
  }
};
