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
  },

  getCellRow: function(cellId){
    return Math.floor(cellId / this.width);
  },

  getCellCol: function(cellId){
    return cellId % this.width;
  },

  getCellBlock: function(cellId){
    var gridRow = Math.floor(this.getCellRow(cellId) / 3);
    var gridCol = Math.floor(this.getCellCol(cellId) / 3);
    return (gridRow * 3) + gridCol;
  },

  neighborsRow: function(cellId){
    var rowNeighbors = [];
    var cellRow = this.getCellRow(cellId);
    for(var i=0; i < 81; i++){
      if(i !== cellId && this.getCellRow(i) === cellRow){
        rowNeighbors.push(i);
      }
    }
    return rowNeighbors;
  },

  neighborsCol: function(cellId){
    var colNeighbors = [];
    var cellCol = this.getCellCol(cellId);
    for(var i=0; i < 81; i++){
      if(i !== cellId && this.getCellCol(i) === cellCol){
        colNeighbors.push(i);
      }
    }
    return colNeighbors;
  },

  neighborsBlock: function(cellId){
    var blockNeighbors = [];
    var cellBlock = this.getCellBlock(cellId);
    for(var i=0; i < 81; i++){
      if(i !== cellId && this.getCellBlock(i) === cellBlock){
        blockNeighbors.push(i);
      }
    }
    return blockNeighbors;
  },

  checkNeighborConflict: function(cellId, value){
    var conflicts = {}; 
    var rowNeighbors = this.neighborsRow(cellId);
    var colNeighbors = this.neighborsCol(cellId);
    var blockNeighbors = this.neighborsBlock(cellId);

    for(var i=0; i < 9; i++){
      if(this.getCellVal(rowNeighbors[i]) === value){
        conflicts.row = true;
      }
      if(this.getCellVal(colNeighbors[i]) === value){
        conflicts.col = true;
      }
      if(this.getCellVal(blockNeighbors[i]) === value){
        conflicts.block = true;
      }
    }
    return conflicts;
  },

  cellIdsByBlock: function(blockId){
    var cellIds = [];
    for(var i=0; i < 81; i++){
      if(this.getCellBlock(i) === blockId){
        cellIds.push(i);
      }
    }
    return cellIds;
  },

  isSolved: function(){
    //Should be true if all cells are filled and there are no conflicts
    //First, check if the sum of cell values matches that of a completed board 
    var FULL_SUDO_SUM = 405;
    var cellSum = this.state.reduce(function(prev, current){
      return prev + current;
    });
    if(cellSum !== FULL_SUDO_SUM){
      return false;
    } else {
      //sum of cell values adds up, so check each cell for conflicts
      for(var i = 0, len = this.state.length; i < len; i++){
        var cellConflicts = this.checkNeighborConflict(i, this.state[i]);
        if( !$.isEmptyObject(cellConflicts)){
          return false;
        }
      }
    }
    return true;
  }
};
