//      КЛАСС 'TANK'        //
function Tank(id, color = 'white', place = this.placeAppear(), dir = 'up', speed = 1) {
  this.id = id;
  this.color = color;
  this.place = place;
  this.dir = dir;
  this.speed = speed > 0? 1000/speed : 1000;

  this.timers = {move: 0,stop: 0, shoot: 0};
  this.outshots = [];
  this.arrDotObject = this.getArrDotTank().slice();
  this.arrDotObject.x = [];
  this.arrDotObject.y = [];
  this.dotObject = {x: [], y: []};
  this.dotObject.id = this.id;

  for(let i = 0; i < this.arrDotObject.length; i++){
    this.dotObject.x.push(this.arrDotObject[i][1]);
    this.dotObject.y.push(this.arrDotObject[i][0]);
  };
}

Tank.prototype.drow = function(){
  var self = this;
  this.arrDotObject.forEach(function(item){
    if(item[0] == self.place[0] && item[1] == self.place[1]) tBody.rows[item[0]].cells[item[1]].style.backgroundColor = 'green';
    else tBody.rows[item[0]].cells[item[1]].style.backgroundColor = self.color;
  });
};
Tank.prototype.clear = function(){
    var self = this;
  this.arrDotObject.forEach(function(item){
    if(item[0] == self.place[0] && item[1] == self.place[1]) tBody.rows[item[0]].cells[item[1]].style.backgroundColor = 'black';
    else tBody.rows[item[0]].cells[item[1]].style.backgroundColor = background;
  });
};
Tank.prototype.step = function(){
  var changeParam = [];

  switch(this.dir){
    case 'up':
      if(this.place[0] == 1 || 
        ~getCollisionIdentifier({ x: [this.place[1] - 1,
          this.place[1],
          this.place[1] + 1],
          y: [this.place[0] - 2,
            this.place[0] - 2,
            this.place[0] - 2] 
        }, allObjects, [this.id])
      ){
        /*        console.log(this.id + " collise!");*/
        return;
      };
      changeParam = [-1, 0];
      break;
    case 'right':
      if(this.place[1] == X-1 || 
        ~getCollisionIdentifier({x: [this.place[1] + 2,
          this.place[1] + 2,
          this.place[1] + 2],
          y: [this.place[0] - 1,
            this.place[0],
            this.place[0] + 1] 
        }, allObjects, [this.id])
      ) {
        /*        console.log(this.id + " collise!");*/
        return;
      };
      changeParam = [0, 1];
      break;
    case 'down':
      if(
        this.place[0] == Y-1 || 
        ~getCollisionIdentifier({ x: [this.place[1] - 1,
          this.place[1],
          this.place[1] + 1],
          y: [this.place[0] + 2,
            this.place[0] + 2,
            this.place[0] + 2] 
        }, allObjects, [this.id])
      ) {
        /*        console.log(this.id + " collise!");*/
        return;
      };
      changeParam = [1, 0];
      break;
    case 'left':
      if(this.place[1] == 1 || 
        ~getCollisionIdentifier({ x: [this.place[1] - 2,
          this.place[1] - 2,
          this.place[1] - 2],
          y: [this.place[0] - 1,
            this.place[0],
            this.place[0] + 1] 
        }, allObjects, [this.id])
      ){
        console.log(this.id + " collise!");
        return;
      };
      changeParam = [0, -1];
      break;
  };
  this.clear();
  this.place[0] += changeParam[0];
  this.place[1] += changeParam[1];

  this.arrDotObject = this.getArrDotTank();
  this.drow();

};
Tank.prototype.move = function(){
  /*  console.log(this.id + " move");*/
  var self = this;
  this.timer = setInterval(self.step.bind(self), self.speed);
};
Tank.prototype.stop = function(){
  clearInterval(this.timers.move);

  this.timers.stop = setInterval(() => {
    /*    console.log(this.id + " stop");*/
    this.drow();
  }, 10);
};
Tank.prototype.rotateUp = function(){
  if(this.dir == 'down') return;
  this.dir = 'up';
  this.clear();
  this.arrDotObject = this.getArrDotTank();
  this.drow();
};
Tank.prototype.rotateRight = function(){
  if(this.dir == 'left') return;
  this.dir = 'right';
  this.clear();
  this.arrDotObject = this.getArrDotTank();
  this.drow();
};
Tank.prototype.rotateDown = function(){
  if(this.dir == 'up') return;
  this.dir = 'down';
  this.clear();
  this.arrDotObject = this.getArrDotTank();
  this.drow();
};
Tank.prototype.rotateLeft = function(){
  if(this.dir == 'right') return;
  this.dir = 'left';
  this.clear();
  this.arrDotObject = this.getArrDotTank();
  this.drow();
};

Tank.prototype.getArrDotTank = function(){
  var arr = [
    [[this.place[0]-1, this.place[1]-1],[this.place[0]-1, this.place[1]+0], [this.place[0]-1, this.place[1]+1]],

    [[this.place[0]+0, this.place[1]-1],[this.place[0]+0, this.place[1]+0], [this.place[0]+0, this.place[1]+1]],

    [[this.place[0]+1, this.place[1]-1],[this.place[0]+1, this.place[1]+0], [this.place[0]+1, this.place[1]+1]]
  ];

  this.place[0] = arr[1][1][0];
  this.place[1] = arr[1][1][1];

  var arrTankTemplate = [
    [[0],[1],[0]],
    [[1],[1],[1]],
    [[1],[0],[1]]
  ];
  var rotate = function(){
    var newArr = [[[],[],[]],[[],[],[]],[[],[],[]]];
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        newArr[j][2-i] = arrTankTemplate[i][j];
      };
    };
    arrTankTemplate = newArr.slice();
  };
  switch(this.dir){
    case 'up':
      break;
    case 'right':
      rotate();
      break;
    case 'down':
      rotate();
      rotate();
      break;
    case 'left':
      rotate();
      rotate();
      rotate();
      break;
  };

  var result = [];
  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < arr.length; j++){
      if(arrTankTemplate[i][j] == 1) result.push([arr[i][j][0], arr[i][j][1]]);
    };
  };
  result.x = [];
  result.y = [];
  for(let i = 0; i < result.length; i++){
    result.x.push(result[i][0]);
    result.y.push(result[i][1]);
  };
  return result;
};

Tank.prototype.placeAppear = function(){};
Tank.prototype.shoot = function(){
  /*      console.log(this.id + ' shoot')*/
  alert(this.place[0]);
  switch(this.dir){
    case "up":
      this.outshots.push(new Outshot(this.id, [this.place[0] + 2, this.place[1]], this.dir, "#ADFF2F"));
      break;
    case "down":
      this.outshots.push(new Outshot(this.id, [this.place[0] + 2, this.place[1]], this.dir, "#ADFF2F"));
      break;
    case "right":
      this.outshots.push(new Outshot(this.id, [this.place[0], this.place[1] + 2], this.dir, "#ADFF2F"));
      break;
    case "left":
      this.outshots.push(new Outshot(this.id, [this.place[0], this.place[1] - 2], this.dir, "#ADFF2F"));
      break;
  };
};

function Outshot(id, place, dir, color){
  this.id = id;
  this.place = {};
  this.place.x = [place[1]];
  this.place.y = [place[0]];
  this.dir = dir;
  this.color = color;

  this.stepCounter = 0;
  this.move();
}

Outshot.prototype.move = function(){
  this.timer = setInterval(() => {
    console.log("aaaaaaaa");
    this.step();
  }, 30);
};

Outshot.prototype.step = function(){
  /*  console.log(this.id + "step shoot");*/
  this.stepCounter += 1;

  let getChangeParam = () => {

    switch(this.dir){
      case 'up':
        return [0, -1];
        break;
      case 'down':
        return [0, +1];
        break;
      case 'left':
        return [-1, 0];
        break;
      case 'right':  
        return [+1, 0];
    }; 
  };
  let changeParam = getChangeParam();
  let place = {
                x: [+this.place.x[0] + changeParam[0]],
                y: [+this.place.y[0] + changeParam[1]]};

  let id = getCollisionIdentifier(place, allObjects, this.id); 

  if(~id){
  if(this.stepCounter > 1){
    this.clear();
  };
    clearInterval(this.timer);
    return;
  }; 

  if(this.stepCounter > 1) this.clear();
  this.place = place;
  this.drow();
  if(~id){
  if(this.stepCounter > 1){
    this.clear();
  };
    clearInterval(this.timer);
    return;
  };
};

Outshot.prototype.drow = function(){
  /*  console.log("step shot");*/
  tBody.rows[this.place.y[0]].cells[this.place.x[0]].style.backgroundColor = this.color;
};

Outshot.prototype.clear = function(){
  tBody.rows[this.place.y[0]].cells[this.place.x[0]].style.backgroundColor = "black";
};

/*function getCollisionIdentifier(object, arrObjects, ignore){*/
/**/
/*  for(let i = 0; i < arrObjects.length; i++){*/
/*    if(ignore.includes(arrObjects[i].id)) continue;*/
/*    if(checkColis (object, arrObjects[0])){*/
/*      let id = arrObjects[i].id;*/
/*      console.log(id);*/
/*      return id;*/
/*    };*/
/*  };*/
/*  return -1;*/
/*};*/
function getCollisionIdentifier(object, arrObjects, ignore){
  let idSelf = -1;
  let id;
  for(let i = 0; i < arrObjects.length; i++){
    if(ignore.includes(arrObjects[i].id)) continue;
    idSelf *= checkColis(object, arrObjects[i]);
};
  return idSelf;
};
function checkColis (object1, object2){
  let response; 
  for(let i = 0; i <= object1.x.length; i++){
    let a = object2.y.includes(object1.y[i]);
    let b = object2.x.includes(object1.x[i]);
    if(a && b 
         || (object1.y[i] == 0 || object1.y[i] == Y ||
             object1.x[i] == 0 || object1.x[i] == X)) 
      return 0;
  };
  return 1;
};


