var Point = function(data, mission) {
  this._marker             = null;
  this.mission             = mission;
  this.lat                 = parseFloat(data.lat);
  this.long                = parseFloat(data.long);
  this.portal_name         = data.portal_name;
  this.action_type         = data.action_type;

  this.draw = function()
  {
    var marker_data = {
      position: { lat: this.lat, lng: this.long },
      title: this.mission_series_name || data.portal_name || 'Unknown Portal',
      map: Map
    };

    if(this.mission.series_id === null)
    {
      marker_data.icon = DefaultIcon;
    } else {
      marker_data.icon = Icons[parseFloat(this.mission.series_id) % Icons.length];
    }

    this._marker = new google.maps.Marker(marker_data);
  };
};
