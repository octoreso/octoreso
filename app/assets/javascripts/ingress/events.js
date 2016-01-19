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
