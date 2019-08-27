'use strict';

var block = document.getElementById('shape');
var gameWindow = document.getElementById('gameWindow');
var squareGoal = document.getElementById('squareGoal');
var circleGoal = document.getElementById('circleGoal');
var triangleGoal = document.getElementById('triangleGoal');
var hexagonGoal = document.getElementById('hexagonGoal');
var score = 0;

var highScore = [];

var attempts = 3;


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
    if(attempts > 0){
      randomShapeGenerator();
      block = document.getElementById('shape');
      pos.x = 30;
      pos.y = 180;
      movingRight();
      console.log(attempts);
      scoreAndAttemptsOnPage();
    }
    else{
      gameOver();
    }
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
    score+=100;
  }
  else if(pos.y <= 155 && pos.y >= 105 && block.className === 'square'){
    score+=100;
    console.log('square');
  }
  else if(pos.y <= 255 && pos.y >= 205 && block.className === 'triangle'){
    score+=100;
    console.log('triangle');
  }
  else if(pos.y <= 355 && pos.y >= 305 && block.className === 'hexagon'){
    score+=100;
    console.log('hexamex');
  }
  else {
    attempts--;
    score-=25;
  }
}

function randomShapeGenerator(){
  var randomNumber = Math.floor(Math.random() * 4) + 1;
  switch (randomNumber){
  case 1:
    //generate circle
    var newCircle = document.createElement('div');
    newCircle.className = 'circle';
    newCircle.id = 'shape';
    gameWindow.appendChild(newCircle);
    break;
  case 2:
    //generate square
    var newSquare = document.createElement('div');
    newSquare.className = 'square';
    newSquare.id = 'shape';
    gameWindow.appendChild(newSquare);
    break;
  case 3:
    //generate tri
    var newTriangle = document.createElement('div');
    newTriangle.className = 'triangle';
    newTriangle.id = 'shape';
    gameWindow.appendChild(newTriangle);
    break;
  case 4:
    //generate hex
    var newHexagon = document.createElement('div');
    newHexagon.className = 'hexagon';
    newHexagon.id = 'shape';
    gameWindow.appendChild(newHexagon);
    break;
  }

}

function scoreAndAttemptsOnPage(){
  var elScore = document.getElementById('score');
  var elAttempts = document.getElementById('attempts');

  elScore.textContent = 'Score: ' + score;
  elAttempts.textContent ='Attempts: ' + attempts;
}

function gameOver(){
  alert('WRONG BITCH, TRY AGAIN');
  highScore.push(score);
  score = 0;
  attempts = 3;
  saveHighScores();
}

function loadHighScore(){
  var loadedScore = JSON.parse(localStorage.getItem('scores'));
  if(loadedScore){
    highScore = loadedScore;
  }
}

function topFive(){
  for(var i = 0; i < highScore.length; i++){
    if(score > highScore[i]){
      highScore.push(score);
    }
  }
}




loadHighScore();
scoreAndAttemptsOnPage();
// randomShapeGenerator();
// movingRight();

document.addEventListener('keydown', logKey);

function saveHighScores(){
  var storeScores = JSON.stringify(highScore);
  localStorage.setItem('scores', storeScores);
}
