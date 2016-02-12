var Ajax = {
  idle_time_before_query: 500,
  timeout: {
    map: null,
  },
  mission_series_collection: function(){
    var bounds = MissionMap.getViewportBounds();

    Ajax.enqueue('map', function(){
      $.ajax({
        url: '/api/mission_series.json',
        data: bounds
      }).success(function(data, code) {
        $('#spinner').hide();
        MissionMap.clear();
        MissionMap.mode = MissionMap.modes.MISSION_SERIES_COLLECTION;
        MissionMap.addMissionSeriesCollection(data);
        //MissionMap.zoomToBounds();
        $('#sidebar').html(JST.mission_series_collection(data));
        $('[data-mission-series-id]').each(
          function()
          {
            var id = parseInt($(this).data('mission-series-id'));
            var color_id = (id % IconColors.length) + 1;
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
        $('#spinner').hide();
        MissionMap.clear();
        MissionMap.mode = MissionMap.modes.MISSION_SERIES;
        mission = MissionMap.addMissionSeries(data);
        //mission.zoomToBounds();
        $('#sidebar').html(JST.mission_series(data));
      });
    });
  },
  missions: function(){
    var bounds = MissionMap.getViewportBounds();

    Ajax.enqueue('map', function(){
      $.ajax({
        url: '/api/missions.json',
        data: bounds
      }).success(function(data, code) {
        $('#spinner').hide();
        MissionMap.clear();
        MissionMap.mode = MissionMap.modes.MISSIONS;
        MissionMap.addMissions(data);
        //MissionMap.zoomToBounds();
        $('#sidebar').html(JST.missions(data));
        $('[data-mission-id]').each(
          function()
          {
            var id = parseInt($(this).data('mission-id'));
            var color_id = (id % IconColors.length) + 1;
            $(this).find('.pin').addClass('pin-color-'+color_id);
          }
        )
      });
    });
  },
  mission: function(id){
    Ajax.enqueue('map', function(){
      $.ajax({
        url: "/api/missions/"+id+".json"
      }).success(function(data, code) {
        $('#spinner').hide();
        MissionMap.clear();
        MissionMap.mode = MissionMap.modes.MISSION;
        mission = MissionMap.addMission(data);
        //mission.zoomToBounds();
        $('#sidebar').html(JST.mission(data));
      });
    });
  },
  communities: function(){
    var bounds = MissionMap.getViewportBounds();

    console.log("COMMUNITIES")
    Ajax.enqueue('map', function(){
      $.ajax({
        url: "/api/communities.json" // ,
        // data: bounds TODO: Fix zoom race condition to reenable.
      }).success(function(data, code) {
        $('#spinner').hide();
        MissionMap.clear();
        MissionMap.mode = MissionMap.modes.COMMUNITIES;
        MissionMap.addCommunities(data);
        $('#sidebar').html(JST.communities(data));
        $('[data-community-id]').each(
          function()
          {
            var id = parseInt($(this).data('community-id'));
            var color_id = (id % IconColors.length) + 1;
            $(this).find('.pin').addClass('pin-color-'+color_id);
          }
        )
      });
    });
  },
  community: function(id) {
    // TODO: Fix race condition with zoomrefresh and this.
    // Ajax.enqueue('map', function(){
    //   Ajax.missions();
    // });
  },
  content: function(id){
    MissionMap.mode = MissionMap.modes.CONTENT;
    $('#sidebar').html(JST['content/'+id]({ id: id }));
  },
  initial:function()
  {
    MissionMap.mode = MissionMap.modes.CONTENT;
    $('#sidebar').html(JST['content/1']({ id: 1 }));

    bounds = MissionMap.getViewportBounds();

    // TODO: Prevent Duplication.
    Ajax.enqueue('map', function(){
      $.ajax({
        url: '/api/communities.json',
        data: bounds
      }).success(function(data, code) {
        $('#spinner').hide();
        MissionMap.clear();
        MissionMap.mode = MissionMap.modes.COMMUNITIES;
        MissionMap.addCommunities(data);
        $('[data-community-id]').each(
          function()
          {
            var id = parseInt($(this).data('community-id'));
            var color_id = (id % IconColors.length) + 1;
            $(this).find('.pin').addClass('pin-color-'+color_id);
          }
        )
      });
    });
  },
  enqueue:function(type, func) {
    var timeout = Ajax.timeout[type];

    if(timeout !== null) {
      clearInterval(timeout);
    }
    $('#spinner').show();
    Ajax.timeout[type] = setTimeout(func, Ajax.idle_time_before_query)
  }
};
