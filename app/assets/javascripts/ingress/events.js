$(document).on('click', 'a[data-ajax="missions"]', function(x){
  Ajax.missions();
});

$(document).on('click', 'a[data-ajax="mission-series-collection"]', function(x){
  Ajax.mission_series_collection();
});

$(document).on('click', 'a[data-ajax="mission"]', function(e){
  var id = $(e.target).data('mission-id');
  Ajax.mission(id);
});

$(document).on('click', 'a[data-ajax="mission-series"]', function(e){
  var id = $(e.target).data('mission-series-id');
  Ajax.mission_series(id);
});


$(document).on('click', 'a[data-ajax="content"]', function(e){
  var id = $(e.target).data('content-id');
  Ajax.content(id);
});

$(document).on('click', 'a[data-ajax="communities"]', function(x){
  Ajax.communities();
});

$(document).on('click', 'a[data-ajax="community"]', function(e){
  var id = $(e.target).data('community-id');
  var teleport = $(e.target).data('teleport');
  if(teleport && teleport.length > 0)
  {
    teleport = teleport.split(',')

    Map.fitBounds({
      north: parseFloat(teleport[0]),
      east:  parseFloat(teleport[1]),
      south: parseFloat(teleport[2]),
      west:  parseFloat(teleport[3])
    });
  }

  Ajax.missions();
});

$(document).on('mousedown', 'span.glyphicon-check[data-check-mission-id]', function(e){
  var id = $(e.target).data('check-mission-id')

  $(e.target).removeClass('glyphicon-check').addClass('glyphicon-refresh')

  Ajax.uncheck_mission(id)
});

$(document).on('mousedown', 'span.glyphicon-unchecked[data-check-mission-id]', function(e){
  var id = $(e.target).data('check-mission-id')

  $(e.target).removeClass('glyphicon-unchecked').addClass('glyphicon-refresh')

  Ajax.check_mission(id)
});
