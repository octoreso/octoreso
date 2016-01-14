var MissionMap = {
  min_lat: 90,
  max_lat: -90,
  min_long: 180,
  max_long: -180,
  missions: [],
  modes: {
    MISSIONS: 1,
    MISSION: 2
  },
  mode: 1,
  init: function(data){

    google.maps.event.addListenerOnce(Map, 'tilesloaded', function(){
      /*TODO: Replace with real implementation!*/
      var staticBounds = {
          north: 54.98136579901662,
          east: -1.5649311425170254,
          south: 54.96508427502581,
          west: -1.6473286034545254
      };

      Map.fitBounds(staticBounds);

      Map.addListener('idle', function() {
        MissionMap.refresh();
      });

      Ajax.missions();
    });
  },
  addMissions:function(data){
    data.forEach(function(item) {
      this.addMission(item);
    }, this);
  },
  zoomToBounds:function(){
    Map.fitBounds({
      north: this.max_lat,
      east:  this.max_long,
      south: this.min_lat,
      west:  this.min_long,
    });
  },
  getViewportBounds:function(){
    var bounds = Map.getBounds();
    if(bounds !== undefined)
    {
      var ne = bounds.getNorthEast();
      var sw = bounds.getSouthWest();

      return {
        north: ne.lat(),
        east: ne.lng(),
        south: sw.lat(),
        west: sw.lng()
      };
    } else {
      return bounds;
    }

  },
  addMission:function(item){
    mission = new Mission(item);
    this.min_lat = Math.min(this.min_lat, mission.min_lat);
    this.max_lat = Math.max(this.max_lat, mission.max_lat);

    this.min_long = Math.min(this.min_long, mission.min_long);
    this.max_long = Math.max(this.max_long, mission.max_long);

    this.missions.push(mission);
    mission.draw();

    return mission;
  },
  refresh:function()
  {
    if(this.mode == this.modes.MISSIONS) {
      Ajax.missions();
    }
  },
  clear:function(){
    this.min_lat = 90;
    this.max_lat = -90;
    this.min_long = 180;
    this.max_long = -180;

    while(this.missions.length > 0) {
      var mission = this.missions.pop();
      mission.clear();
    }
  }

};
