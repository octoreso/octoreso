var MissionSeries = function(data)
{
  this.data     = data;
  this.name     = data.name;
  this.min_lat  = data.min_lat;
  this.max_lat  = data.max_lat;
  this.min_long = data.min_long;
  this.max_long = data.min_long;

  this.missions = data.missions.map(function(mission) {
    return new Mission(mission, this);
  });

  this.draw = function() {
    this.missions.forEach(function(mission) {
      mission.draw();
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
    while(this.missions.length > 0) {
      var mission = this.missions.pop();
      mission.clear();
      mission = null;
    }
  };

}
