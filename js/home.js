'use strict';
function displayScores(){
  var elScores = document.getElementById('highscore-table');
  var storageScores = JSON.parse(localStorage.getItem('scores'));
  if(storageScores){
    for(var i = 0; i < storageScores.length; i++){
      var li = document.createElement('li');
      li.textContent = storageScores[i];
      elScores.appendChild(li);
    }
  }
}
displayScores();
