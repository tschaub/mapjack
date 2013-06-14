

/**
 * Hack GitHub's GeoJSON editor to provide a map option.
 */
if (window.location.pathname.match(/^(\/[^\/]+){2}\/edit\/.*\.geojson$/)) {
  // we're in
  $(function() {

    // CSS comes from concatenated file
    $('head').append('<style>' + CSS + '</style>');

    // some buttons
    var anchor = $('<a>').attr('href', '#').addClass('map minibutton')
        .append('Map');
    var others = $('ul.js-blob-edit-actions a');

    // map button
    anchor.click(function() {
      others.removeClass('selected');
      anchor.addClass('selected');
      showMap();
      return false;
    });

    // grab those editor action controls
    var actions = $('ul.actions');

    // make the other buttons turn off the map
    others.click(function() {
      var me = $(this);
      // this is silly, but it looks like gh is toggling all
      window.setTimeout(function() {
        anchor.removeClass('selected');
        others.removeClass('selected');
        me.addClass('selected');
      }, 0);
      hideMap();
    });

    // add the map button into the mix
    $('<li>').append(anchor)
        .insertBefore('ul.js-blob-edit-actions li:first');

    var format = new OpenLayers.Format.GeoJSON({
      externalProjection: 'EPSG:4326',
      internalProjection: 'EPSG:900913'
    });

    var tiles = '//dnv9my2eseobd.cloudfront.net/v3/github.map-xgq2svrz/' +
        '${z}/${x}/${y}.png';

    var styles = new OpenLayers.StyleMap({
      'default': {
        pointRadius: 6,
        fillColor: 'white',
        fillOpacity: 0.1,
        strokeWidth: 2,
        strokeOpacity: 0.7,
        strokeColor: '#006ec8'
      },
      select: {
        pointRadius: 6,
        fillColor: '#fcf8e9',
        fillOpacity: 0.5,
        strokeWidth: 2,
        strokeOpacity: 0.8,
        strokeColor: '#006ec8'
      },
      temporary: {
        pointRadius: 4,
        fillColor: 'white',
        fillOpacity: 0.1,
        strokeWidth: 2,
        strokeOpacity: 0.7,
        strokeColor: '#006ec8'
      }
    });

    var map, vector, control;

    function showMap() {
      var editor = $('#ace-editor').hide();

      // hide the additional editor actions
      $('ul.actions').hide();

      // hide the commit form for now as well
      $('div.js-file-commit-form').hide();

      var viewport = $('<div id="ol-map">').css('height', 400)
          .insertAfter(editor);

      var raster = new OpenLayers.Layer.XYZ(null, tiles,
          {sphericalMercator: true});

      vector = new OpenLayers.Layer.Vector(null, {styleMap: styles});

      map = new OpenLayers.Map({
        div: viewport[0],
        theme: null,
        layers: [raster, vector]
      });

      var code = unsafeWindow.editor.ace.getSession().getValue();
      var features = format.read(code);
      vector.addFeatures(features);
      map.zoomToExtent(vector.getDataExtent());

      control = new OpenLayers.Control.ModifyFeature(vector, {
        vertexRenderIntent: 'temporary'
      });

      map.addControl(control);
      control.activate();

    }

    function updateEditor() {
      var code = format.write(vector.features, true);
      unsafeWindow.editor.setCode(code);
    }

    function hideMap() {
      if (map) {
        control.deactivate();
        updateEditor();
        map.destroy();
        map = null;
        $('#ol-map').remove();
        $('#ace-editor').show();
        $('ul.actions').show();
        $('div.js-file-commit-form').show();
      }
    }

  });
}
