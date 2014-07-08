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

    clean:            ['documentation', 'dist', '.tmp'],

    copy:             require('./grunt/config/copy')(config),

    jasmine_node:     require('./grunt/config/jasmine_node')(config),

    jsdoc:            require('./grunt/config/jsdoc')(config),

    jshint:           require('./grunt/config/jshint')(config),

    karma:            require('./grunt/config/karma')(config),

    watch:            require('./grunt/config/watch')(config),

    uglify:           require('./grunt/config/uglify')(config),
  });

  grunt.registerTask('build', function(mode) {
    mode = mode || 'prod';
    grunt.log.writeln('Build JS SDK in "'+ mode +'" mode');

    var tasks = [
      'jshint',
      'clean',
      'copy:assets',
      'browserify'
    ];

    if (mode === 'prod') {
      tasks = tasks.concat([
        'jsdoc',
        'uglify'
      ]);
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('auto-build', [
    'build:dev',
    'watch'
  ]);

  grunt.registerTask('default', ['build']);
};
