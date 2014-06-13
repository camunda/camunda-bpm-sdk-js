module.exports = function(config) {
  config = config || {};

  return {
    options: {
      livereload: false
    },

    sources: {
      files: [
        'src/**/*.js'
      ],
      tasks: [
        'newer:jshint',
        'browserify'
      ]
    }
  };
};
