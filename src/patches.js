(function(global) {

  function getConstructor(name) {
    var parts = name.split('.');
    var Type = OpenLayers;
    for (var i = 1, ii = parts.length; i < ii; ++i) {
      Type = Type[parts[i]];
    }
    return Type;
  }


  /**
   * Patch the clone method to avoid Content Security Policy violations with use
   * of eval.
   * @return {OpenLayers.Geometry.Collection} A clone.
   */
  OpenLayers.Geometry.Collection.prototype.clone = function() {
    var Type = getConstructor(this.CLASS_NAME);
    var geometry = new Type();
    for (var i = 0, len = this.components.length; i < len; i++) {
      geometry.addComponent(this.components[i].clone());
    }

    // catch any randomly tagged-on properties
    OpenLayers.Util.applyDefaults(geometry, this);

    return geometry;
  };

}(this));
