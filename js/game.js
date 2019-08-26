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
    pos.x = x + 4;
    block.style.left = pos.x + 'px';
  }
  else {
    // block.id = '';
    checkIfCorrect();
    gameWindow.removeChild(block);
  }
}
//movement vertically
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
//taking key inputs
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
  if (pos.y <= 55 && pos.y >= 5 && block.className === 'circle'){
    console.log('circle');
  }
  if (pos.y <= 155 && pos.y >= 105 && block.className === 'square'){
    console.log('square');
  }
  if (pos.y <= 255 && pos.y >= 205 && block.className === 'triangle'){
    console.log('triangle');
  }
  if (pos.y <= 355 && pos.y >= 305 && block.className === 'hexagon'){
    console.log('hexamex');
  }
}

function randomShapeGenerator(){
  var randomNumber = Math.floor(Math.random() * 4) + 1;
  switch (randomNumber){
  case 1:
    //generate circle
    var newCircle = document.createElement('div');
    newCircle.className = 'circle';
    gameWindow.appendChild(newCircle);
    break;
  case 2:
    //generate square
    var newSquare = document.createElement('div');
   newSquare.className = 'square';
    gameWindow.appendChild(newSquare);
    break;
  case 3:
    //generate tri
    var newTriangle = document.createElement('div');
    newTriangle.className = 'triangle';
    gameWindow.appendChild(newTriangle);
    break;
  case 4:
    //generate hex
    var newHexagon = document.createElement('div');
    newHexagon.className = 'hexagon';
    gameWindow.appendChild(newHexagon);
    break;
  }
  
}

randomShapeGenerator();
movingRight();

document.addEventListener('keydown', logKey);

