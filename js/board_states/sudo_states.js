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
  }
};
