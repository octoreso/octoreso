var Map = null;
var MapLoader = function(){
  'use strict';

  Map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 1,
    styles: MapStyles.ingress,
    mapTypeControl: false,
    streetViewControl: false
  });

  Map.addListener('rightclick', function() {
    $('#main-pane').toggleClass('lightbox-show');
  });

  $.ajax({
    url: '/api/missions.json'
  }).success(function(data, code) {
    new MissionMap(data);
    $('.lightbox-content').html(JST.missions(data))
  });
};
