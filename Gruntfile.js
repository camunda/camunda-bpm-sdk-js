/* jshint node: true */
'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var pkg = require('./package.json');
  var config = {};

  config.grunt = grunt;
  config.pkg = pkg;

  grunt.initConfig({
    pkg:              pkg,

    browserify:       require('./grunt/config/browserify')(config),

    clean:            ['doc', 'dist', '.tmp'],

    copy:             require('./grunt/config/copy')(config),

    jasmine_node:     require('./grunt/config/jasmine_node')(config),

    jsdoc:            require('./grunt/config/jsdoc')(config),

    jshint:           require('./grunt/config/jshint')(config),

    karma:            require('./grunt/config/karma')(config),

    watch:            require('./grunt/config/watch')(config),

    uglify:           require('./grunt/config/uglify')(config),
  });

  grunt.registerTask('build', function(target) {
    target = target || 'prod';

    var tasks = [
      'jshint',
      'clean',
      'jsdoc',
      'copy',
      'browserify',
      'uglify'
    ];

    grunt.task.run(tasks);
  });

  grunt.registerTask('auto-build', function(target) {
    target = target || 'prod';

    var tasks = [
      'build',
      'watch'
    ];

    grunt.task.run(tasks);
  });

  grunt.registerTask('default', ['build']);
};
