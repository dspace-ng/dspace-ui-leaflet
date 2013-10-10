var StoryOverlay = Backbone.View.extend({
  icon: L.icon({
    iconUrl: 'assets/images/markers/bubble.png',
    iconSize: [32, 32],
    iconAnchor: [9, 29]
  }),

  initialize: function() {
    this.layer = this.options.layer;
    _.bindAll(this, 'add');
    this.collection.on('add', this.add);

    if(this.collection.length > 0) {
      this.collection.each(function(location){
        this.add(location);
      }, this);
    }
  },

  add: function(capture) {
    var location = capture.markerLocation();
    if(location) {
      var marker = new L.Marker([location.lat, location.lng], {
        icon: this.icon
      });
      marker.bindPopup(new L.Popup().setContent('<em>'+capture.attributes.text+'</em>'));
      this.layer.addLayer(marker);
    }
  }
});

module.exports = StoryOverlay;
