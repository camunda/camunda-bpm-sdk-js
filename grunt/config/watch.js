module.exports = function(config) {
  'use strict';
  config = config || {};

  return {
    options: {
      livereload: false
    },

    sources: {
      files: [
        'lib/**/*.js'
      ],
      tasks: [
        'newer:jshint',
        'browserify',
        'copy:builds'
      ]
    },

    doc: {
      files: [
        'doc/**/*.md',
        'lib/**/*.js'
      ],
      tasks: [
        'newer:jshint',
        'jsdoc'
      ]
    },

    jasmine_node: {
      files: [
        'lib/**/*.js',
        'test/jasmine_node/**/*.js'
      ],
      tasks: [
        'jasmine_node'
      ]
    },

    karma: {
      files: [
        'dist/camunda-bpm-sdk.js',
        'test/karma/**/*.js'
      ],
      tasks: [
        'karma:watched'
      ]
    }
  };
};
