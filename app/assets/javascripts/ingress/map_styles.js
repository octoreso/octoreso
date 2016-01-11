// via http://googlemaps.github.io/js-samples/styledmaps/wizard/index.html
var MapStyles = {
  ingress: [
    {
      "featureType": "water",
      "stylers": [
        { "color": "#C6D4EC" }
      ]
    },{
      "featureType": "landscape.natural",
      "stylers": [
        { "color": "#191F1F" }
      ]
    },{
      "featureType": "landscape.man_made",
      "stylers": [
        { "color": "#101414" }
      ]
    },{
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        { "visibility": "on" },
        { "saturation": -100 },
        { "lightness": -100 }
      ]
    },{
      "featureType": "administrative",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "poi",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "elementType": "labels",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "elementType": "labels.text.fill",
      "stylers": [
        { "visibility": "on" },
        { "color": "#ffffff" }
      ]
    },{
      "elementType": "labels.text.stroke",
      "stylers": [
        { "color": "#808080" }
      ]
    },{
      "featureType": "road.local",
      "stylers": [
        { "lightness": -50 }
      ]
    }
  ]
};
