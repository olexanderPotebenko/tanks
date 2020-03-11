  var allObjects = [];
  allObjects.push(arrDotBarriers);

  let hitArr = [];

  var bot1 = new TankBot('bot1', '#DC143C', [3, 20], 'down', 5);
  var tank = new Player('player', '#20B2AA', [20 ,20], 'up', 9);
  allObjects.push(tank.dotObject);
  allObjects.push(bot1.dotObject);


  tableDrow();
bot1.move();
tank.move();
tank.rotate();
tank.shoot();

/*
setInterval(function(){
  tank.look(); tank.region.forEach(function(item){tBody.rows[item[0]].cells[item[1]].style.background = 'red'; }); setTimeout(function(){tank.region.forEach(function(item){tBody.rows[item[0]].cells[item[1]].style.background = ''; });
  }, tank.speed/2)}, tank.speed);
*/
