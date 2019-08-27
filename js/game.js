'use strict';

var block = document.getElementById('shape');
var gameWindow = document.getElementById('gameWindow');
var tryAgain = document.getElementById('try-again');
var overlay = document.getElementById('overlay');
var input = document.getElementById('name-input');
var tryAgainButton = document.getElementById('try-again-button');
var elScore = document.getElementById('score');
var elAttempts = document.getElementById('attempts');

//scaling difficulties
var level = 1;
var toNextLevel = 1;

var score = 0;
var username = '';


var attempts = 3;

var groupedScores = [];

function PeopleScores(name, scores){
  this.name = name;
  this.scores = scores;
  groupedScores.push(this);
}

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
    checkIfLevelUp();
    pos.x = x + level;
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

function checkIfLevelUp(){
  if (toNextLevel > 3) {
    level++;
    toNextLevel = 1;
    console.log(level);
  }
}

function checkIfCorrect(){
  if (pos.y <= 55 && pos.y >= 5 && block.className === 'circle'){
    score+=100;
    toNextLevel++;
  }
  else if(pos.y <= 155 && pos.y >= 105 && block.className === 'square'){
    score+=100;
    toNextLevel++;
    console.log('square');
  }
  else if(pos.y <= 255 && pos.y >= 205 && block.className === 'triangle'){
    score+=100;
    toNextLevel++;
    console.log('triangle');
  }
  else if(pos.y <= 355 && pos.y >= 305 && block.className === 'hexagon'){
    score+=100;
    toNextLevel++;
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
  elScore.textContent = 'Score: ' + score;
  elAttempts.textContent ='Attempts: ' + attempts;
}


function gameOver(){
  scoreAndAttemptsOnPage();
  tryAgainScreen();
  saveHighScores();
  attempts = 3;
}

function loadHighScore(){
  var loadedScore = JSON.parse(localStorage.getItem('scores'));
  if(loadedScore){
    groupedScores = loadedScore;
  }
}


function nameInputScreen(){
  overlay.classList.toggle('hidden');
}

function startGame(e){
  e.preventDefault();
  username = e.target.username.value;
  nameInputScreen();
  randomShapeGenerator();
  block = document.getElementById('shape');
  pos.x = 30;
  pos.y = 180;
  movingRight();
  console.log(username);
}

function tryAgainScreen(){
  tryAgain.classList.toggle('hidden');
  var tryAgainScore = document.getElementById('try-again-score');
  tryAgainScore.textContent = score;
}

function resetGame(e){
  e.preventDefault();
  tryAgain.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
  score = 0;
  elScore.textContent = 'Score: ' + score;
  attempts = 3;
  elAttempts.textContent ='Attempts: ' + attempts;
  input.reset();
}




function organizedHighScore(){
  var highestLowest = groupedScores;
  highestLowest.sort(function(a, b) {
    return b.scores - a.scores;
  });
  return highestLowest;
}


loadHighScore();
scoreAndAttemptsOnPage();

input.addEventListener('submit', startGame);
document.addEventListener('keydown', logKey);
tryAgainButton.addEventListener('submit', resetGame);

function saveHighScores(){
  new PeopleScores(username, score);
  organizedHighScore();
  var storeScores = JSON.stringify(groupedScores);
  localStorage.setItem('scores', storeScores);
}
