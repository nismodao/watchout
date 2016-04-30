// start slingin' some d3 here.

var svg = d3.select('body').append('svg');

svg.attr('class',"container")
   .attr('width',"1000px")
   .attr('height',"1000px")
   .style('background-color',"steelblue");


var enemyProp = [4, 8, 15, 22, 55];
// var enemy = d3.select('svg').append('circle')
//    .attr('cx', Math.random() * 700)
//    .attr('cy', Math.random() * 700)
//    .attr('r', 50)
//    .style('fill', 'grey');


var createEnemies = d3.select('svg').selectAll('circle').data(enemyProp)
   .enter().append('circle')
   .attr('class', 'enemy')
   .attr('cx', function() { return Math.random() * 700})
   .attr('cy', function() { return Math.random() * 700})
   .attr('r', 50)
   .style('fill', 'grey')
   .transition().each('end', function(){ makeItMove(); }); 


function makeItMove() {
  d3.selectAll('.enemy')
  .transition().duration(2000)
    .attr('cx', function() { return Math.random() * 1000; })
    .attr('cy', function() { return Math.random() * 1000; })
    .call(collide)
    .each('end', function() { makeItMove(); });
}


function onDragDrop(dragHandler){
  var drag = d3.behavior.drag();

  drag.on('drag', dragHandler);
  return drag;
}


var player = d3.select('body').select('svg')
  .data([{x: 500, y: 500}]);


player.append('circle')
   .attr('class', 'player')
   .attr('r', 50)
   .attr('cx', function(d) {return d.x; })
   .attr('cy', function(d) {return d.y; })
   .style('fill', 'white')
   .call(onDragDrop(dragmove));
   

function dragmove(d){
  d3.select(this)
  .attr('cx', d.x = d3.event.x)
  .attr('cy', d.y = d3.event.y);
}


// function Collision (node1,node2) {


//   this.x1 = x1;
//   this.y1 = y1;
//   this.x2 = x2;
//   this.y2 = y2;
//   this.radius1 = radius1;
//   this.radius2 = radius2;
// }

// Collision.prototype.collision = function (node1,node2) {
// if (Math.sqrt( (this.x2-this.x1)) * (this.x2-this.x1) + (this.y2-this.y1) * (this.y2-this.y1) < (this.radius1 + this.radius2)) {
//   return true;
//   //collison detected do something;
// }

// }
// function collide() {
//   node = this.node();
//   nodeBox = node.getBBox();
//   nodeLeft = nodeBox.x;
//   nodeRight = nodeBox.x + nodeBox.width;
//   nodeTop = nodeBox.y;
//   nodeBottom = nodeBox.y + nodeBox.height;

//   d3.selectAll('.enemy')
//     .style('fill', function(){
//       if(this !== node) {
//         otherBox = this.getBBox();
//         otherLeft = otherBox.x;
//         otherRight = otherBox.x + otherBox.width;
//         otherTop = otherBox.y;
//         otherBottom = otherBox.y + otherBox.height;

//         collideHoriz = nodeLeft < otherRight && nodeRight > otherLeft;
//         collideVert = nodeTop < otherBottom && nodeBottom > otherTop;

//         if(collideHoriz && collideVert) {
//           count++;
//           console.log("red");
//           return 'red';
//         } else {
//           return 'blue';
//         }
//       } else {
//         return "blue";
//       }
//     });
// }
var collide = function (enemy, collidedCallback) {
  var radiusSum = parseFloat(enemy.attr('r')) + player.r;
  var xDiff = parseFloat(enemy.attr('cx')) - player.x;
  var yDiff = parseFloat(enemy.attr('cy')) - player.y;

  var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) );
  if (separation < radiusSum) {
    console.log("collison detect hopefully");
  collidedCallback(player, enemy); 
  }
}

d3.selectAll('.enemy').each(function(d,i) {
  console.log('d is', d, "i is", i);
 //collide(value);

});
























































































































































































































