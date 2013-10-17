// FIXME: sometimes profile arrives first and sometiems fist location, simplyfy!
var PixelIcon = L.Icon.extend({
  options: {
    iconSize:     [36, 36],
    iconAnchor:   [18, 36],
    popupAnchor:  [0, -40]
  }
});

var AvatarOverlay = Backbone.View.extend({

  initialize: function() {
    this.layer = this.options.layer;
    _.bindAll(this, 'move', 'update');

    this.model.on('change:position', this.move);
    this.model.on('change:avatar change:nickname', this.update);
  },

  getAvatarIcon: function() {
    var iconUrl = 'assets/images/avatars/'+ this.model.get('avatar') + '_48.png';
    return new PixelIcon({iconUrl: iconUrl});
  },

  move: function(position) {
    var latLng = { lat: position.coords.latitude, lon: position.coords.longitude };
    if(this.avatar) {
      this.avatar.setLatLng(latLng);
    } else {
      this.avatar = new L.Marker(latLng);
      if(this.initialIcon) {
        this.avatar.setIcon(this.initialIcon);
      } else {
        this.avatar.setIcon(this.getAvatarIcon());
      }
      this.avatar.bindPopup(new L.Popup({ closeButton: false }).setContent('<em>'+this.model.get('nickname')+'</em>'));
      this.avatar.addTo(this.layer);
    }
  },

  update: function(player) {
    if(this.avatar){
      this.avatar.setIcon(this.getAvatarIcon());
      this.avatar.bindPopup(new L.Popup({ closeButton: false }).setContent('<em>'+ player.get('nickname')+'</em>'));
    } else {
      this.initialIcon = this.getAvatarIcon();
    }
  }
});

module.exports = AvatarOverlay;
