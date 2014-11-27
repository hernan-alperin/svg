
var width=300;
var height = Math.sqrt(300*300-150*150); // equilateral triangle hypotnuse == width
var levels = 4;

function coor2point(x,y) {return ' ' + x.toString() + ',' + y.toString(); }

console.log('<!DOCTYPE html>');
console.log('<html>');
console.log('<body>');
console.log('<script>function paintDown(elem) {elem.style.fill="yellow";}</script>');
console.log('<svg '
  + 'width="' + width.toString() + '" '
  + 'height="' + width.toString() + '">');
for (var i=0; i<levels; i++) {
  var Dw = width/2; 
  var x0 = i/levels*Dw, x1 = (i+1)/levels*Dw, x2 = width-x1, x3 = width - x0;
  var y0 = y3 = (levels-i)/levels*height, y1 = y2 = (levels-i-1)/levels*height;
  console.log('  <polygon id="level_' +i+ '" points="'
    + coor2point(x0,y0)
    + coor2point(x1,y1)
    + coor2point(x2,y2)
    + coor2point(x3,y3)
    + '" style="fill:lime;stroke:purple;stroke-width:1" '
    + 'onClick="paintDown(this)" '
    + '/>');
}
console.log('</svg>');
console.log('</body>');
console.log('</html>');
