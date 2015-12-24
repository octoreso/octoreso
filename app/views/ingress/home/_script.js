$(document).ready(function(){
  $('#intel_link_link').change(function() {
    var value = $(this).val();
    value     = Parser.parse(value);
  });

  $.ajax({
    url: '/api/missions.json'
  }).success(function(data, code) {
    new IngressMap(data);
  });
});

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
  this.series_id   = parseInt(data.mission_series_id)
  this.series_name = data.mission_series ? data.mission_series.name : null

  this.points = data['points'].map(function(point) {
    this.min_lat = Math.min(this.min_lat, parseFloat(point.lat))
    this.max_lat = Math.max(this.max_lat, parseFloat(point.lat))

    this.min_long = Math.min(this.min_long, parseFloat(point.long))
    this.max_long = Math.max(this.max_long, parseFloat(point.long))

    return new Point(point, this)
  }, this);

  this.draw = function() {
    this.points.forEach(function(point) {
      point.draw();
    });
  }
}

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
      animation: google.maps.Animation.DROP,
      //label: String.fromCharCode(65 + this.mission.series_id),
      map: Map
    }

    // marker_data.icon = Icon.portal
    marker_data.icon = 'http://maps.google.com/mapfiles/ms/micons/yellow.png'
    this._marker = new google.maps.Marker(marker_data);

    console.log(String.fromCharCode(65 + this.mission.series_id))
  };
}

var Map = null;
var MapLoader = function(){
  Map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 1
  });
};
