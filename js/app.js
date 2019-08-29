var cssButton = document.getElementById('cssChanger');

var switch1 = 0;
function switchColors(e) {
  e.preventDefault();
  var css = document.getElementById('gameCSS');
  console.log(css.href);
  console.log(switch1);
  if(switch1 === 1) {
    css.href = 'css/styles.css';
    switch1 = 0;
  }
  else {
    switch1 = 1;
    css.href = 'css/styles2.css';
  }

}

cssButton.addEventListener('submit', switchColors);
