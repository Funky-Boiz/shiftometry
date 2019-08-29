'use strict';
function displayScores(){
  var elScores = document.getElementById('highscore-table');
  var normalScores = JSON.parse(localStorage.getItem('normalscores'));
  var hardScores = JSON.parse(localStorage.getItem('hardscores'));
  var elNormal = document.createElement('li');
  var elHard = document.createElement('li');
  elNormal.textContent = 'normal level';
  elHard.textContent = 'hard level';
  elScores.appendChild(elNormal);
  if(normalScores){
    for(var i = 0; i < normalScores.length; i++){
      var liNormal = document.createElement('li');
      liNormal.textContent = normalScores[i].name + ': ' + normalScores[i].scores;
      elScores.appendChild(liNormal);
    }
  }
  elScores.appendChild(elHard);
  if(hardScores){
    for(var i = 0; i < hardScores.length; i++){
      var liHard = document.createElement('li');
      liHard.textContent = hardScores[i].name + ': ' + hardScores[i].scores;
      elScores.appendChild(liHard);
    }
  }
}
displayScores();
