var careerpath = require('./BMCC-CP');
var stages = careerpath.stages;
var max_earningsPerYear = 67890, min_earningsPerYear = 10000;
var levels = stages.length;

var height = width = 300
//var height = Math.sqrt(300*300-150*150); // equilateral triangle hypotnuse == width

function coor2point(x,y) {return ' ' + x.toString() + ',' + y.toString(); }

function trapezius(i) {
  var Dw = width/2;
  var x0 = i/levels*Dw, x1 = (i+1)/levels*Dw, x2 = width-x1, x3 = width - x0;
  var y0 = y3 = (levels-i)/levels*height, y1 = y2 = (levels-i-1)/levels*height;
  return ('  <polygon id="level_' + i + '" '
    + 'class="pyramid-level" level="' + i + '" '
    + 'percentile = "' + stages[i]['percentile'] + '" '
    + 'earningsPerYear = "' + stages[i]['earningsPerYear'] + '" '
    + 'state="to-go" '
    + 'style="fill:lightgrey;stroke:white;stroke-width:1" '
    + 'onClick="paintDown(this)" '
    + 'points="' + coor2point(x0,y0) + coor2point(x1,y1) + coor2point(x2,y2) + coor2point(x3,y3) + '" '
    + '/>');
}

function bar(i) {
  var Dw = width/20;
  var x0 = x3 = i*Dw, x1 = x2 = (i+1)*Dw;
  var y0 = y1 = height, y2 = y3 = (1-min_earningsPerYear/max_earningsPerYear)*height;
  for (d=0; d<i*5 && d<stages.length; d++) {
    var q = stages[d]['percentile'];
    if ((i+1)*5 >= q) y2 = y3 = (1-stages[d]['earningsPerYear']/max_earningsPerYear)*height;
  }
  if ((i+1)*5==100) y2 = y3 = 0;
  return '  <polygon id="percentile_' + (i+1)*5 + '" '
    + 'class="earnings_bar" percentile="' + (i+1)*5 + '" '
    + 'style="fill:purple;stroke:white;stroke-width:1" '
    + 'points="' + coor2point(x0,y0) + coor2point(x1,y1) + coor2point(x2,y2) + coor2point(x3,y3) + '" />';
}

var paintDown = function paintDown(element) {
  var stages = document.getElementsByClassName("pyramid-level");
  var levels = stages.length;
  var level = element.getAttribute("level");
  var percentile = element.getAttribute("percentile");
  var allBars = document.getElementsByClassName("earnings_bar");
  for (i=0; i<allBars.length; i++) allBars[i].style.fill="purple";
  var expBar = document.getElementById("percentile_"+percentile).style.fill="forestgreen";
  for (i=0; i<levels; i++) {
    if (i<=level) {
      stages[i].setAttribute('state','passed'); stages[i].style.fill="forestgreen"; //stages[i].className="completed"; 
    } 
    else {
      stages[i].setAttribute('state','to-go'); stages[i].style.fill="lightgrey"; //stages[i].className="to-achieve"; 
    }
  }
};
 
console.log('<!DOCTYPE html>'); console.log('<html>'); console.log('<body>');
console.log('<script>\n' + paintDown.toString() + '\n</script>\n');
var div_heading = '<div>\n <svg width="' + width.toString() + '" height="' + height.toString() + '">';
var div_footer = ' </svg>\n</div>';
console.log(div_heading); for (var i=0; i<levels; i++) console.log(trapezius(i)); console.log(div_footer);
console.log(div_heading); for (var i=0; i<20; i++) console.log(bar(i)); console.log(div_footer);
console.log('</body>'); console.log('</html>');
