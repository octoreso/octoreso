$(document).ready(function(){
  $('#intel_link_link').change(function() {
    var value = $(this).val()
    $('.result').text(value)
  });
});

var Parser = {
  parse:function(string)
  {
    // Parses link, splits "_,", returns Graph
  }

}

// Single LatLong pair representing a portal
var Node=function()
{
  this.x = null
  this.y = null
  this.name = null
}

// Line connecting two portals
var Edge=function()
{
  this.from = null
  this.to   = null
}

// Assembled collection of Nodes and Edges
var Graph = function()
{
  this.nodes  = []
  this.graphs = []
}
