$(document).ready(function(){
  $('#intel_link_link').change(function() {
    var value = $(this).val();
    value     = Parser.parse(value);
  });

  $.ajax({
    url: '/api/missions.json'
  }).success(function(data, code) {
    data.forEach(function(item) {
      new Mission(item).draw()
    });
  });
});

var Mission = function(data) {
  this.data = data
  this.points = data['points'].map(function(point) {
    return new Point(point)
  });

  this.draw = function() {
    console.log(this.data)
    this.points.forEach(function(point) {
      point.draw();
    });
  }
}

var Point = function(data) {
  this._marker     = null;
  this.lat         = parseFloat(data.lat);
  this.long        = parseFloat(data.long);
  this.portal_name = data.portal_name;

  this.draw = function()
  {
    this._marker = new google.maps.Marker({
      position: { lat: this.lat, lng: this.long },
      title: data.portal_name || 'Unknown Portal',
      animation: google.maps.Animation.DROP,
      map: Map
    });
  };
}


// OLD

var Parser = {
  parse:function(str) {
    // Parses link, splits "_,", returns Graph
    str = str.replace('https://www.ingress.com/intel?', '');

    var params = str.split('&');
    var bounds = new Bounds(); //Single tuple.
    var nodes = [];
    var edges = [];

    params.forEach(function(pair){
      pair = pair.split('=');
      var value = pair[1];

      switch(pair[0]){
        case 'll':
          value = value.split(',');
          bounds.lat  = parseFloat(value[0]);
          bounds.lng = parseFloat(value[1]);
          Map.panTo(bounds);
        break;

        case 'z':
          bounds.z = parseFloat(value);
          Map.setZoom(bounds.z);
        break;

        case 'pls':
          value = value.split(/,|_/g);
          for(var i=0;i<value.length;i=i+4) {
            var a = new Node(parseFloat(value[i  ]), parseFloat(value[i+1]));
            var b = new Node(parseFloat(value[i+2]), parseFloat(value[i+3]));

            nodes.push(a);
            nodes.push(b);
            edges.push(new Edge(a, b));
          }
        break;

        default:
        break;
      }
    });

    var graph = new Graph(bounds, nodes, edges);
    return graph;
    // https://www.ingress.com/intel?ll=...&z=16&pls=...
  }
};

// Single LatLng pair representing a portal
var Node=function(lat, lng)
{
  this.lat = lat;
  this.lng = lng;
  this.name = null;
  this._marker = null;

  this.render = function() {
    this._marker = new google.maps.Marker({
      position: { lat: this.lat, lng: this.lng },
      title: 'Unknown Portal',
      //label:'',
      animation: google.maps.Animation.DROP,
      map: Map
    });
  };
};

// Line connecting two portals
var Edge=function(x, y)
{
  this.x = x; // Node
  this.y = y; // Node
  this._polyline = null;

  this.render = function() {
    this._polyline = new google.maps.Polyline({
      path: [
        { lat: x.lat, lng: x.lng},
        { lat: y.lat, lng: y.lng}
      ],
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: Map
    });
  };

  this.clearRender = function() {

  };
};


var Bounds=function()
{
  this.lat = 0;
  this.lng = 0;
  this.z   = 0;
};

// Assembled collection of Nodes and Edges
var Graph = function(bounds, nodes, edges)
{
  this.bounds = bounds;
  this.nodes  = nodes;
  this.edges  = edges;

  this.render = function(){
    //render, update Map
    for(var i=0;i<this.nodes.length;i++){
      nodes[i].render();
    }

    for(i=0;i<this.edges.length;i++){
      edges[i].render();
    }
  };

  this.clearRender = function() {
    // unlink and nullify all markers
    for(var i=0;i<this.nodes.length;i++){
      nodes[i].clearRender();
    }

    for(i=0;i<this.edges.length;i++){
      edges[i].clearRender();
    }
  };

  this.render();
};

var Map = null;
var MapLoader = function(){
  Map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 1
  });
};
