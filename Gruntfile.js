/* jshint node: true */
'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  // require('time-grunt')(grunt);

  var dryRun = grunt.option('dryRun') || false;
  var pkg = require('./package.json');
  var config = {};

  config.grunt = grunt;
  config.pkg = pkg;
  config.dryRun = dryRun;

  grunt.initConfig({
    pkg:              pkg,

    dryRun:           dryRun,

    browserify:       require('./grunt/config/browserify')(config),

    clean:            ['documentation', 'dist', '.tmp', 'staging'],

    copy:             require('./grunt/config/copy')(config),

    eslint:           require('./grunt/config/eslint')(config),

    mochacli:         require('./grunt/config/mocha-cli')(config),

    jshint:           require('./grunt/config/jshint')(config),

    karma:            require('./grunt/config/karma')(config),

    watch:            require('./grunt/config/watch')(config),

    uglify:           require('./grunt/config/uglify')(config),

    bump:             require('./grunt/config/bump')(config),

    release:          require('./grunt/config/release')(config),

    bowerRelease:     require('./grunt/config/release-bower')(config)
  });

  grunt.registerTask('build', function(mode) {
    mode = mode || 'prod';
    grunt.log.writeln('Build JS SDK in "'+ mode +'" mode');

    var tasks = [
      'newer:eslint',
      'clean',
      'copy:assets',
      'browserify'
    ];

    if (mode === 'prod') {
      tasks = tasks.concat([
        'uglify'
      ]);
    }

    if (mode === 'dev') {
      tasks.push('copy:builds');
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('auto-build', [
    'build:dev',
    'watch:sources',
    'watch:karma'
  ]);

  grunt.registerTask('publish', function(mode) {
    mode = mode || 'snapshot';
    var tasks = [];
    var skipBowerRelease = grunt.option('skip-bower-release') || false;

    // check options
    if (mode !== 'release' && mode !== 'snapshot' && mode !== 'version') {
      grunt.fatal('Only snapshot and release targets are allowed for the publish task! mode=' + mode);
    }
    grunt.log.writeln('Publishing JS SDK in "'+ mode +'" mode.');

    if ((mode === 'release' || mode === 'version') && !grunt.option('setversion')) {
      grunt.fatal('No version specified using the --set-version=VERSION param!');
    }

    if (skipBowerRelease) {
      grunt.log.writeln('Skipping bower release.');
    }

    if (mode === 'snapshot') {
      tasks = tasks.concat([
        'build:prod'
      ]);

      if (!skipBowerRelease) {
        tasks = tasks.concat(['bowerRelease:' + mode]);
      }
    } else if (mode === 'version') {
      // just increase version
      tasks = tasks.concat([
        'bump:only',
        'bump:snapshot' // commit, push
      ]);
    } else {
      // release mode
      tasks = tasks.concat([
        'bump:only',
        'build:prod',
        'bump:release', // commit, tag, push
        'release' // npm release
      ]);

      if (!skipBowerRelease) {
        tasks = tasks.concat(['bowerRelease:' + mode]);
      }
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('default', ['build']);
};
