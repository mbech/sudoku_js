//Contains functions for board draw/update DOM manipulations
SUD.render = {
  initialBoard: function(board){
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
        } else { //non-zero starting values are 'locked', not user-editable
          $cell.addClass("is-locked-val"); 
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
    if($cell.hasClass("is-locked-val")){
      $("#user-input-menu").addClass("input-disabled");
    } else {
      $("#user-input-menu").removeClass("input-disabled");
    }
  },

  cellValueChange: function(board){
    var $cell = $("#cell_" + board.selectedCell);  
    var newVal = board.getCellVal(board.selectedCell);
    if (newVal === 0){
      newVal = "";
    }
    $cell.text(newVal);
  },

  //find neighbors of selected cell and apply 'is-highlighted' class
  neighborHighlight: function(board){
    $(".sudo-cell.is-highlighted").removeClass("is-highlighted");

    var selectedId = board.selectedCell;
    var rowNeighborIds = board.neighborsRow(selectedId);
    var colNeighborIds = board.neighborsCol(selectedId);
    var blockNeighborIds = board.neighborsBlock(selectedId);

    //Concat keeps duplicate values, possibility for 'is-multi-select' style 
    var allNeighborIds = rowNeighborIds.concat(colNeighborIds, blockNeighborIds);

    var len = allNeighborIds.length;
    for(var i = 0; i < len; i++){
      var cellId = "cell_" + allNeighborIds[i];
      var $currentCell = $("#" + cellId);
      $currentCell.addClass("is-highlighted");
    }
  },

  //find neighbors of selected cell and apply (or clear) conflicts
  neighborConflict: function(board, selectedValue){

    var selectedId = board.selectedCell;
    var conflicts = board.checkNeighborConflict(selectedId, selectedValue);
    var rowConflictIds = [];  //initializing here so concat doesn't fail
    var colConflictIds = [];
    var blockConflictIds = [];
    var allConflictIds = [];

    //start by clearing selectedCell's associated conflicts
    $('.sudo-cell').each(function(){
      $(this).removeData("conflict_" + selectedId);
    });

    //remove 'is-conflict-source' from selected cell until it's guilty again
    $("#cell_" + selectedId).removeClass("is-conflict-source");

    if(selectedValue !== 0){
      //if selected value is not 0, we need to collect ids of cell conflicts.
      if(conflicts.row){
        rowConflictIds = board.neighborsRow(selectedId);
      }
      if(conflicts.col){
        colConflictIds = board.neighborsCol(selectedId);
      }
      if(conflicts.block){
        blockConflictIds = board.neighborsBlock(selectedId);
      }
      allConflictIds = rowConflictIds.concat(colConflictIds, blockConflictIds);
      var len = allConflictIds.length;

      //if len of allConflictIds > 0, selected Cell is a source of conflict
      if(len > 0){
        $("#cell_" + selectedId).addClass("is-conflict-source");
      }
      //all conflict ids gathered, so update each with new conflict (or clear)
      for(var i = 0; i < len; i++){
        var cellId = "cell_" + allConflictIds[i];
        var $currentCell = $("#" + cellId);
        //store info about conflict in the node with $.data(key,val)
        $currentCell.data("conflict_" + selectedId, selectedValue);
        $currentCell.addClass("is-in-conflict");
      }
    }
    //lastly, remove conflict class if this was the last conflict for that cell
    //(if the selectedValue was 0, e.g. 'erase', clearing the conflicts is
    //all we have to do)
    this.clearOldConflicts();
  },

  clearOldConflicts: function(){
    //if all conflict data is removed, remove the class to unstyle it
    $(".sudo-cell").each(function(){
      if($.isEmptyObject($(this).data())){
        $(this).removeClass("is-in-conflict");
      } 
    });
  },

  userInputMenu: function(){
    //clear for entire page redraw 
    $("#user-input-container").empty();

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
