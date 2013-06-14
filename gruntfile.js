var path = require('path');
var fs = require('fs');

var markdown = require('markdown').markdown;

var project = require('./package.json');


/**
 * Grunt config.
 * @param  {Object} grunt Grunt itself.
 */
module.exports = function(grunt) {

  var build = path.join('.grunt', 'mapjack');

  grunt.initConfig({
    copy: {
      dist: {
        files: [{
          src: 'action.gif',
          dest: path.join(build, 'dist', 'action.gif')
        }]
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      index: {
        src: 'src/index.js',
        dest: path.join(build, 'index.js')
      },
      openlayers: {
        src: [
          'components/openlayers/lib/OpenLayers/SingleFile.js',
          'components/openlayers/lib/OpenLayers/BaseTypes/Class.js',
          'components/openlayers/lib/OpenLayers/BaseTypes.js',
          'components/openlayers/lib/OpenLayers/BaseTypes/Bounds.js',
          'components/openlayers/lib/OpenLayers/BaseTypes/Element.js',
          'components/openlayers/lib/OpenLayers/BaseTypes/LonLat.js',
          'components/openlayers/lib/OpenLayers/BaseTypes/Pixel.js',
          'components/openlayers/lib/OpenLayers/BaseTypes/Size.js',
          'components/openlayers/lib/OpenLayers/Console.js',
          'components/openlayers/lib/OpenLayers/Lang.js',
          'components/openlayers/lib/OpenLayers/Util.js',
          'components/openlayers/lib/OpenLayers/Feature.js',
          'components/openlayers/lib/OpenLayers/Feature/Vector.js',
          'components/openlayers/lib/OpenLayers/Style.js',
          'components/openlayers/lib/OpenLayers/Util/vendorPrefix.js',
          'components/openlayers/lib/OpenLayers/Animation.js',
          'components/openlayers/lib/OpenLayers/Tween.js',
          'components/openlayers/lib/OpenLayers/Geometry.js',
          'components/openlayers/lib/OpenLayers/Geometry/Collection.js',
          'components/openlayers/lib/OpenLayers/Geometry/Point.js',
          'components/openlayers/lib/OpenLayers/Geometry/MultiPoint.js',
          'components/openlayers/lib/OpenLayers/Geometry/Curve.js',
          'components/openlayers/lib/OpenLayers/Geometry/LineString.js',
          'components/openlayers/lib/OpenLayers/Geometry/LinearRing.js',
          'components/openlayers/lib/OpenLayers/Geometry/Polygon.js',
          'components/openlayers/lib/OpenLayers/Events.js',
          'components/openlayers/lib/OpenLayers/Events/buttonclick.js',
          'components/openlayers/lib/OpenLayers/Projection.js',
          'components/openlayers/lib/OpenLayers/Map.js',
          'components/openlayers/lib/OpenLayers/Control.js',
          'components/openlayers/lib/OpenLayers/Control/Attribution.js',
          'components/openlayers/lib/OpenLayers/Format.js',
          'components/openlayers/lib/OpenLayers/Format/JSON.js',
          'components/openlayers/lib/OpenLayers/Kinetic.js',
          'components/openlayers/lib/OpenLayers/Rule.js',
          'components/openlayers/lib/OpenLayers/Handler.js',
          'components/openlayers/lib/OpenLayers/Handler/Click.js',
          'components/openlayers/lib/OpenLayers/Handler/Pinch.js',
          'components/openlayers/lib/OpenLayers/Handler/Point.js',
          'components/openlayers/lib/OpenLayers/Layer.js',
          'components/openlayers/lib/OpenLayers/Layer/HTTPRequest.js',
          'components/openlayers/lib/OpenLayers/Tile.js',
          'components/openlayers/lib/OpenLayers/Tile/Image.js',
          'components/openlayers/lib/OpenLayers/Layer/Grid.js',
          'components/openlayers/lib/OpenLayers/TileManager.js',
          'components/openlayers/lib/OpenLayers/Handler/Drag.js',
          'components/openlayers/lib/OpenLayers/Control/DragPan.js',
          'components/openlayers/lib/OpenLayers/Control/PinchZoom.js',
          'components/openlayers/lib/OpenLayers/Control/TouchNavigation.js',
          'components/openlayers/lib/OpenLayers/Renderer.js',
          'components/openlayers/lib/OpenLayers/StyleMap.js',
          'components/openlayers/lib/OpenLayers/Layer/Vector.js',
          'components/openlayers/lib/OpenLayers/Layer/XYZ.js',
          'components/openlayers/lib/OpenLayers/Layer/OSM.js',
          'components/openlayers/lib/OpenLayers/Handler/Path.js',
          'components/openlayers/lib/OpenLayers/Handler/Polygon.js',
          'components/openlayers/lib/OpenLayers/Renderer/Canvas.js',
          'components/openlayers/lib/OpenLayers/Renderer/Elements.js',
          'components/openlayers/lib/OpenLayers/Renderer/SVG.js',
          'components/openlayers/lib/OpenLayers/Handler/Keyboard.js',
          'components/openlayers/lib/OpenLayers/Control/ModifyFeature.js',
          'components/openlayers/lib/OpenLayers/Geometry/MultiLineString.js',
          'components/openlayers/lib/OpenLayers/Geometry/MultiPolygon.js',
          'components/openlayers/lib/OpenLayers/Format/GeoJSON.js',
          'components/openlayers/lib/OpenLayers/Control/Zoom.js'
        ],
        dest: path.join(build, 'ol.js')
      }
    },
    cssmin: {
      dist: {
        src: ['src/style.css'],
        dest: path.join(build, 'style.css')
      }
    },
    concat: {
      css: {
        options: {
          separator: ''
        },
        src: [
          'src/css.header',
          path.join(build, 'style.css'),
          'src/css.footer'
        ],
        dest: path.join(build, 'css.js')
      },
      // for now, concat ol.js, conditionally load later
      dist: {
        options: {
          separator: ';'
        },
        src: [
          path.join(build, 'preamble.js'),
          path.join(build, 'ol.js'),
          path.join(build, 'css.js'),
          path.join(build, 'index.js')
        ],
        dest: path.join(build, 'dist', 'mapjack.user.js')
      }
    },
    jade: {
      options: {
        pretty: true,
        data: function() {
          var data = fs.readFileSync('readme.md', 'utf8');
          return {
            content: markdown.toHTML(data)
          };
        }
      },
      doc: {
        src: 'doc/index.jade',
        dest: path.join(build, 'dist', 'index.html')
      }
    },
    'gh-pages': {
      options: {
        base: path.join(build, 'dist')
      },
      src: '**/*.*'
    },
    watch: {
      source: {
        files: ['src/**/*.*'],
        tasks: ['build']
      }
    }
  });

  grunt.registerTask('preamble', function() {
    var done = this.async();
    var parts = [
      '// ==UserScript==',
      '// @name ' + project.name,
      '// @namespace ' + project.homepage,
      '// @version ' + project.version,
      '// @description ' + project.description,
      '// @match https://github.com/*/*/edit/*/*.geojson',
      '// @copyright 2013+, ' + project.author,
      '// ==/UserScript==\n'
    ];
    fs.writeFile(path.join(build, 'preamble.js'), parts.join('\n'),
        function(err) {
          done(err);
        });
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('build',
      ['copy', 'jade', 'uglify', 'preamble', 'concat:css', 'concat:dist']);

  grunt.registerTask('deploy', ['build', 'gh-pages']);

  grunt.registerTask('default', ['build']);

};
