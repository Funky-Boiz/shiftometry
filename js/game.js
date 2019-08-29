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
// grouping different users
var normalUsers = [];
var hardUsers = [];
var groupedScores = [];


var difficulty = 1;
var currentGoalArray = Array.from(goals);



function PeopleScores(name, scores){
  this.name = name;
  this.scores = scores;
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

function toggleDifficultyButton(){
  if(difficulty === 1){
    hardModeButton.classList.toggle('hidden');
  }
  if(difficulty === 2){
    normalModeButton.classList.toggle('hidden');
  }
}

function setHardMode(e){
  e.preventDefault();
  difficulty = 2;
  hardModeButton.classList.toggle('hidden');
  normalModeButton.classList.toggle('hidden');
  difficultyText.textContent = 'Mode: Hard';
}

function setNormalMode(e){
  e.preventDefault();
  difficulty = 1;
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
  }
  else if(pos.y <= 255 && pos.y >= 205 && block.className === array[2].toString()){
    score+=100;
    toNextLevel++;
  }
  else if(pos.y <= 355 && pos.y >= 305 && block.className === array[3].toString()){
    score+=100;
    toNextLevel++;
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
  toggleDifficultyButton();
}

function loadHighScore(){
  var loadedNormalScores = JSON.parse(localStorage.getItem('normalscores'));
  if(loadedNormalScores){
    normalUsers = loadedNormalScores;
  }
  var loadedHardScores = JSON.parse(localStorage.getItem('hardscores'));
  if(loadedHardScores){
    hardUsers = loadedHardScores;
  }
}


function nameInputScreen(){
  overlay.classList.toggle('hidden');
}

function startGame(e){
  e.preventDefault();
  toggleDifficultyButton();
  username = e.target.username.value;
  nameInputScreen();
  randomShapeGenerator();
  block = document.getElementById('shape');
  pos.x = 30;
  pos.y = 180;
  level = 2;
  movingRight();
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
  for (var i = 0; i < numberOfGoals; i++){
    var randomGoal = localGoalArray.splice(Math.floor(Math.random() * localGoalArray.length), 1);
    var elGoal = document.getElementById(`goal${i+1}`);
    elGoal.textContent = randomGoal;
    randomGoalArray.push(randomGoal);
  }
  return randomGoalArray;
}



function organizedHighScore(array){
  var highestLowest = array;
  highestLowest.sort(function(a, b) {
    return b.scores - a.scores;
  });
  if( highestLowest.length > 5){
    highestLowest.pop();
  }
  return highestLowest;
}

function saveHighScores(){
  var currentPlayer = new PeopleScores(username, score);
  if (difficulty === 1){
    normalUsers.push(currentPlayer);
  }
  else if (difficulty === 2){
    hardUsers.push(currentPlayer);
  }
  organizedHighScore(normalUsers);
  organizedHighScore(hardUsers);
  var storeNormalUsers = JSON.stringify(normalUsers);
  var storeHardUsers = JSON.stringify(hardUsers);
  localStorage.setItem('normalscores', storeNormalUsers);
  localStorage.setItem('hardscores', storeHardUsers);
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
