// FIXME: sometimes profile arrives first and sometiems fist location, simplyfy!
var PixelIcon = L.Icon.extend({
  options: {
    iconSize:     [48, 48],
    iconAnchor:   [24, 48],
    popupAnchor:  [-3, -76]
  }
});

var AvatarOverlay = Backbone.View.extend({

  initialize: function() {
    this.layer = this.options.layer;
    _.bindAll(this, 'move', 'update');

    this.model.on('location', this.move);
    this.model.on('change', this.update);
  },

  getAvatarIcon: function() {
    var iconUrl = 'assets/images/avatars/'+ this.model.get('avatar') + '.png';
    return new PixelIcon({iconUrl: iconUrl});
  },

  move: function(location) {
    if(this.avatar) {
      this.avatar.setLatLng(location.toJSON());
    } else {
      this.avatar = new L.Marker(location.toJSON());
      if(this.initialIcon) {
        this.avatar.setIcon(this.initialIcon);
      } else {
        this.avatar.setIcon(this.getAvatarIcon());
      }
      this.avatar.addTo(this.layer);
    }
  },

  update: function(user) {
    if(this.avatar){
      this.avatar.setIcon(this.getAvatarIcon());
    } else {
      this.initialIcon = this.getAvatarIcon();
    }
  }
});

module.exports = AvatarOverlay;
