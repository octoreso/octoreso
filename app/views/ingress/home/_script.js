var Map = null;
var MapLoader = function(){
  Map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 1,
    styles: MapStyles.ingress
  });

  $.ajax({
    url: '/api/missions.json'
  }).success(function(data, code) {
    new IngressMap(data);
  });
};

// via http://googlemaps.github.io/js-samples/styledmaps/wizard/index.html
var MapStyles = {
  ingress: [
    {
      "featureType": "water",
      "stylers": [
        { "color": "#C6D4EC" }
      ]
    },{
      "featureType": "landscape.natural",
      "stylers": [
        { "color": "#191F1F" }
      ]
    },{
      "featureType": "landscape.man_made",
      "stylers": [
        { "color": "#101414" }
      ]
    },{
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        { "visibility": "on" },
        { "saturation": -100 },
        { "lightness": -100 }
      ]
    },{
      "featureType": "administrative",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "poi",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "elementType": "labels",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "elementType": "labels.text.fill",
      "stylers": [
        { "visibility": "on" },
        { "color": "#ffffff" }
      ]
    },{
      "elementType": "labels.text.stroke",
      "stylers": [
        { "color": "#808080" }
      ]
    },{
      "featureType": "road.local",
      "stylers": [
        { "lightness": -50 }
      ]
    }
  ]
}

var IngressMap = function(data)
{
  this.min_lat = 90
  this.max_lat = -90
  this.min_long = 180
  this.max_long = -180

  data.forEach(function(item) {
    var mission = new Mission(item)
    this.min_lat = Math.min(this.min_lat, mission.min_lat)
    this.max_lat = Math.max(this.max_lat, mission.max_lat)

    this.min_long = Math.min(this.min_long, mission.min_long)
    this.max_long = Math.max(this.max_long, mission.max_long)

    mission.draw();
  }, this);

  var bounds = {
    north: this.max_lat,
    east:  this.max_long,
    south: this.min_lat,
    west:  this.min_long,
  }

  Map.fitBounds(bounds);
}

var Mission = function(data) {
  this.data        = data
  this.min_lat     = 90
  this.max_lat     = -90
  this.min_long    = 180
  this.max_long    = -180
  this.series_id   = parseInt(data.mission_series_id) || null
  this.series_name = data.mission_series ? data.mission_series.name : null
  this.point_data  = []

  this.points     = data['points'].map(function(point) {
    this.min_lat = Math.min(this.min_lat, parseFloat(point.lat))
    this.max_lat = Math.max(this.max_lat, parseFloat(point.lat))

    this.min_long = Math.min(this.min_long, parseFloat(point.long))
    this.max_long = Math.max(this.max_long, parseFloat(point.long))

    this.point_data.push({ lat: this.lat, lng: this.long })

    return new Point(point, this)
  }, this);

  this.draw = function() {
    this.points.forEach(function(point) {
      point.draw();
    });
  }
}

// other than red, which is reserved for non-series
var Icons = [
  'http://maps.google.com/mapfiles/ms/micons/green.png',
  'http://maps.google.com/mapfiles/ms/micons/yellow.png',
  'http://maps.google.com/mapfiles/ms/micons/orange.png',
  'http://maps.google.com/mapfiles/ms/micons/red.png',
  'http://maps.google.com/mapfiles/ms/micons/purple.png',
  'http://maps.google.com/mapfiles/ms/micons/blue.png',
  'http://maps.google.com/mapfiles/ms/micons/lightblue.png'
]

var Point = function(data, mission) {
  this._marker             = null;
  this.mission             = mission
  this.lat                 = parseFloat(data.lat);
  this.long                = parseFloat(data.long);
  this.portal_name         = data.portal_name;

  this.draw = function()
  {
    var marker_data = {
      position: { lat: this.lat, lng: this.long },
      title: this.mission_series_name || data.portal_name || 'Unknown Portal',
      map: Map
    }

    if(this.mission.series_id == null)
    {
      marker_data.icon = 'http://maps.google.com/mapfiles/ms/micons/pink.png'
    } else {
      marker_data.icon = Icons[parseFloat(this.mission.series_id) % Icons.length]
    }

    this._marker = new google.maps.Marker(marker_data);
  };
}
