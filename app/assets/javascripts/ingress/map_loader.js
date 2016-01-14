var Map = null;
var MapLoader = function(){
  Map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 1,
    styles: MapStyles.ingress,
    mapTypeControl: false,
    streetViewControl: false
  });

  MissionMap.init();
};
