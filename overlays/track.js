var TrackOverlay = Backbone.View.extend({

  initialize: function() {
    this.layer = this.options.layer;
    _.bindAll(this, '_newPosition');
    this.collection.on('add', this._newPosition);

    this.track = new L.Polyline([], {
      color: this.options.color
    }).addTo(this.layer);

    if(this.collection.length > 0) {
      this.collection.each(function(location){
        this.add(location);
      }, this);
    }
  },

  _newPosition: function(location) {
    var coords = location.toJSON().coords;
    var point = { lat: coords.latitude, lon: coords.longitude };
    var points = this.track.getLatLngs();
    if(points.length === 0){
      this._addPoint(point);
      return;
    }
    var last = points[points.length - 1];
    if(coords.latitude != last.lat || coords.longitude != last.lng){
      this._addPoint(point);
    }
  },

  _addPoint: function(latLng) {
    this.track.addLatLng(latLng);
  }
});

module.exports = TrackOverlay;
