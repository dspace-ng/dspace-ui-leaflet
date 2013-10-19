var TrackOverlay = Backbone.View.extend({

  initialize: function() {
    this.layer = this.options.layer;
    _.bindAll(this, '_newPosition'); // 'load'
    this.collection.on('add', this._newPosition);

    this.collection.overlay = this;

    this.line = new L.Polyline([], {
      color: this.options.color
    }).addTo(this.layer);

    //this.collection.on('load:success', this.load);

    // initial loading
    //this.load();

  },

  //load: function(){
    //console.log('TrackOverlay.load()');
    //this.collection.each(function(location){
      //this._newPosition(location);
    //}, this);
  //},

  _newPosition: function(location) {
    var coords = location.toJSON().coords;
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
