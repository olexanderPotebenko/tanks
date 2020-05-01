let rightPressed,
  leftPressed,
  upPressed,
  downPressed,
  spacePressed,
  ctrlPressed;

function Player(){
  Tank.apply(this, arguments);
}

Player.prototype = Object.create(Tank.prototype);

Player.prototype.move = function(){
  this.timers.move = setInterval( 
    () => {

      this.step();

      if(spacePressed){ 
        tank.stop();
        spacePressed = false;
      };

      console.log("player move");
    }, this.speed);
};

Player.prototype.rotate = function(){
  this.timers.rotate = setInterval(() => {
    if(rightPressed && this.dir != "right"){
      rightPressed = false;
      this.rotateRight();
    }else if(leftPressed && this.dir != "left"){
      leftPressed = false;
      this.rotateLeft();
    }else if(upPressed && this.dir != "up"){
      upPressed = false;
      this.rotateUp();
    }else if(downPressed && this.dir != "down"){
      downPressed = false;
      this.rotateDown();
    };
    rightPressed =
      leftPressed  =
      upPressed    =
      downPressed  = false;

  }, 100)
};


Tank.prototype.stop = function(){
  clearInterval(this.timers.move);

  this.timers.stop = setInterval(() => {
    console.log(this.name + " stop");
    if(spacePressed){
      spacePressed = false;
      clearInterval(this.timers.stop);
      this.move();
    };}, 100);
};

Player.prototype.shoot = function(){
  this.timers.shoot = setInterval(() => {
    if(ctrlPressed){
      console.log(this.id + ' shoot')

      let changeParam;
      switch(this.dir){
        case "up":
          changeParam = [-1, 0];
          break;
        case "down":
          changeParam = [+1, 0];
          break;
        case "right":
          changeParam = [0, +1];
          break;
        case "left":
          changeParam = [0, -1];
          break;
      };
      
      let place = [
        this.place[0] + changeParam[0], 
        this.place[1] + changeParam[1]];
      this.outshots.push(new Outshot(this.id, place, this.dir, "#ADFF2F"));

      /*      this.outshots.push(shot);*/
      ctrlPressed = false;
    };
  }, 400);
};


addEventListener("keyup", keyUpHandler);

function keyUpHandler(e){
  if(e.key == 'Right' || e.key == 'ArrowRight'){
    rightPressed = true;
  }else if(e.key == 'Left' || e.key == "ArrowLeft"){
    leftPressed = true;
  };
  if(e.key == 'ArrowUp')
    upPressed = true;
  if(e.key == 'ArrowDown')
    downPressed = true;
  if(e.key == 'Enter')
    enterPressed = true;
  if(e.key == 'Escape')
    escapePressed = true;
  if(e.code == 'KeyZ' || e.keyCode == "32")
    spacePressed = true;
  if(e.keyCode == "17")
    ctrlPressed = true;
};

function keyDownHandler(e){
  if(e.key == 'Right' || e.key == 'ArrowRight'){
    rightPressed = true;
  }else if(e.key == 'Left' || e.key == "ArrowLeft"){
    leftPressed = true;
  };
};
