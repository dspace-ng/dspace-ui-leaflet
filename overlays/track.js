var TrackOverlay = Backbone.View.extend({

  initialize: function() {
    this.layer = this.options.layer;
    _.bindAll(this, 'add');
    this.collection.on('add', this.add);

    this.track = new L.Polyline([], {
      color: this.options.color
    }).addTo(this.layer);

    if(this.collection.length > 0) {
      this.collection.each(function(location){
        this.add(location);
      }, this);
    }
  },

  add: function(location) {
    this.track.addLatLng(location.toJSON());
  }
});

module.exports = TrackOverlay;
