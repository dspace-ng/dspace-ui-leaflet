var PlacesOverlay = Backbone.View.extend({

  getIcon: function(){
    var size;
    switch(this.map.getZoom()){
      case 19:
        size = 28;
        break;
      case 18:
        size = 26;
        break;
      case 17:
        size = 24;
        break;
      case 16:
        size = 22;
        break;
      case 15:
        size = 18;
        break;
      case 14:
        size = 16;
        break;
      case 13:
        size = 14;
        break;
      default:
        size = 8;
    }
    if(this.config.icon.scale){
      size = size * this.config.icon.scale;
    }
    return L.icon({
      iconUrl: this.config.icon.url,
      iconSize: [size, size],
      iconAnchor: [size/2, 0]
    });
  },

  initialize: function() {
    _.bindAll(this, 'add', 'getIcon', 'scaleMarkers');
    //this.collection.on('add', this.add);

    _.extend(this, this.options);

    if(!this.layer) {
      this.layer = new L.LayerGroup();
    }

    this.collection.overlay = this;

    this.collection.on('reset', function(){
      this.collection.each(function(place){
        this.add(place);
      }, this);
    }.bind(this));

    this.markers = [];
    this.map.on('zoomend', this.scaleMarkers);
  },

  scaleMarkers: function(){
    console.log(this.map.getZoom());
    _.each(this.markers, function(marker){
      marker.setIcon(this.getIcon());
    }.bind(this));
  },

  add: function(place) {
    var latLng = { lat: place.get('geometry').coordinates[1], lng: place.get('geometry').coordinates[0] };
    var marker = new L.Marker([latLng.lat, latLng.lng], {
      icon: this.getIcon()
    });
    marker.bindPopup(new L.Popup({ closeButton: false }).setContent('<em><a target="_blank" href="'+place.get('properties').link +'">'+place.get('properties').name+'</a></em>'));
    this.layer.addLayer(marker);
    this.markers.push(marker);
  }
});

module.exports = PlacesOverlay;
