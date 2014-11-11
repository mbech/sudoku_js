SUD.sudoStates = {

  easyStart: function(){
    easySudo = "530070000" + 
      "600195000" + 
      "098000060" + 
      "800060003" + 
      "400803001" + 
      "700020006" + 
      "060000280" + 
      "000419005" + 
      "000080079"; 

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
