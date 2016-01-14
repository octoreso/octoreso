var Mission = function(data) {
  this.data        = data;
  this.min_lat     = 90;
  this.max_lat     = -90;
  this.min_long    = 180;
  this.max_long    = -180;
  this.series_id   = parseInt(data.mission_series_id) || null;
  this.series_name = data.mission_series ? data.mission_series.name : null;
  this.point_data  = [];

  this.points = data.points.map(function(point) {
    this.min_lat = Math.min(this.min_lat, parseFloat(point.lat));
    this.max_lat = Math.max(this.max_lat, parseFloat(point.lat));

    this.min_long = Math.min(this.min_long, parseFloat(point.long));
    this.max_long = Math.max(this.max_long, parseFloat(point.long));

    this.point_data.push({ lat: this.lat, lng: this.long });

    return new Point(point, this);
  }, this);

  this.draw = function() {
    this.points.forEach(function(point) {
      point.draw();
    });
  };

  this.zoomToBounds = function(){
    Map.fitBounds({
      north: this.max_lat,
      east:  this.max_long,
      south: this.min_lat,
      west:  this.min_long,
    });
  };

  this.clear = function(){
    while(this.points.length > 0) {
      var point = this.points.pop();
      point._marker.setMap(null);
      point._marker = null;
    }
  };
};
