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
        'jsdoc',
        'browserify'
      ]
    },

    jasmine_node: {
      files: [
        'src/**/*.js',
        'test/jasmine_node/**/*.js'
      ],
      tasks: [
        'jasmine_node'
      ]
    // },

    // karma: {
    //   files: [
    //     'src/**/*.js',
    //     'test/karma/**/*.js'
    //   ],
    //   tasks: [
    //     'jasmine_node'
    //   ]
    }
  };
};
