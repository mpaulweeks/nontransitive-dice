
function DieSide(dieId, index){
  const api = {};
  const self = {};

  self.value = null;

  api.id = function(){
    return `${dieId}-${index}`;
  }
  api.default = function(){
    return index;
  }
  api.getValue = function(){
    return self.value;
  }
  api.getValueOrDefault = function(){
    const value = api.getValue();
    if (value === null){
      return api.default();
    }
    return value;
  }
  api.setValue = function(value){
    self.value = value;
  }
  return api;
}

function Die(dieId){
  const api = {};
  const self = {};

  self.sides = [1,2,3,4,5,6].map(function (index){
    return DieSide(dieId, index);
  })

  api.id = function(){
    return dieId;
  }
  api.getSides = function(){
    return self.sides;
  }
  api.roll = function(){
    const index = Math.floor(Math.random() * self.sides.length);
    return self.sides[index].getValueOrDefault();
  }
  return api;
}

const Manager = function(){
  const api = {};
  const self = {};

  self.dice = [1,2,3].map(Die);
  self.sideLookup = {};
  self.dice.forEach(function (die){
    die.getSides().forEach(function (dieSide){
      self.sideLookup[dieSide.id()] = dieSide;
    })
  })

  api.getDisplay = function(){
    return {
      dice: self.dice,
    };
  }
  api.setDieSide = function(dieSideId, value){
    self.sideLookup[dieSideId].setValue(parseInt(value, 10));
  }
  api.calculate = function(){
    const runs = 10000;
    const numDice = self.dice.length;
    const tally = [];
    for(var d = 0; d < numDice; d++){
      tally[d] = 0;
      const dice1 = self.dice[d];
      const dice2 = self.dice[(d+1)%numDice];
      for(var i = 0; i < runs; i++){
        const roll1 = dice1.roll();
        const roll2 = dice2.roll();
        if (roll1 < roll2){
          tally[d] += 1;
        }
        if (roll1 > roll2){
          tally[d] -= 1;
        }
      }
      const victory = (tally[d] > runs/10);
      console.log(victory);
    }
    console.log(tally);
  }

  return api;
}

export default Manager;
