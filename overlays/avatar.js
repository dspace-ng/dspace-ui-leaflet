// FIXME: sometimes profile arrives first and sometiems fist location, simplyfy!
// set default icon if profile havent arrived yet?

var AvatarOverlay = Backbone.View.extend({

  initialize: function() {
    this.layer = this.options.layer;
    _.bindAll(this, 'move', 'update');

    this.model.overlay = this;

    this.model.on('change:position', this.move);
    this.model.on('change:avatar change:nickname', this.update);

    this.avatar = new L.Marker();
    this.avatar.bindPopup(new L.Popup({ closeButton: false }).setContent('<em>'+this.model.get('nickname')+'</em>'));
    // FIXME: sometimes profile arrives first and sometiems fist location, simplyfy!
    // set default icon if profile havent arrived yet?
  },

  getIcon: function() {
    return new L.Icon({
      iconUrl: 'assets/images/avatars/'+ this.model.get('avatar') + '_48.png',
      iconSize:     [36, 36],
      iconAnchor:   [18, 36],
      popupAnchor:  [0, -40]
    });
  },

  move: function(position) {
    if(position.toJSON) position = position.toJSON();
    var latLng = { lat: position.coords.latitude, lon: position.coords.longitude }; //FIXME use Position.getLatlng()
    this.avatar.setLatLng(latLng);
    if(!this.layer.hasLayer(this.avatar)){
      this.avatar.setIcon(this.getIcon());
      this.avatar.addTo(this.layer);
    }
  },

  update: function(player) {
    this.avatar.setIcon(this.getIcon());
    this.avatar.bindPopup(new L.Popup({ closeButton: false }).setContent('<em>'+ player.get('nickname')+'</em>'));
  }
});

module.exports = AvatarOverlay;
