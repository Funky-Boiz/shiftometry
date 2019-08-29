'use strict';

var cssButton = document.getElementById('cssChanger');

function displayScores(){
  var elScores = document.getElementById('highscore-table');
  var storageScores = JSON.parse(localStorage.getItem('scores'));
  if(storageScores){
    for(var i = 0; i < storageScores.length; i++){
      var li = document.createElement('li');
      li.textContent = storageScores[i].name + ': ' + storageScores[i].scores;
      elScores.appendChild(li);
    }
  }
}
displayScores();

var switch1 = 0;
function switchColors(e) {
  e.preventDefault();
  var css = document.getElementById('gameCSS');
  console.log(css.href);
  console.log(switch1);
  if(switch1 === 1) {
    css.href = '/css/highscore.css';
    switch1 = 0;
  }
  else {
    switch1 = 1;
    css.href = '/css/highscore2.css';
  }

}

cssButton.addEventListener('submit', switchColors);
