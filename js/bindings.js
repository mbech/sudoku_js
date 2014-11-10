//Contains functions that create event bindings on page, calling appropriate
//responses via callback to sudoku (which can then update board state,
//re-render, etc.) 
SUD.bind = {
  cellSelection: function(){
    $(".sudo-block").on("click", ".sudo-cell", function(){
      if($(this).hasClass("is-selected")){
        //clicked cell is already selected, do nothing
        return;
      } else {
        //new cell has been selected
        var getValRegex = /[0-9]+$/;
        var newSelectedCellId = $(this).attr('id').match(getValRegex)[0];
        newSelectedCellId = parseInt(newSelectedCellId, 10);
        SUD.updateCellSelection(newSelectedCellId);
      }
    });
  },

  inputMenu: function(){
    $("#user-input-menu").on("click", ".input-item", function(){
      var selectedCellId = SUD.currentBoard.selectedCell;
      var selectedValue = $(this).attr("data-input-val");
      selectedValue = parseInt(selectedValue, 10);

      if($("#cell_" + selectedCellId).hasClass("is-locked-val")){
        return; 
      } else {
        SUD.updateCellValue(selectedCellId, selectedValue);  
      }
    });
  }
};
