var Mission = function(data, mission_series) {
  this.data        = data;
  this.min_lat     = data.min_lat;
  this.max_lat     = data.max_lat;
  this.min_long    = data.min_long;
  this.max_long    = data.max_long;
  if(mission_series !== undefined)
  {
    this.mission_series = mission_series
  }
  this.series_id   = parseInt(data.mission_series_id) || null;
  this.series_name = data.mission_series ? data.mission_series.name : null;
  this.point_data  = [];
  this._polyline   = null;

  this.points = data.points.map(function(point) {
    this.point_data.push({
      lat: parseFloat(point.lat),
      lng: parseFloat(point.long)
    });

    return new Point(point, this);
  }, this);

  if(data.sequence_type == "sequence_type_sequential")
  {
    var color = '#FFFFFF';

    if(this.series_id !== null)
    {
      color = IconColors[parseFloat(this.series_id) % IconColors.length];
    }

    this._polyline = new google.maps.Polyline({
      path: this.point_data,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 0.5,
      strokeWeight: 2,
      map: Map
    });
  }

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
    if(this._polyline !== undefined && this._polyline !== null)
    {
      this._polyline.setMap(null);
      this._polyline = null;
    }
  };
};
