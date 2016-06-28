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
        'newer:eslint',
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

    mochacli: {
      files: [
        'lib/**/*.js',
        'test/client/**/*Spec.js'
      ],
      tasks: [
        'mochacli'
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
