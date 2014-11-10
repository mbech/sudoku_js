//Contains functions for board draw/update DOM manipulations
SUD.render = {
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
        var cellValText = board.getCellVal(cellIds[j]);
        if (cellValText === 0){
          cellValText = "";
        }
        $cell.text(cellValText);
        $block.append($cell);
      }

      //cell nodes added to this block, so append it to the board
      $board.append($block); 
    }

    this.cellSelection(board);
    this.neighborHighlight(board);
  },

  cellSelection: function(board){
    var $cell = $("#cell_" + board.selectedCell);  
    $(".sudo-cell.is-selected").removeClass("is-selected");
    $cell.addClass("is-selected");
  },

  cellValueChange: function(board){
    var $cell = $("#cell_" + board.selectedCell);  
    var newVal = board.getCellVal(board.selectedCell);
    if (newVal === 0){
      newVal = "";
    }
    $cell.text(newVal);
  },

  neighborHighlight: function(board){
    //find neighbors of selected cell and apply 'is-highlighted' class
    $(".sudo-cell.is-highlighted").removeClass("is-highlighted");

    var selectedId = board.selectedCell;
    var rowNeighborIds = board.neighborsRow(selectedId);
    var colNeighborIds = board.neighborsCol(selectedId);
    var blockNeighborIds = board.neighborsBlock(selectedId);

    var allNeighbors = rowNeighborIds.concat(colNeighborIds, blockNeighborIds);

    var len = allNeighbors.length;
    for(var i = 0; i < len; i++){
      var cellId = "cell_" + allNeighbors[i];
      var $currentCell = $("#" + cellId);
      $currentCell.addClass("is-highlighted");
    }
  },

  userInputMenu: function(){
    var $menu = $("<menu>", {id: "user-input-menu"}); 
    //Add menu input divs for values, 1 through 9
    for(var i = 1; i < 10; i++){
      var $item = $("<div>", {class: "input-item"});  
      $item.attr("data-input-val", i).text(i);
      $menu.append($item);
    }
    //Special case for last item in menu, 'erase'
    var $itemErase = $("<div>", {class: "input-item"});  
    $itemErase.attr("data-input-val", 0).text("erase");
    $menu.append($itemErase);

    $("#user-input-container").append($menu);
  }
};
