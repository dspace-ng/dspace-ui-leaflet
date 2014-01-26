var Map = Backbone.View.extend({
  initialize: function(){
    this.config = this.options.config;
    this.frame = new L.Map(this.config.elementId, {
      center: this.config.center,
      zoom: this.config.zoom,
      attributionControl: false,
      zoomControl: false
    });

    var basemap = new L.TileLayer(this.config.basemap.template, {
      maxZoom : this.config.basemap.maxZoom
    }).addTo(this.frame);

    var zoomControl = new L.Control.Zoom({ position: 'topright' }).addTo(this.frame);

    this.frame.poisControl = new L.Control.Layers({ "OpenStreetMap": basemap }, undefined, { collapsed: true, position: 'topleft' }).addTo(this.frame);

  }
});

module.exports = Map;
