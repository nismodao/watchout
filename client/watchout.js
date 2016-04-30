// start slingin' some d3 here.

var svg = d3.select('body').append('svg');

svg.attr('class',"container")
   .attr('width',"1000px")
   .attr('height',"1000px")
   .style('background-color',"steelblue");


var enemyProp = [4,5,6,7,8,9];
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
    //.call(collide) -- causes repeats
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



var count = 0;
function collide () {
  var player = d3.select('.player');
  var r = player.attr('r');
  var x = player.attr('cx');
  var y = player.attr('cy');
  var current
  d3.selectAll('.enemy').each(function(d,i) {
    var enemy = d3.select(this);
    var radiusSum = parseFloat(enemy.attr('r')) + parseInt(r);
    var xDiff = parseFloat(enemy.attr('cx')) - parseInt(x);
    var yDiff = parseFloat(enemy.attr('cy')) - parseInt(y);
    var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) ); 
      if (separation < radiusSum) {
        count++;
        console.log('collision detected with', d, 'seperation is', separation, 'radius is',radiusSum);
        console.log(count);
    }
  });
}

setInterval(collide,700);
























































































































































































































