
function DieSide(dieId, index){
  const api = {};
  api.id = function(){
    return `${dieId}-${index}`;
  }
  api.default = function(){
    return index;
  }
  api.value = null;
  api.getValue = function(){
    if (api.value === null){
      return api.default();
    }
    return api.value;
  }
  return api;
}

function Die(dieId){
  const api = {};
  api.id = function(){
    return dieId;
  }
  api.sides = [1,2,3,4,5,6].map(function (index){
    return DieSide(api.dieId, index);
  })
  return api;
}

const Manager = {};
Manager.new = function(){
  const api = {};
  const self = {};

  self.dice = [1,2,3].map(Die);
  self.sideLookup = {};
  self.dice.forEach(function (die){
    die.sides.forEach(function (dieSide){
      self.sideLookup[dieSide.id()] = dieSide;
    })
  })

  self.getDisplayDie = function(die){
    return die;
  }

  self.getDisplayDice = function(){
    return self.dice.map(self.getDisplayDie);
  }

  api.getDisplay = function(){
    return {
      dice: self.getDisplayDice(),
    };
  }
  api.setDieSide = function(dieSideId, value){
    self.sideLookup[dieSideId].value = parseInt(value, 10);
  }

  return api;
}

export default Manager;
