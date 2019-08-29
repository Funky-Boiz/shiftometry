'use strict';

var block = document.getElementById('shape');
var gameWindow = document.getElementById('gameWindow');
var tryAgain = document.getElementById('try-again');
var overlay = document.getElementById('overlay');
var input = document.getElementById('name-input');
var tryAgainButton = document.getElementById('try-again-button');
var hardModeButton = document.getElementById('hardMode');
var normalModeButton = document.getElementById('normal');
var difficultyText = document.getElementById('difficultyText');
var elScore = document.getElementById('score');
var elAttempts = document.getElementById('attempts');

var goals = ['circle', 'square', 'triangle', 'hexagon'];
var numberOfGoals = goals.length;

//scaling difficulties
var level = 2;
var toNextLevel = 1;

var score = 0;
var username = '';

var attempts = 3;
var groupedScores = [];

var difficulty = 1;
var currentGoalArray = Array.from(goals);

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

function selectDifficulty(){
  if (difficulty === 1){
    //set normal mode
    currentGoalArray = Array.from(goals);
  }
  else if (difficulty === 2){
    currentGoalArray = generateRandomGoal();
  }
  else if (difficulty === 3){
    //set harder mode
  }
}

function setHardMode(e){
  e.preventDefault();
  difficulty = 2;
  console.log(difficulty);
  hardModeButton.classList.toggle('hidden');
  normalModeButton.classList.toggle('hidden');
  difficultyText.textContent = 'Mode: Hard';
}

function setNormalMode(e){
  e.preventDefault();
  difficulty = 1;
  console.log(difficulty);
  hardModeButton.classList.toggle('hidden');
  normalModeButton.classList.toggle('hidden');
  difficultyText.textContent = 'Mode: Normal';
}

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
    checkIfCorrect(currentGoalArray);
    selectDifficulty();
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
  if (pos.y > 36){
    pos.y -= 50;
    block.style.top = pos.y + 'px';
  }
}
function movingDown(){
  if (pos.y < 324){
    pos.y += 50;
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

function checkIfCorrect(array){
  if (pos.y <= 55 && pos.y >= 5 && block.className === array[0].toString()){
    score+=100;
    toNextLevel++;
  }
  else if(pos.y <= 155 && pos.y >= 105 && block.className === array[1].toString()){
    score+=100;
    toNextLevel++;
    console.log('square');
  }
  else if(pos.y <= 255 && pos.y >= 205 && block.className === array[2].toString()){
    score+=100;
    toNextLevel++;
    console.log('triangle');
  }
  else if(pos.y <= 355 && pos.y >= 305 && block.className === array[3].toString()){
    score+=100;
    toNextLevel++;
    console.log('hexamex');
  }
  else {
    attempts--;
    score-=25;
    playAvery();
  }
}

function playAvery(){
  var avery = document.getElementById('avery');
  avery.play();
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
  level = 6;
  movingRight();
  console.log(username);
}

function tryAgainScreen(){
  tryAgain.classList.toggle('hidden');
  var tryAgainScore = document.getElementById('try-again-score');
  tryAgainScore.textContent = 'Score: ' + score;
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

//randomize goals
function generateRandomGoal(){
  var localGoalArray = Array.from(goals);
  var randomGoalArray = [];
  console.log(localGoalArray);
  for (var i = 0; i < numberOfGoals; i++){
    var randomGoal = localGoalArray.splice(Math.floor(Math.random() * localGoalArray.length), 1);
    var elGoal = document.getElementById(`goal${i+1}`);
    elGoal.textContent = randomGoal;
    randomGoalArray.push(randomGoal);
  }
  return randomGoalArray;
}



function organizedHighScore(){
  var highestLowest = groupedScores;
  highestLowest.sort(function(a, b) {
    return b.scores - a.scores;
  });
  if( highestLowest.length > 5){
    highestLowest.pop();
  }
  return highestLowest;
}

function saveHighScores(){
  new PeopleScores(username, score);
  organizedHighScore();
  var storeScores = JSON.stringify(groupedScores);
  localStorage.setItem('scores', storeScores);
}

function setVolume(){
  var backgroundMusic = document.getElementById('backgroundMusic');
  backgroundMusic.volume = 0.4;
}

setVolume();
loadHighScore();
scoreAndAttemptsOnPage();
difficultyText.textContent = 'Mode: Normal';


input.addEventListener('submit', startGame);
document.addEventListener('keydown', logKey);
tryAgainButton.addEventListener('submit', resetGame);
hardModeButton.addEventListener('submit', setHardMode);
normalModeButton.addEventListener('submit', setNormalMode);



window.addEventListener('keydown', function(e){
  if([32,37,38,39,40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);
