'use strict';

var block = document.getElementById('shape');
var gameWindow = document.getElementById('gameWindow');
var squareGoal = document.getElementById('squareGoal');
var circleGoal = document.getElementById('circleGoal');
var triangleGoal = document.getElementById('triangleGoal');
var hexagonGoal = document.getElementById('hexagonGoal');

//position of moving block shape
var pos = {
  x: 30,
  y: 180,
};

//move block shape to the right and remove when it hits the end
function movingRight(){
  if (pos.x < 770){
    requestAnimationFrame(movingRight);
    var x = pos.x;
    pos.x = x + 1;
    block.style.left = pos.x + 'px';
  }
  else {
    // block.id = '';
    checkIfCorrect();
    gameWindow.removeChild(block);
  }
}

function movingUp(){
  if (pos.y > 6){
    pos.y -= 25;
    block.style.top = pos.y + 'px';
  }
}
function movingDown(){
  if (pos.y < 354){
    pos.y += 25;
    block.style.top = pos.y + 'px';
  }
}

function logKey(e) {
  switch (e.code) {
  case 'KeyW':
  case 'ArrowUp':
    movingUp();
    break;
  case 'KeyS':
  case 'ArrowDown':
    movingDown();
    break;
    
  default:
    break;
  }
}
  
function checkIfCorrect(){
  if (pos.y <= 55 && pos.y >= 5 && block.className === 'square'){
    console.log('you did it');
  }
}
// movingRight();

document.addEventListener('keydown', logKey);

