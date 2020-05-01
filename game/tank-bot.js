//      Класс 'TankBot'     //

function TankBot(){
  Tank.apply(this, arguments);

};
TankBot.prototype = Object.create(Tank.prototype);

TankBot.prototype.look = function(){
  //регионы заполняются по часовой стрелке, угол региона 45 град
  // один регион - это часть линии границы карты, которая попадает по углу обзора танка (180 град)
  let arr = [];

  var getRegion1 = () => {
    for(var x = this.place[1]; x <= X; x++){ 
      var stop = false;
      for(var y = this.place[0]; y >= 0; y--){
        var x1 = Math.round(this.place[1] - (this.place[1]-x)*(this.place[0] - y)/(this.place[0]) );
        if(y > this.place[0] -2 && x1 < this.place[1] +2 ) continue;
        if(stop || tBody.rows[y].cells[x1].style.background != '') stop = true;
        else arr.push([y, x1]);
      };
    };
  };
  var getRegion2 = () => {
    for(var y = this.place[0]; y >= 0; y--){
      var stop = false;
      for(var x = this.place[1]; x <= X; x++){
        var y1 = Math.round(this.place[0] - (this.place[0]-y)*(x - this.place[1])/(X - this.place[1]) );
        if(y1 < this.place[0] +2 && x < this.place[1] +2 ) continue;
        if(stop || tBody.rows[y1].cells[x].style.background != '') stop = true;
        else arr.push([y1, x]);
      };
    };
  };
  var getRegion3 = () => {

    for(var y = this.place[0]; y <= Y; y++){
      var stop = false;
      for(var x = this.place[1]; x <= X; x++){
        var y1 = Math.round(this.place[0] + (y - this.place[0])*(x - this.place[1])/(X - this.place[1]) );
        if(y1 < this.place[0] +2 && x < this.place[1] +2 ) continue;
        if(stop || tBody.rows[y1].cells[x].style.background != '') stop = true;
        else arr.push([y1, x]);
      };
    };
  }; 
  var getRegion4 = () => {
    for(var x = this.place[1]; x <= X; x++){ 
      var stop = false;
      for(var y = this.place[0]; y <= Y; y++){
        var x1 = Math.round(this.place[1] + (x - this.place[1])*(y - this.place[0])/(Y - this.place[0]) );
        if(y < this.place[0] +2 && x1 < this.place[1] +2 ) continue;
        if(stop || tBody.rows[y].cells[x1].style.background != '') stop = true;
        else arr.push([y, x1]);
      };
    };
  };
  var getRegion5 = () => {
    for(var x = this.place[1]; x >= 0; x--){ 
      var stop = false;
      for(var y = this.place[0]; y <= Y; y++){
        var x1 = Math.round(this.place[1] - (this.place[1]-x)*(y - this.place[0])/(Y - this.place[0]) );
        if(y < this.place[0] +2 && x1 > this.place[1] - 2 ) continue;
        if(stop || tBody.rows[y].cells[x1].style.background != '') stop = true;
        else arr.push([y, x1]);
      };
    };
  };
  var getRegion6 = () => {
    for(var y = this.place[0]; y <= Y; y++){
      var stop = false;
      for(var x = this.place[1]; x >= 0; x--){
        var y1 = Math.round(this.place[0] + (y - this.place[0])*(this.place[1] - x)/this.place[1]);
        if(y1 < this.place[0] +2 && x > this.place[1] -2 ) continue;
        if(stop || tBody.rows[y1].cells[x].style.background != '') stop = true;
        else arr.push([y1, x]);
      };
    };
  };
  var getRegion7 = () => {
    for(var y = this.place[0]; y >= 0; y--){
      var stop = false;
      for(var x = this.place[1]; x >= 0; x--){
        var y1 = Math.round(this.place[0] - (this.place[0]-y)*(this.place[1] - x)/this.place[1]);
        if(y1 > this.place[0] -2 && x > this.place[1] -2 ) continue;
        if(stop || tBody.rows[y1].cells[x].style.background != '') stop = true;
        else arr.push([y1, x]);
      };
    };
  };
  var getRegion8 = () => {
    for(var x = this.place[1]; x >= 0; x--){
      var stop = false;
      for(var y = this.place[0]; y>=0; y--){
        var x1 = Math.round(this.place[1] - (this.place[1] - x)*(this.place[0] - y)/this.place[0]);
        if(y > this.place[0] -2 && x1 > this.place[1] -2 ) continue;
        if(stop || tBody.rows[y].cells[x1].style.background != '') stop = true;
        else arr.push([y, x1]);
      };
    };
  };


  switch(this.dir){
    case 'up':
      getRegion7();
      getRegion8();
      getRegion1();
      getRegion2(); 
      break;
    case 'right':
      getRegion1();
      getRegion2();
      getRegion3();
      getRegion4();
      break;
    case 'down':
      getRegion3();
      getRegion4();
      getRegion5();
      getRegion6();
      break;
    case 'left':
      getRegion5();
      getRegion6();
      getRegion7();
      getRegion8();
      break;
  };
  this.region = arr;
};
