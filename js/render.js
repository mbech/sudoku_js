SUD.render = {
  emptyGrid: function(){
    var $board = $('#sudo-board');
    $board.empty();
    //Create and append blocks
    for(var i=0; i < 9; i++){
      var $block = $("<div>", {class: "sudo-block"}); 
      $block.attr('data-block-id', i);
      $board.append($block); 
    };
  },

  board: function(board){
    var $board = $('#sudo-board');
    $board.empty();

    //Create and append blocks
    for(var i=0; i < 9; i++){
      var $block = $("<div>", {class: "sudo-block"}); 
      $block.attr('data-block-id', i);

      //Get array of cell ids in current block
      var cellIds = board.cellIdsByBlock(i);

      //Loop over this block's cellIds, turn them into nodes and append to block
      for(var j=0,len=cellIds.length; j < len; j++){
        var cellId = "cell_" + cellIds[j];
        var $cell = $("<div>", {id: cellId, class: "sudo-cell"}); 
        $cell.text(board.getCellVal(cellIds[j]));
        $block.append($cell);
      };
      //cell nodes added to this block, so append it to the board
      $board.append($block); 
    };
  }
};
