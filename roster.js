//var StoryOverlay = require('dspace-ui-leaflet/overlays/story');
var TrackOverlay = require('./overlays/track');
var AvatarOverlay = require('./overlays/avatar');

// FIXME checkout view managers!
// evaluate: https://github.com/vogdb/SelectLayersControl
// and: http://elesdoar.github.io/leaflet-control-orderlayers/
// and: https://github.com/ismyrnow/Leaflet.groupedlayercontrol
// and: https://github.com/yohanboniface/Leaflet.TileLegend
Roster = function(party, map){

  this.party = party;

  this.playersControl = new L.Control.Layers(undefined, undefined, { collapsed: true, position: 'topleft' }).addTo(map);

  this.layerGroups = {};

  _.each(this.party.teams, function(team){
    var name = team.name;
    if(name === undefined) name = 'unteam';

    this.layerGroups[name] = {};

    var avatars = new L.LayerGroup();
    avatars.addTo(map);
    this.layerGroups[name].avatar = avatars;
    this.playersControl.addOverlay(avatars, name + '-avatars');

    var tracks = new L.LayerGroup();
    tracks.addTo(map);
    this.layerGroups[name].track = tracks;
    this.playersControl.addOverlay(tracks, name + '-tracks');
  }.bind(this));

  this.createPlayerOverlays = function(player, layerGroups){
    var avatarOverlay = new AvatarOverlay({
      model: player,
      layer: layerGroups.avatar
    });

    var trackOverlay = new TrackOverlay({
      collection: player.track,
      color: player.get('color'),
      layer: layerGroups.track
    });
  };

  //FIXME party can load before reating roster?
  //FIXME change so players subscribe directly to updates of their profiles
  //similar as tracks do now
  this.party.on('add', function(player){
    var teamName = player.get('team');
    if(teamName === undefined) teamName = 'unteam';

    this.createPlayerOverlays(player, this.layerGroups[teamName]);

  }.bind(this));
};

module.exports = Roster;
