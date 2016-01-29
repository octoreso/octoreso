var Ajax = {
  idle_time_before_query: 500,
  timeout: {
    map: null,
  },
  mission_series_collection: function(){
    bounds = MissionMap.getViewportBounds();

    Ajax.enqueue('map', function(){
      $.ajax({
        url: '/api/mission_series.json',
        data: bounds
      }).success(function(data, code) {
        MissionMap.clear();
        MissionMap.mode = MissionMap.modes.MISSION_SERIES_COLLECTION;
        MissionMap.addMissionSeriesCollection(data);
        //MissionMap.zoomToBounds();
        $('#sidebar').html(JST.mission_series_collection(data));
        $('[data-mission-series-id]').each(
          function()
          {
            var id = parseInt($(this).data('mission-series-id'));
            var color_id = (id % 7) + 1;
            $(this).find('.pin').addClass('pin-color-'+color_id);
          }
        )
      });
    });
  },
  mission_series: function(id){
    Ajax.enqueue('map', function(){
      $.ajax({
        url: "/api/mission_series/"+id+".json"
      }).success(function(data, code) {
        MissionMap.clear();
        MissionMap.mode = MissionMap.modes.MISSION_SERIES;
        mission = MissionMap.addMissionSeries(data);
        //mission.zoomToBounds();
        $('#sidebar').html(JST.mission_series(data));
      });
    });
  },
  missions: function(){
    bounds = MissionMap.getViewportBounds();

    Ajax.enqueue('map', function(){
      $.ajax({
        url: '/api/missions.json',
        data: bounds
      }).success(function(data, code) {
        MissionMap.clear();
        MissionMap.mode = MissionMap.modes.MISSIONS;
        MissionMap.addMissions(data);
        //MissionMap.zoomToBounds();
        $('#sidebar').html(JST.missions(data));
      });
    });
  },
  mission: function(id){
    Ajax.enqueue('map', function(){
      $.ajax({
        url: "/api/missions/"+id+".json"
      }).success(function(data, code) {
        MissionMap.clear();
        MissionMap.mode = MissionMap.modes.MISSION;
        mission = MissionMap.addMission(data);
        //mission.zoomToBounds();
        $('#sidebar').html(JST.mission(data));
      });
    });
  },
  enqueue:function(type, func) {
    var timeout = Ajax.timeout[type];

    if(timeout !== null) { clearInterval(timeout); }
    Ajax.timeout[type] = setTimeout(func, Ajax.idle_time_before_query)
  }
};
