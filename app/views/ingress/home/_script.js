$(document).ready(function(){
  $('#intel_link_link').change(function() {
    var value = $(this).val()
    $('.result').text(Parser.parse(value))
  });
});

var Parser = {
  parse:function(str)
  {
    // Parses link, splits "_,", returns Graph
    str = str.replace('https://www.ingress.com/intel?', '');
    console.log(str);
    return str;
    // https://www.ingress.com/intel?ll=...&z=16&pls=...
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


var Bounds=function()
{
  this.lat  = 0
  this.long = 0
  this.z    = 0
}

// Assembled collection of Nodes and Edges
var Graph = function()
{
  this.bounds = null
  this.nodes  = []
  this.graphs = []
}
