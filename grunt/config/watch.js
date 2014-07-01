module.exports = function(config) {
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
        'browserify'
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
