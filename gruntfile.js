

/**
 * Grunt config.
 * @param  {Object} grunt Grunt itself.
 */
module.exports = function(grunt) {

  grunt.initConfig({
    'gh-pages': {
      src: ['readme.md']
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['gh-pages']);

};
