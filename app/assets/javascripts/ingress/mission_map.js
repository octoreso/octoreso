var MissionMap = function(data)
{
  'use strict';

  this.min_lat = 90;
  this.max_lat = -90;
  this.min_long = 180;
  this.max_long = -180;

  data.forEach(function(item) {
    var mission = new Mission(item);
    this.min_lat = Math.min(this.min_lat, mission.min_lat);
    this.max_lat = Math.max(this.max_lat, mission.max_lat);

    this.min_long = Math.min(this.min_long, mission.min_long);
    this.max_long = Math.max(this.max_long, mission.max_long);

    mission.draw();
  }, this);

  var bounds = {
    north: this.max_lat,
    east:  this.max_long,
    south: this.min_lat,
    west:  this.min_long,
  };

  Map.fitBounds(bounds);
};
