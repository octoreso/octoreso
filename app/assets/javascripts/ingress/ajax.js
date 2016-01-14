var Ajax = {
  idle_time_before_query: 500,
  timeout: {
    map: null,
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
        $('.sidebar-content').html(JST.missions(data));
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
        $('.sidebar-content').html(JST.mission(data));
      });
    });
  },
  enqueue:function(type, func) {
    var timeout = Ajax.timeout[type];

    if(timeout !== null) { clearInterval(timeout); }
    Ajax.timeout[type] = setTimeout(func, Ajax.idle_time_before_query)
  }
};
