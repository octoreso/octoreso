var MissionMap = {
  min_lat: 90,
  max_lat: -90,
  min_long: 180,
  max_long: -180,
  missions: [],
  mission_series_collection: [],
  communities: [],
  modes: {
    MISSIONS: 1,
    MISSION: 2,
    MISSION_SERIES_COLLECTION: 3,
    MISSION_SERIES: 4,
    CONTENT: 5,
    COMMUNITIES: 6,
    //COMMUNITY: 7
  },
  mode: 5,
  init: function(data){

    google.maps.event.addListenerOnce(Map, 'tilesloaded', function(){
      /*TODO: Replace with real implementation!*/
      var staticBounds = {
          north: 70,
          east: 60,
          south: 40,
          west: -60
      };

      Map.fitBounds(staticBounds);

      Map.addListener('idle', function() {
        MissionMap.refresh();
      });

      Ajax.initial();
    });
  },
  addMissions:function(data){
    data.forEach(function(item) {
      this.addMission(item);
    }, this);
  },
  addCommunities:function(data){
    data.forEach(function(item) {
      this.addCommunity(item);
    }, this);
  },
  addMissionSeriesCollection:function(data){
    data.forEach(function(item) {
      this.addMissionSeries(item);
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
    var mission = new Mission(item);

    this.min_lat = Math.min(this.min_lat, mission.min_lat);
    this.max_lat = Math.max(this.max_lat, mission.max_lat);

    this.min_long = Math.min(this.min_long, mission.min_long);
    this.max_long = Math.max(this.max_long, mission.max_long);

    this.missions.push(mission);
    mission.draw();

    return mission;
  },
  addMissionSeries:function(item){
    var mission_series = new MissionSeries(item);
    this.min_lat = Math.min(this.min_lat, mission_series.min_lat);
    this.max_lat = Math.max(this.max_lat, mission_series.max_lat);

    this.min_long = Math.min(this.min_long, mission_series.min_long);
    this.max_long = Math.max(this.max_long, mission_series.max_long);

    this.mission_series_collection.push(mission_series);
    mission_series.draw();

    return mission_series;
  },
  addCommunity:function(item){
    var community = new Community(item);
    this.min_lat = Math.min(this.min_lat, community.min_lat);
    this.max_lat = Math.max(this.max_lat, community.max_lat);

    this.min_long = Math.min(this.min_long, community.min_long);
    this.max_long = Math.max(this.max_long, community.max_long);

    this.communities.push(community);
    community.draw();

    return community;
  },
  refresh:function()
  {

    if(this.mode == this.modes.COMMUNITIES) {
      //  // Fix zoom race condition!
    }
    if(this.mode == this.modes.MISSIONS) {
      // if(Map.getZoom()<=10)
      // {
      //   Ajax.communities();
      // } else {
        Ajax.missions();
      // }
    }
    if(this.mode == this.modes.MISSION_SERIES_COLLECTION) {
      // if(Map.getZoom()<=10)
      // {
      //   Ajax.communities();
      // } else {
        Ajax.mission_series_collection();
      // }
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

    while(this.communities.length > 0) {
      var community = this.communities.pop();
      community.clear();
    }

    while(this.mission_series_collection.length > 0) {
      var mission_series = this.mission_series_collection.pop();
      mission_series.clear();
    }
  }

};
