$(document).on('click', 'a[data-ajax="missions"]', function(x){
  Ajax.missions();
});

$(document).on('click', 'a[data-ajax="mission"]', function(e){
  var id = $(e.target).data('mission-id');
  Ajax.mission(id);
});
