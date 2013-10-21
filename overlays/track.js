var TrackOverlay = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, 'load', '_newPosition');

    this.layer = this.options.layer;
    this.collection.overlay = this;

    this.line = new L.Polyline([], {
      color: this.options.color
    }).addTo(this.layer);

    // initial loading
    this.collection.on('loaded', this.load);
    this.collection.on('add', this._newPosition);

  },

  //FIXME only load if switched on in roster!
  load: function(){
    console.log('TrackOverlay.load()');
    this.collection.each(function(position){
      this._newPosition(position);
    }, this);
  },

  _newPosition: function(position) {
    var coords = position.toJSON().coords;
    var point = { lat: coords.latitude, lon: coords.longitude };
    var points = this.line.getLatLngs();
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
    this.line.addLatLng(latLng);
  }
});

module.exports = TrackOverlay;
