var Point = function(data, mission, index) {
  this._marker             = null;
  this.mission             = mission;
  this.lat                 = parseFloat(data.point.lat);
  this.long                = parseFloat(data.point.long);
  this.portal_name         = data.point.portal_name;
  this.action_type         = data.action_type;

  this.draw = function()
  {
    var marker_data = {
      position: { lat: this.lat, lng: this.long },
      title: "Portal",
      map: Map
    };

    if(MissionMap.mode == MissionMap.modes.MISSION || MissionMap.mode == MissionMap.modes.MISSION_SERIES)
    {
      var size = 22;
      if (index == 0) {
        size = 32;
      }

      marker_data.icon = {
        url: ActionIcons[this.action_type],
        scaledSize: new google.maps.Size(size, size)
      }
      marker_data.title = I18n.t("ingress/mission_point.action_type." + this.action_type);
    } else {
      if(this.mission.series_id === null) {
      marker_data.icon = DefaultIcon;
      } else {
      marker_data.icon = Icons[parseFloat(this.mission.series_id) % Icons.length];
      }
    }

    this._marker = new google.maps.Marker(marker_data);
  };
};
