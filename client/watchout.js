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
  d3.selectAll('.enemy').transition().duration(2000)
    .attr('cx', function() { return Math.random() * 1000; })
    .attr('cy', function() { return Math.random() * 1000; })
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


funfu
























































































































































































































