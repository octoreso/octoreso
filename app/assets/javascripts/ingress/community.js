var Community = function(data)
{
  this._marker  = null;
  this.data     = data;

  this.id       = data.id;
  this.name     = data.name;

  this.lat      = parseFloat(data.lat);
  this.min_lat  = parseFloat(data.min_lat);
  this.max_lat  = parseFloat(data.max_lat);
  this.long     = parseFloat(data.long);
  this.min_long = parseFloat(data.min_long);
  this.max_long = parseFloat(data.min_long);

  this.draw = function() {
    var marker_data = {
      position: { lat: this.lat, lng: this.long },
      title: this.name,
      map: Map,
      icon: {
        url: Icons[parseInt(this.id) % Icons.length],
        scaledSize: new google.maps.Size(32, 32)
      }
    };

    this._marker = new google.maps.Marker(marker_data);
    this._marker.set('id', this.id)
    this._marker.set('teleport', this.max_lat + ',' + this.max_long + ',' + this.min_lat + ',' + this.min_long);
    this._marker.addListener('click', function()
    {
      var id       = this.get("id");
      var teleport = this.get("teleport");

      if(teleport.length > 0)
      {
        teleport = teleport.split(',')
        Map.fitBounds({
          north: parseFloat(teleport[0]),
          east:  parseFloat(teleport[1]),
          south: parseFloat(teleport[2]),
          west:  parseFloat(teleport[3])
        });

        Ajax.missions();
      }
    });
  };

  this.zoomToBounds = function(){
    Map.fitBounds({
      north: this.max_lat,
      east:  this.max_long,
      south: this.min_lat,
      west:  this.min_long,
    });
  };

  this.clear = function(){
    this._marker.setMap(null);
    this._marker = null;
  };

}
