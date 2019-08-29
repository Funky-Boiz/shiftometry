'use strict';

var showDifferentScore = document.getElementById('showDifferentScore');


function displayScores(){
  var elScores = document.getElementById('highscore-table');
  var normalScores = JSON.parse(localStorage.getItem('normalscores'));
  var hardScores = JSON.parse(localStorage.getItem('hardscores'));
  var elNormal = document.createElement('li');
  var elHard = document.createElement('li');
  elNormal.textContent = 'normal level';
  elNormal.id = 'normaltable';
  elHard.textContent = 'hard level';
  elHard.id = 'hardtable';
  elHard.classList.toggle('hidden');
  elScores.appendChild(elNormal);
  if(normalScores){
    for(var i = 0; i < normalScores.length; i++){
      var liNormal = document.createElement('li');
      liNormal.textContent = normalScores[i].name + ': ' + normalScores[i].scores;
      elNormal.appendChild(liNormal);
    }
  }
  elScores.appendChild(elHard);
  if(hardScores){
    for(var j = 0; j < hardScores.length; j++){
      var liHard = document.createElement('li');
      liHard.textContent = hardScores[j].name + ': ' + hardScores[j].scores;
      elHard.appendChild(liHard);
    }
  }
}
displayScores();



function showDifferentHighScores(e){
  e.preventDefault();
  var hardscores = document.getElementById('hardtable');
  var normalscores = document.getElementById('normaltable');
  hardscores.classList.toggle('hidden');
  normalscores.classlist.toggle('hidden');
}

showDifferentScore.addEventListener('submit', showDifferentHighScores);
