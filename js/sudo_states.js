SUD.sudoStates = {

  easyStart: function(){
    var easySudo = "530070000600195000098000060800060003400803001700020006060000280000419005000080079"; 

    easySudo = easySudo.split('');

    for(var i=0, len=easySudo.length; i < len; i++){ 
      easySudo[i] = parseInt(easySudo[i], 10);
    } 
    return easySudo;
  },

  nearlySolvedExample: function(){
    var nearlySolvedState = "534678912672195348198342567859761423426853791713924856961537284287419635345286170";
    nearlySolvedState = nearlySolvedState.split('');

    for(var i=0, len=nearlySolvedState.length; i < len; i++){ 
      nearlySolvedState[i] = parseInt(nearlySolvedState[i], 10);
    } 
    return nearlySolvedState;
  }
};
