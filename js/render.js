SUD.render = {
  emptyGrid: function(){
   var $board = $('#board-container');
  
   //Create and append blocks
   for(var i=0; i < 9; i++){
     var $block = $("<div>", {class: "sudo-block"}); 
     $block.attr('data-block-id', i);
     $board.append($block); 
   };
  }
};
